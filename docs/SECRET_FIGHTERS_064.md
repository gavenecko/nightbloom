# 0.64 — Secret fighters

Complete any of the original ten Story routes to unlock **Arachne, the Silk Widow**. Complete Arachne’s Story route to unlock **the Living Doll**. Both become available in all fighter-selection modes and the Atlas Inspector once earned. Locked cards explain the requirements. Endings remain separate Gallery rewards for completing each character’s own route.

Existing saved Story clears count automatically. Progress uses the existing `nightbloom_progress` browser save: no second unlock flag to lose or desynchronize. It is local to the browser and site origin; it does not sync across devices. Progress reset/restore also resets/restores the derived unlocks. Arcade clears, losses, and partial routes do not unlock fighters.

Arachne has ten chapters, each against a core fighter, culminating in freeing the porcelain prisoner beneath the library. Living Doll has ten chapters about choosing her own path. The original ten routes retain their nine encounters and endings.

Arachne’s Silk Lash reaches farther; her unblocked Widow Web projectile slows movement for 72 simulation ticks. Living Doll’s Porcelain Strike grants a brief one-strike armor window, and Needle and Thread is a faster projectile. Specials use the standard motion controls; supers use 100 meter.

Artwork: 72 body frames per fighter across 18 actions, two portraits, and 24 painted FX frames. All body cells are 192×192 with a baseline at184 and at least8 transparent border pixels. FX uses four256px cells per sheet. Initial crowded full sheets were rejected; smaller accepted groups are cropped at transparent gutters and packed without neighbor sampling. Original generated sources are retained in the workspace. Prompts: `SECRET_FIGHTERS_V1_PROMPTS.json`. Built-in image generation used; no external API fallback.

Validation: fresh saves, both unlock stages, existing clears, reload persistence, reset, locked P1/P2 selection, losses, partial clears, Arcade exclusion, core route preservation, release diagnostics, blocked/unblocked web, Doll armor, actual-asset screen rendering, all168 body/FX cell gutters and uniqueness. 100 core combat hit/block cases match0.63; animation timing and72 Dullahan prop cases pass. Artwork is a first playable pass; further animation polish can follow playtesting.
