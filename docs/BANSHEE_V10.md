# Banshee V10 isolated body pipeline

Completed October 27, 2026: all 72 frame slots use distinct source images, with no temporary holds or alternate-costume substitutions. The last 18 frames complete block, knockdown, recovery, intro and victory. The previously approved 54 cells remain pixel-identical.

Banshee uses one original-outfit reference for 18 actions with four body-frame slots each. The long turquoise hair, dark crown, black/teal bodice, torn flowing gown, gloves and boots remain consistent. Body frames exclude magic, ghosts, glow and particles; the existing separate FX atlas supplies those effects.

## Frame contract

- 192 × 192 cells, eight columns × nine rows, 1536 × 1728 atlas.
- Eight completely transparent pixels on every side of each cell.
- Shared sole baseline y=184, standing-equivalent height 138px.
- Two natural legs, two boots, two arms and two hands. No duplicate limbs.
- Complete hair and gown silhouettes, contained inside each cell.
- More distinct contact/passing walk poses with visibly lifted feet, at 8fps.

Packing rejects visible source pixels on the source-canvas edge (alpha above 8/255) and checks exact transparent gutters on every packed frame. All 72 sources and packed cells pass these checks. Enlarged batches received manual reviews for outfit continuity, anatomy and complete silhouettes before integration. Exact accepted prompts are retained in `BANSHEE_V10_PROMPTS.json`; generation used the built-in image tool.

Vampira V14 and Nekomata V11 remain unchanged. Movement speeds, combat logic, controls and the independent FX atlases are preserved. Only Banshee's body rendering and walk cadence adopt the padded pipeline already used by the other benchmark fighters.
