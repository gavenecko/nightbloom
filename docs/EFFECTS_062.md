# Character effects — 0.62

The effects pass replaces the shared decorative overlays with distinct character motifs, while preserving fighter artwork, hitboxes, damage, frame data, movement, meter and status rules.

| Fighter | Signature | Projectile |
|---|---|---|
| Vampira | Crimson claw arcs | Blood comet |
| Nekomata | Violet claws and spirit paw | Spectral paw flame |
| Banshee | Mint spectral sound waves | Soul wisp |
| Medusa | Serpent lash | Green petrifying shard |
| Jiangshi | Gold talisman seal | Paper chi talisman |
| Yurei | Blue spectral reach | Lantern spirit |
| Dullahan | Emerald lance sweep | Original head with spectral trail |
| Werewolf | Silver-blue claws | Crescent howl |
| Mummy | Ivory bandage ribbon | Turquoise-and-gold winged scarab |
| Witch | Violet moon sigil | Hex comet |

Hit sparks use bright contact cores and short streaks. Blocks use a blue-white shield arc; counters add a gold diamond. Melee contact effects appear at the defender's near edge. Projectiles render in front of fighters, with their previous collision and damage behavior preserved. Supers use each character's motif. Witch's ground ring fills during the existing arming interval; status markers replace rectangular body tints and generic rage overlays.

`js/combat-fx.js` renders the shared effects for combat, the Atlas Inspector and `docs/effects-gallery.html`. Inspector sheets are generated on demand in a two-entry cache, with eight transparent pixels around every cell. Runtime artwork remains separate from the fighter body sheets. Existing PNGs and portraits are retained; the four formerly embedded FX PNGs are preserved byte-for-byte under `assets/fx/legacy/`.

Full, Low and Minimal settings change decorative detail. Projectile cores remain visible. Reduced motion keeps effect geometry steady, removes debris, suppresses shake/camera zoom and full-screen flashes, and retains contact feedback. Full-screen flash opacity is capped at22%; pause and simulation speed govern its decay.

Validation includes2,160 gutter checks across three detail settings, distinct signature renders for all ten fighters, reduced-motion geometry checks, full-game initialization and rendering, all-roster attack alignment review, and150 hit/block/counter scenarios against0.61. A full-loop projectile comparison also verifies identical Mummy damage and curse outcomes. Existing animation timing and Dullahan prop checks pass.
