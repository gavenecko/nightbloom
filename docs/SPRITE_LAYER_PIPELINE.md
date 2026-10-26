# NIGHTBLOOM Layered Sprite Pipeline

## Body atlas
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
