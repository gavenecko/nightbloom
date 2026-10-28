# Dullahan V10 layered animation pass

72 distinct headless armor body frames across18 actions, plus shared transparent head and lance props. No repeated hold images. Approved charcoal armor, emerald fittings, copper hair and green cloak retained; approved portrait unchanged.

Body atlas:192x192 cells,8 columns by9 rows, baseline184, exact8px transparent gutters. All72 source bounds and packed gutters verified. Head64x64 and lance64x192 have transparent padding; frame-specific anchors are included in the exact prompt record. Head Toss uses the same head image as the carried prop and omits the carried head while the existing headless timer is active. The armor remains consistent during Head Toss. Recovery poses ordered from kneeling to standing.

Black Ride and super use existing separate effects; Head Toss Inspector FX previews the matching head. All72 FX cell gutters checked. Inspector supports seven rebuilt fighters, with a wider Dullahan preview to contain the lance. Earlier six fighter body atlases are byte-for-byte preserved. Combat movement, hitboxes, damage and timers unchanged. Legacy Dullahan body/headless sheets archived in assets/fighters/benchmark.

Generated with built-in image_gen; exact prompts and prop anchors in DULLAHAN_V10_PROMPTS.json. Werewolf, Mummy and Witch remain for future animation passes.
