# NIGHTBLOOM Layered Sprite Pipeline

Vampira V14, Nekomata V11 and Banshee V10 use individually generated 192 × 192 body cells with an eight-pixel transparent gutter and a shared baseline at pixel 184. Each body atlas is 1536 × 1728. Body cell dimensions are selected per fighter; archived benchmark body sheets and the independent FX atlases keep the legacy dimensions below. See `WALK_CYCLES_050.md`, `NEKOMATA_V10.md`, `BANSHEE_V10.md` and the individual frame manifests for the padded body contract.

## Legacy body atlas
- 1024 × 1440
- 8 columns × 9 rows
- 128 × 160 cells
- transparent background
- body-only when possible
- no overflow across cell boundaries

## FX atlas
- 1024 × 1440
- 8 columns × 9 rows
- same action layout as body atlas
- contained effects only
- no anatomy in FX atlas
- keep each effect inside its own cell

## Action map
- Row 0: idle / walk
- Row 1: dash / crouch
- Row 2: jump / fall
- Row 3: light / heavy
- Row 4: specialA / specialB
- Row 5: super / throw
- Row 6: hit / block
- Row 7: down / recover
- Row 8: intro / victory
