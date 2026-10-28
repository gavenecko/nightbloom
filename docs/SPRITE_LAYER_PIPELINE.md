# NIGHTBLOOM Layered Sprite Pipeline

Vampira V14, Nekomata V11, Banshee V10, Medusa V10 and Jiangshi V10 use individually generated 192 × 192 body cells with an eight-pixel transparent gutter and a shared base anchor at pixel 184. Each body atlas is 1536 × 1728. Jiangshi's hopping walk adds per-frame visual lifts while preserving all gutters. Body cell dimensions are selected per fighter; archived benchmark body sheets and the independent FX atlases keep the legacy dimensions below. Medusa and Jiangshi's archived legacy sheets have 12 columns and 10 rows. See `WALK_CYCLES_050.md`, `NEKOMATA_V10.md`, `BANSHEE_V10.md`, `MEDUSA_V10.md`, `JIANGSHI_V10.md` and the individual frame manifests for each padded body contract.

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

## Yurei V10
Yurei joins the padded 192x192 body pipeline, with 72 distinct frames and exact 8px transparent margins. Her glide alternates feet beneath the kimono, with small visual lifts [0,2,0,2]. Grave Reach and Lantern Curse remain separate effects; her approved roster portrait is unchanged.

## Dullahan V10
72 padded192x192 armor-body frames, with individually anchored head and lance props. Head Toss hides the held head and uses that same head asset for its projectile. Inspector uses a320x256 preview space to contain the lance. See DULLAHAN_V10.md and DULLAHAN_V10_PROMPTS.json.

## Witch V10
72 isolated padded body frames; closed grimoire retained in left hand and right-hand casting gestures. Separate Moon Sigil, Hex Bolt and super effects. See WITCH_V10.md and WITCH_V10_PROMPTS.json.
