#!/usr/bin/env bash
# PNG → JPG (max 800px wide, target ≤200KB). MP4 → H.264 CRF 28, max 480px wide, faststart (target ≤3MB).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

CONTENT="${ROOT}/content"
OUT_IMG="${ROOT}/public/images/characters"
OUT_VID="${ROOT}/public/videos/characters"
PUB_IMG="${ROOT}/public/images"

mkdir -p "$OUT_IMG" "$OUT_VID"

if ! command -v ffmpeg &>/dev/null; then
  echo "ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

file_size() {
  stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null || echo 0
}

# Single-frame image: scale to max 800px width, JPEG, iterate -q:v until ≤200KB (or min quality).
image_to_jpg_max800_under200k() {
  local in_f="$1"
  local out_f="$2"
  local q
  for q in 3 4 5 6 8 10 12 14 18 22 26; do
    ffmpeg -y -hide_banner -loglevel error -i "$in_f" \
      -vf "scale='min(800,iw)':-2" \
      -frames:v 1 -q:v "$q" \
      "$out_f"
    local sz
    sz=$(file_size "$out_f")
    if [[ "$sz" -le 204800 ]]; then
      echo "  → $(basename "$out_f") (${sz} bytes, q=$q)"
      return 0
    fi
  done
  echo "  → $(basename "$out_f") ($(file_size "$out_f") bytes, could not reach ≤200KB — check source)"
}

compress_mp4() {
  local in_f="$1"
  local out_f="$2"
  ffmpeg -y -hide_banner -loglevel warning -i "$in_f" \
    -vf "scale='min(480,iw)':-2,format=yuv420p" \
    -c:v libx264 -crf 28 -preset fast \
    -movflags +faststart \
    -an \
    "$out_f"
  local sz max_sz=3145728
  sz=$(file_size "$out_f")
  if [[ "$sz" -gt "$max_sz" ]]; then
    echo "  Warning: $(basename "$out_f") is ${sz} bytes (target ≤3MB)."
  fi
}

# Copy first matching content still → fixed marketing filenames (max 800px JPEG).
copy_content_still_to() {
  local dest="$1"
  shift
  local f
  for f in "$@"; do
    [[ -f "$f" ]] || continue
    echo "Site still → $(basename "$dest") (from $(basename "$f"))"
    image_to_jpg_max800_under200k "$f" "$dest"
    return 0
  done
  return 1
}

if [[ -d "$CONTENT" ]]; then
  shopt -s nullglob
  # Hero / lifestyle / destination (explicit names first, then loose globs)
  copy_content_still_to "${PUB_IMG}/01_hero_dj.jpg" \
    "${CONTENT}/01_hero_dj.png" "${CONTENT}/01_hero_dj.jpg" \
    "${CONTENT}/01_hero_dj.PNG" \
    "${CONTENT}"/*hero*dj*.png "${CONTENT}"/*hero*dj*.PNG \
    "${CONTENT}"/*Hero*DJ*.png \
    "${CONTENT}"/*dj*.png "${CONTENT}"/*DJ*.png || true

  copy_content_still_to "${PUB_IMG}/02_lifestyle_swim.jpg" \
    "${CONTENT}/02_lifestyle_swim.png" "${CONTENT}/02_lifestyle_swim.jpg" \
    "${CONTENT}"/*lifestyle*.png "${CONTENT}"/*Lifestyle*.png \
    "${CONTENT}"/*swim*.png "${CONTENT}"/*Swim*.png || true

  copy_content_still_to "${PUB_IMG}/03_destination_como.jpg" \
    "${CONTENT}/03_destination_como.png" "${CONTENT}/03_destination_como.jpg" \
    "${CONTENT}"*destination*.png "${CONTENT}"*Destination*.png \
    "${CONTENT}"*como*.png "${CONTENT}"*Como*.png || true

  for in_f in "$CONTENT"/*.png "$CONTENT"/*.PNG; do
    [[ -f "$in_f" ]] || continue
    base=$(basename "$in_f")
    stem="${base%.*}"
    out_f="${OUT_IMG}/${stem}.jpg"
    echo "PNG → JPG: $base"
    image_to_jpg_max800_under200k "$in_f" "$out_f"
  done

  for in_f in "$CONTENT"/*.mp4 "$CONTENT"/*.MP4; do
    [[ -f "$in_f" ]] || continue
    base=$(basename "$in_f")
    out_f="${OUT_VID}/${base}"
    echo "MP4: $base"
    compress_mp4 "$in_f" "$out_f"
  done
  shopt -u nullglob
else
  echo "Note: no $CONTENT folder — skipped PNG/MP4 from content."
fi

shopt -s nullglob
for in_f in "$PUB_IMG"/*.jpg "$PUB_IMG"/*.jpeg "$PUB_IMG"/*.png; do
  [[ -f "$in_f" ]] || continue
  base=$(basename "$in_f")
  [[ "$base" == ".gitkeep" ]] && continue
  ext="${base##*.}"
  stem="${base%.*}"
  out_f="${PUB_IMG}/${stem}.jpg"
  echo "Site image: $base"
  image_to_jpg_max800_under200k "$in_f" "$out_f.tmp.jpg"
  mv "$out_f.tmp.jpg" "$out_f"
  if [[ "${ext,,}" == "png" && "$in_f" != "$out_f" ]]; then
    rm -f "$in_f"
  fi
done
shopt -u nullglob

echo "Done."
