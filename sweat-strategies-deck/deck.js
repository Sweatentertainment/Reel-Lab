import { SLIDES } from './slides.js';

const scaler = document.getElementById('scaler');
const rail = document.getElementById('rail');
const hint = document.getElementById('hint');

const LEGAL = '2026 Sweat Strategies. All rights reserved.<br>Confidential and proprietary information.';

/* ------------------------------------------------------------------ build */

SLIDES.forEach((s, i) => {
  const el = document.createElement('section');
  el.className = 'slide';
  if (s.grain) el.classList.add('grain');
  if (s.grain === 'soft') el.classList.add('grain--soft');
  if (s.ground === 'light') el.classList.add('slide--light');
  el.dataset.index = String(i);

  const chrome = s.chrome === 'none' ? '' : `
    <div class="chrome ${s.chrome === 'dark' ? 'chrome--dark' : ''}">
      <div class="chrome__brand">Sweat Strategies</div>
      <div class="chrome__year">2026</div>
      <div class="chrome__foot">
        <span class="chrome__num">${String(i + 1).padStart(2, '0')}</span>
        <span class="chrome__sect">${s.section}</span>
      </div>
      <div class="chrome__legal">${LEGAL}</div>
    </div>`;

  el.innerHTML = `${s.html}${chrome}`;

  scaler.appendChild(el);

  const dot = document.createElement('button');
  dot.type = 'button';
  dot.title = `${i + 1}. ${s.section}`;
  dot.addEventListener('click', () => go(i));
  rail.appendChild(dot);
});

const slides = [...scaler.querySelectorAll('.slide')];
const dots = [...rail.querySelectorAll('button')];

/* prime each spine so the draw animation has a length to work with */
scaler.querySelectorAll('.pathline path').forEach((p) => {
  const len = p.getTotalLength();
  p.style.strokeDasharray = len;
  p.style.setProperty('--len', len);
  p.style.strokeDashoffset = 0;
});

/* --------------------------------------------------------------- navigate */

let current = -1;

function go(n) {
  const i = Math.max(0, Math.min(slides.length - 1, n));
  if (i === current) return;
  current = i;

  slides.forEach((el, k) => el.classList.toggle('is-active', k === i));
  dots.forEach((d, k) => d.classList.toggle('is-on', k === i));

  // restart the spine draw on the slide we just landed on
  const p = slides[i].querySelector('.pathline path');
  if (p) {
    p.style.animation = 'none';
    void p.offsetWidth;
    p.style.animation = '';
  }

  if (location.hash !== `#${i + 1}`) history.replaceState(null, '', `#${i + 1}`);
}

const next = () => go(current + 1);
const prev = () => go(current - 1);

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  switch (e.key) {
    case 'ArrowRight': case 'PageDown': case ' ': case 'Enter': e.preventDefault(); next(); break;
    case 'ArrowLeft': case 'PageUp': case 'Backspace': e.preventDefault(); prev(); break;
    case 'Home': e.preventDefault(); go(0); break;
    case 'End': e.preventDefault(); go(slides.length - 1); break;
    case 'f': case 'F':
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.();
      break;
  }
});

document.getElementById('stage').addEventListener('click', (e) => {
  if (e.target.closest('#rail') || e.target.closest('a')) return;
  (e.clientX < innerWidth * 0.25 ? prev : next)();
});

addEventListener('wheel', (() => {
  let lock = 0;
  return (e) => {
    if (Math.abs(e.deltaY) < 24) return;
    const now = Date.now();
    if (now - lock < 700) return;
    lock = now;
    (e.deltaY > 0 ? next : prev)();
  };
})(), { passive: true });

/* -------------------------------------------------------------- fit to fit */

function fit() {
  if (document.body.classList.contains('is-printing')) return;
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  scaler.style.transform = `translate(-50%, -50%) scale(${s})`;
}

addEventListener('resize', fit);
fit();

/* --------------------------------------------------------------- chrome UI */

let idle;
function wake() {
  rail.classList.remove('is-hidden');
  hint.classList.remove('is-hidden');
  clearTimeout(idle);
  idle = setTimeout(() => {
    rail.classList.add('is-hidden');
    hint.classList.add('is-hidden');
  }, 2800);
}
addEventListener('mousemove', wake);
addEventListener('keydown', wake);
wake();

/* -------------------------------------------------------- print / PDF mode */
/* ?print=1 lays every slide out stacked at full size so Chromium can render
   the whole deck to a paginated PDF. */

if (new URLSearchParams(location.search).get('print') === '1') {
  document.body.classList.add('is-printing');
  slides.forEach((el) => el.classList.add('is-active'));
} else {
  const fromHash = parseInt(location.hash.slice(1), 10);
  go(Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0);
}
