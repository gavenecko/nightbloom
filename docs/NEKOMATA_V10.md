# Nekomata V10 isolated body pipeline

This pass rebuilds Nekomata as separate transparent body frames against one isolated original-outfit reference. Effects remain on the existing independent FX atlas. The original V9 atlas is preserved for comparison.

## Frame contract

- 18 actions × four frame slots; 69 distinct source images, existing action order and timing.
- 192 × 192 cells, eight columns × nine rows, total 1536 × 1728.
- Eight completely transparent pixels around every cell.
- Centered horizontal anchor and sole baseline y=184.
- Two human legs, two boots, two arms and two hands; two compact cat tails behind the hips, visibly distinct from the legs.
- Match the isolated reference outfit, face, hair, ears, ribbons, cape and colors. No alternate-costume substitutions.
- No attached effects, particles, glow, scenery or ground shadows in body frames.

## Review gates

Review each batch of individually generated poses against the same reference for outfit continuity, anatomy, tail readability and complete silhouettes. Inspect uncertain poses at source resolution. Packing rejects visible source pixels that touch the source-canvas edge (alpha above 8/255) and checks every finished cell for an exactly transparent eight-pixel gutter.

Standing-equivalent body scale is preserved across actions. Lower poses use smaller height limits, with extra room in knockdown/recovery poses for the two tails. Wider cells allow attack reach and hair/cape movement without crossing into adjacent frames.

Vampira continues to use her approved V13 atlas. Banshee and the remaining roster retain their existing artwork. Combat logic, controls, move timing and FX dimensions are unchanged.

## Temporary holds

Three distinct-pose requests were rejected twice by the image generator. To keep the original outfit and clean anatomy, these slots hold an accepted neighboring pose:

- Hit frame 1 holds hit frame 2.
- Down frame 2 holds down frame 1.
- Down frame 3 holds down frame 4.

Frame numbers above are one-based. All 72 cells are present, with no timing or action-map changes. These three slots can be replaced independently in a later pass.

Exact accepted prompts, including hold provenance, are retained in `NEKOMATA_V10_PROMPTS.json`. Generation used the built-in image tool. Every source passed the visible-edge check, and all 72 packed cells passed the exact transparent-gutter check. Enlarged contact sheets were reviewed manually for outfit continuity and anatomy.
