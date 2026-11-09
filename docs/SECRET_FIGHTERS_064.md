# 0.64 — Secret fighters

Clear a Story course with any starting fighter to challenge **Arachne, the Silk Widow**. Clear Arachne’s course to challenge **Living Doll**, then clear Living Doll’s course to challenge **Narrator**. Win the bonus match to unlock that fighter. A loss leaves the course clear and its reward intact.

Browser saves retain existing Story clears and repeat clears. Secret fighter access now requires a saved challenger win. Locked fighters remain hidden in fighter selection. The Atlas Inspector shows every fighter for art review. Progress reset and restore include challenger wins.

The first course clear earns Ending Art and the second earns Bonus Ending art. Collect all thirteen Bonus Endings to see the beach celebration and unlock Bonus Group in the Gallery.

Arachne has ten chapters, each against a core fighter, culminating in freeing the porcelain prisoner beneath the library. Living Doll has ten chapters about choosing her own path. The original ten routes retain their nine encounters and endings.

Arachne’s Silk Lash reaches farther; her unblocked Widow Web projectile slows movement for 72 simulation ticks. Living Doll’s Porcelain Strike grants a brief one-strike armor window, and Needle and Thread is a faster projectile. Specials use the standard motion controls; supers use 100 meter.

Artwork: 72 body frames per fighter across 18 actions, two portraits, and 24 painted FX frames. All body cells are 192×192 with a baseline at184 and at least8 transparent border pixels. FX uses four256px cells per sheet. Initial crowded full sheets were rejected; smaller accepted groups are cropped at transparent gutters and packed without neighbor sampling. Original generated sources are retained in the workspace. Prompts: `SECRET_FIGHTERS_V1_PROMPTS.json`. Built-in image generation used; no external API fallback.

Validation: fresh saves, both unlock stages, existing clears, reload persistence, reset, locked P1/P2 selection, losses, partial clears, Arcade exclusion, core route preservation, release diagnostics, blocked/unblocked web, Doll armor, actual-asset screen rendering, all168 body/FX cell gutters and uniqueness. 100 core combat hit/block cases match0.63; animation timing and72 Dullahan prop cases pass. Artwork is a first playable pass; further animation polish can follow playtesting.
