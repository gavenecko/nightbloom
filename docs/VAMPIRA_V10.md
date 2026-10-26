# Vampira V10: isolated body frames

Vampira's previous atlas combined bodies and oversized red effects. Some poses crossed the fixed cell boundaries. V10 replaces the body artwork with 72 individually generated transparent images, packed into the existing action layout. The original V9 atlas remains available for comparison.

## Asset contract

- Atlas: `assets/fighters/benchmark/nightbloom_vampira_body_v10.png`.
- Individual frames and bounds: `assets/fighters/benchmark/vampira-v10/`.
- 18 actions, four distinct body poses each; no animation timing changes.
- Vampira-only 192 × 192 body cells, eight columns, nine rows; total 1536 × 1728. Other fighters and the independent FX atlas retain their existing 128 × 160 cells.
- Eight fully transparent pixels on all four cell edges.
- Body poses use sole baseline y=184, aligned to the fighter's world position. The existing movement system supplies airborne height.
- Whole silhouettes are fitted inside the safe area without cropping. Wider cells provide room for extended limbs and capes without shrinking normal-height poses to a narrow strip. Dash, crouching, falling, down and recovery poses use lower height limits.
- No effects, particles or attack trails in body frames. Existing independent FX layer remains in use.
- Nearest-neighbor rendering, exact source rectangles and destination clipping in combat and the Inspector.

## Validation

Packing rejects any source image whose visible pixels (alpha above 8/255) touch its source canvas edge; this excludes near-transparent encoding specks. Every generated cell is checked pixel by pixel for an exactly transparent eight-pixel gutter. All 72 cells must pass before the replacement atlas is assembled. The manifest records every frame's atlas position, fitted bounds and source margins.

Art identity and pose continuity still require visual review: empty gutters prevent contamination between cells, but do not alone prove smooth animation. Use Atlas Inspector to step through all actions, especially grounded feet, attack reach and down/recovery transitions.

## Generation method and final prompt set

Built-in Image Generation tool. Each action/frame is generated separately against the same approved isolated Vampira idle reference. No full-sheet generation is used for the replacement body atlas. Prompts and pose specifications are retained in `VAMPIRA_V10_PROMPTS.json`.

Shared prompt: "Use case: identity-preserve. Reference image is isolated Vampira. Create ONE individual full-body body-only fighting-game sprite, [action] animation frame [number]/4. Pose: [pose]. Preserve EXACT character identity, lavender hair, red rose ornament, black and burgundy gothic outfit, red-lined cape, boots, adult proportions and pixel-art rendering. Face RIGHT, same three-quarter side camera. Keep full silhouette visible and compact, hips centered, generous transparent margins on ALL sides, no cropped anatomy. Genuine transparent background. No magic, red energy, bats, particles, attack trails, ground shadow, text, grid, extra poses or other characters. This is a single isolated frame, NOT a sprite sheet."

## Browser check

From the title, open Atlas Inspector and select Vampira. `1` shows body, `2` shows FX, `3` shows composite; Up/Down changes action, A/D steps frames, Space pauses playback. The Vampira status line identifies V10. Nekomata, Banshee and the remaining roster continue to use their existing body artwork.
