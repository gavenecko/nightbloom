# Medusa V10 isolated sprite pipeline

Completed October 27, 2026: Medusa now uses the same padded body format as Vampira, Nekomata and Banshee, with 18 actions and four distinct frames each. All 72 frames were generated successfully without rejected requests or temporary holds. The original black/gold outfit, ivory drapery, green cloak, crown, gloves, boots and attached snake hair are locked to one reference; no alternate-costume substitutions or serpent lower body were introduced.

Body cells are 192 × 192 in an eight-column, nine-row atlas (1536 × 1728), with baseline y=184 and an exactly transparent 8px border. All 72 sources pass the visible-edge check (alpha >8/255), and all packed cells pass the exact transparent-gutter check. Enlarged sheets received manual reviews for natural two-leg/two-arm anatomy, contained hair serpents and outfit continuity; uncertain anatomy was inspected at full source resolution. Generation used the built-in image tool.

Walking uses clear contact and lifted-foot passing poses at 8fps, matching the other converted fighters. Movement speeds, collision boxes and combat timing are unchanged. Medusa is added to the Atlas Inspector; body, FX and composite previews use separate body/FX dimensions.

The separate 128 × 160-cell FX atlas reuses the existing shared serpent and petrify effect artwork for specialA, specialB and super. Its 72 cell borders pass an exact transparent 8px gutter check. Idle and other body-only actions intentionally have empty FX cells. Existing shared runtime effect instances are preserved; giant summoned snakes are excluded from body frames.

The previous Medusa sprite sheet is preserved unchanged as `assets/fighters/benchmark/nightbloom_medusa_legacy_12x10.png`. Vampira V14, Nekomata V11 and Banshee V10 remain unchanged. Exact accepted prompts are retained with the completed pass.
