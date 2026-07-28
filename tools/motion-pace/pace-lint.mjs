/**
 * pace-lint — the emit-boundary guard for motion prompts.
 *
 * Run this on the FINAL motion_prompt, immediately before it is sent to fal.
 * It is the last thing that touches the string, so it does not matter what the
 * prompt writer or the lesson store produced upstream: slow-motion vocabulary
 * cannot reach the video model.
 *
 * Why a token filter rather than better instructions: diffusion video models
 * condition on token presence, not on sentence logic. "never move slowly" and
 * "move slowly" push the temporal field the same direction, because "slowly"
 * is in both. The only reliable control is absence.
 *
 * Pure JS, no dependencies. See README.md for the production numbers that
 * motivated each rule.
 */

/** Tempo words that must never reach an image-to-video model, and what to use instead. */
const TEMPO_SWAPS = [
  [/\bvery slow\b/gi, 'fast'],
  [/\bslow-motion\b/gi, 'real-time'],
  [/\bslow motion\b/gi, 'real time'],
  [/\bslowly\b/gi, 'sharply'],
  [/\bslow\b/gi, 'swift'],
  [/\bgently\b/gi, 'sharply'],
  [/\bgentle\b/gi, 'firm'],
  [/\bsubtly\b/gi, 'clearly'],
  [/\bsubtle\b/gi, 'clear'],
  [/\bimperceptibly\b/gi, 'decisively'],
  [/\bimperceptible\b/gi, 'decisive'],
  [/\bgradually\b/gi, 'immediately'],
  [/\bgradual\b/gi, 'immediate'],
  [/\bcreeping\b/gi, 'driving'],
  [/\bcreeps\b/gi, 'drives'],
  [/\bcreep\b/gi, 'drive'],
  [/\bdrifting\b/gi, 'sweeping'],
  [/\bdrifts\b/gi, 'sweeps'],
  [/\bdrift\b/gi, 'sweep'],
  [/\blanguidly\b/gi, 'briskly'],
  [/\blanguid\b/gi, 'brisk'],
  [/\bleisurely\b/gi, 'urgent'],
  [/\bunhurried\b/gi, 'urgent'],
  [/\bfloaty\b/gi, 'weighted'],
  [/\blingering\b/gi, 'quick'],
  [/\blingers\b/gi, 'snaps'],
  [/\bsoftly\b/gi, 'sharply'],
  [/\bdelicately\b/gi, 'sharply'],
  [/\bdelicate\b/gi, 'sharp'],
  [/\bcalmly\b/gi, 'quickly'],
  [/\bserene\b/gi, 'charged'],
  [/\bdreamy\b/gi, 'vivid'],
  [/\bsettling\b/gi, 'snapping'],
  [/\bsettles\b/gi, 'snaps'],
  [/\bsettled\b/gi, 'locked'],
  [/\binch(es)? (forward|closer|left|right)\b/gi, 'drives $2'],
];

/**
 * Duration anchors. Naming the clip length makes the model spread the described
 * action across that whole span — the single strongest slow-motion cue we found.
 * The API duration parameter already sets length; the prompt must not restate it.
 */
const DURATION_ANCHORS = [
  /\b(?:over|across|through(?:out)?|during|within|in)\s+(?:the\s+)?(?:full\s+|entire\s+|whole\s+)?(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|twenty|\d{1,2})[\s-]?seconds?\b/gi,
  /\b(?:the\s+)?(?:full|entire|whole)\s+(?:clip|shot|take|duration)\b/gi,
  /\b\d{1,2}\s?s(?:ec)?(?:onds?)?\s+(?:long|clip|shot)\b/gi,
];

/** Micro-displacement phrasing: tells the model to move almost nowhere. */
const MICRO_DISPLACEMENT = [
  /\b(?:barely|no more than|hardly|scarcely|little more than|only)\s+(?:a|an|one|two|three|\d+)?\s?(?:foot|feet|inch|inches|centimet(?:er|re)s?|metre|meter)\b/gi,
  /\balmost imperceptibl\w*/gi,
  /\bbarely (?:moves?|moving|visible|perceptible|shifts?)\b/gi,
];

/**
 * Negation. Video models do not reliably apply it, and the negated noun still
 * conditions the output. Anything negated belongs in negative_prompt.
 */
const NEGATION = /\b(?:never|no|not|without|avoid|avoiding|instead of)\s+\w+/gi;

/** At least one of these must survive, or the clip has no tempo floor at all. */
const TEMPO_ANCHORS = /\b(?:fast|swift|swiftly|sharp|sharply|snap|snaps|whip|whips|sudden|suddenly|abrupt|abruptly|burst|bursts|explosive|violent|rapid|rapidly|quick|quickly|slam|slams|jolt|jolts|lunge|lunges|kick|hard|urgent|immediate|immediately|instantly|real-time)\b/i;

/** Sequential beat markers. More than two and the action gets diluted across the clip. */
const BEAT_MARKERS = /\b(?:first|then|next|after that|afterwards|finally|lastly|subsequently|following that)\b[,\s]/gi;

const DEFAULTS = {
  maxBeats: 2,
  requireCameraTempo: true,
  strict: false, // strict => negation and beat overrun are errors, not warnings
};

