# Vampira V13 walking anatomy correction

Build 0.48 replaces walking frame 1 (Inspector atlas column #4) after the user identified a duplicate thigh at approximately x=75.4%, y=53.4% in its source image.

The built-in Image Generation anatomy edit removed the extra limb while retaining the walking stride and existing outfit. The replacement was visually checked from both hip connections through the crossing stride to the two boots before packing.

- One frame changed; the other 71 PNGs are byte-for-byte identical to V12.
- All 72 cells pass the eight-pixel transparent-border check.
- Action order, frame timing, sole baseline, controls, combat and independent FX remain unchanged.
- The temporary clean-pose hold for knockdown frame 2 from V12 remains in place; it has not been replaced with a newly generated in-between.

The exact edit prompt is retained in `VAMPIRA_V13_ANATOMY_PROMPT.json`.
