# Vampira V11 costume continuity

Build 0.46 replaces the ten V10 frames that had been generated in an alternate costume. The original V10 idle frame 1 is the authoritative outfit reference. Each edit uses its existing frame as the pose reference and the idle frame as the separate clothing reference.

Corrected frames (one-based): walk 1; crouch 4; specialA 1; super 1; down 1, 2 and 4; recover 3; intro 2 and 3.

The replacements were reviewed together against the reference before integration. No generation requests were rejected in this pass, and no alternate-outfit fallbacks were used.

## Preserved behavior and validation

- The other 62 individual frame PNGs are byte-for-byte identical to V10.
- All 72 cells pass the pixel-by-pixel eight-pixel transparent-border check.
- The atlas remains 1536 × 1728, with 192 × 192 cells and sole baseline y=184.
- Corrected poses retain their existing maximum packed height, centered horizontal anchor, baseline, action index and frame index.
- The renderer, combat logic, animation timing and independent FX layer are unchanged.
- V10 remains available in the repository for comparison.

## Files

- `assets/fighters/benchmark/nightbloom_vampira_body_v11.png`
- `assets/fighters/benchmark/vampira-v11/` (72 individual frames and manifest)
- `VAMPIRA_V11_COSTUME_PROMPTS.json` (exact final prompts; built-in Image Generation)