/** Case-preserving replace: keeps ALL CAPS and Capitalised forms intact. */
function matchCase(source, replacement) {
  if (source === source.toUpperCase() && /[A-Z]{2,}/.test(source)) return replacement.toUpperCase();
  if (/^[A-Z]/.test(source)) return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  return replacement;
}

function applySwaps(text, violations) {
  let out = text;
  for (const [pattern, replacement] of TEMPO_SWAPS) {
    out = out.replace(pattern, (match, ...groups) => {
      // Support $1/$2 backreferences in the replacement.
      const resolved = replacement.replace(/\$(\d)/g, (_, i) => groups[Number(i) - 1] ?? '');
      violations.push({ rule: 'TEMPO_WORD', found: match, replacedWith: resolved });
      return matchCase(match, resolved);
    });
  }
  return out;
}

function stripPatterns(text, patterns, rule, violations) {
  let out = text;
  for (const pattern of patterns) {
    out = out.replace(pattern, (match) => {
      violations.push({ rule, found: match.trim(), replacedWith: '' });
      return '';
    });
  }
  return out;
}

/** Collapse the whitespace and stray punctuation left behind by deletions. */
function tidy(text) {
  return text
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/,\s*,/g, ',')
    .replace(/,\s*\./g, '.')
    .replace(/\s+—\s*(?=[,.])/g, '')
    .replace(/—\s*—/g, '—')
    .replace(/ +\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Lint and repair a motion prompt.
 *
 * `repairs` are things it found and already fixed — the returned prompt is safe
 * to send. `blocking` are things it cannot fix on its own; when any are present
 * the prompt should be regenerated rather than shipped. `ok` reflects blocking
 * only, so a heavily-repaired prompt still comes back ok:true.
 *
 * @param {string} prompt Final motion prompt destined for the video model.
 * @param {object} [options]
 * @param {number} [options.maxBeats=2] Sequential beat markers allowed.
 * @param {boolean} [options.requireCameraTempo=true] First sentence must carry a tempo anchor.
 * @param {boolean} [options.strict=false] Treat negation and beat overrun as blocking.
 * @returns {{ok: boolean, prompt: string, repairs: Array, blocking: Array, warnings: Array, changed: boolean}}
 */
export function lintMotionPrompt(prompt, options = {}) {
  const opts = { ...DEFAULTS, ...options };
  const repairs = [];
  const blocking = [];
  const warnings = [];

  if (typeof prompt !== 'string' || !prompt.trim()) {
    return {
      ok: false,
      prompt: '',
      repairs,
      blocking: [{ rule: 'EMPTY', found: '', hint: 'no prompt supplied' }],
      warnings,
      changed: false,
    };
  }

  const original = prompt;
  let out = prompt;

  out = stripPatterns(out, DURATION_ANCHORS, 'DURATION_ANCHOR', repairs);
  out = stripPatterns(out, MICRO_DISPLACEMENT, 'MICRO_DISPLACEMENT', repairs);
  out = applySwaps(out, repairs);
  out = tidy(out);

  // Negation belongs in negative_prompt, not here.
  for (const found of out.match(NEGATION) || []) {
    const entry = { rule: 'NEGATION', found: found.trim(), hint: 'move to negative_prompt' };
    (opts.strict ? blocking : warnings).push(entry);
  }

  // Too many sequential beats spreads the action thin across the clip.
  const beats = out.match(BEAT_MARKERS) || [];
  if (beats.length > opts.maxBeats) {
    const entry = {
      rule: 'BEAT_OVERRUN',
      found: `${beats.length} beat markers (${beats.map((b) => b.trim()).join(' / ')})`,
      hint: `collapse to ${opts.maxBeats} overlapping beats`,
    };
    (opts.strict ? blocking : warnings).push(entry);
  }

  // The opening camera clause sets the temporal energy of the whole clip.
  if (opts.requireCameraTempo) {
    const firstSentence = out.split(/(?<=[.!?])\s/)[0] || out;
    if (/\bcamera\b/i.test(firstSentence) && !TEMPO_ANCHORS.test(firstSentence)) {
      warnings.push({
        rule: 'FLAT_CAMERA_CLAUSE',
        found: firstSentence.slice(0, 120),
        hint: 'give the camera move an explicit decisive tempo',
      });
    }
  }

  // A prompt with no tempo anchor anywhere has no floor on pace — unfixable here.
  if (!TEMPO_ANCHORS.test(out)) {
    blocking.push({
      rule: 'NO_TEMPO_ANCHOR',
      found: '',
      hint: 'add at least one decisive tempo word (snaps, whips, bursts, slams)',
    });
  }

  return { ok: blocking.length === 0, prompt: out, repairs, blocking, warnings, changed: out !== original };
}

/**
 * Convenience wrapper for the generation call site: always returns a usable
 * prompt, and reports what it had to fix.
 */
export function enforcePace(prompt, options = {}) {
  const result = lintMotionPrompt(prompt, options);
  return { prompt: result.prompt, report: result };
}

export const _internals = { TEMPO_SWAPS, DURATION_ANCHORS, MICRO_DISPLACEMENT, TEMPO_ANCHORS, BEAT_MARKERS };
