# All-stage parallax — build 0.80

Moonlit Shrine, Forsaken Harbor, Cursed Library, Bonefield and The Next Dawn now use the same 1920px world / 960px viewport and following camera as Crimson Cathedral. The existing Cathedral artwork and corrected grounding are preserved.

Each added stage has an extended opaque background with a level fighting-floor horizon, plus a transparent prop sheet. Separate drawing regions keep grounded scenery and front-edge decoration apart. Measured alpha gaps determine the split and placement, rather than assuming that every generated sheet has identical bounds. Grounded bases meet the floor at y=405 in the 960×540 viewport. Foreground props are positioned below fighter bodies, with extra clearance for tall candle clusters.

Only pavement enters the short floor feather; shifted architecture is never crossfaded over itself. Grounded props track the world floor, distant scenery travels at 35% camera speed, and the foreground at 110%. The selected stage loads on demand; the renderer retains at most three recent stage sets. Until all selected layers load, the original backdrop remains available. Reduced motion and the depth switch remove extra layer sliding while retaining the essential following camera.

The five new layer sets total 3,523,694 bytes, excluding optional original-art comparisons. Original images, PNG generation masters, prompts, and cleanup prompts are preserved. A repeated Dawn railing and a duplicated Harbor crane were removed before packaging. Panoramas use uniform resizing and vertical cropping; prop proportions remain intact.

The preview gallery supports all six stages, manual/automatic camera travel, whole-arena view, original artwork, background-only and transparent-prop views. Training includes the same depth switch and a link to the preview.

Validation uses actual assets across 18 camera views: opaque scenery, world-aligned floor pixels, clear foreground body regions, correct stage switching/fallback, and pixel-identical Cathedral output. Full-game tests cover centered spawns, stage loading, projectiles and throws beyond x=960, fighter separation, camera visibility and stage renders for all six arenas. Existing victory timing, backward movement/throws and all-fighter combat voice checks pass. A pre-existing combo-text argument error exposed by the new combat tests was also corrected so each readout uses its intended left/right alignment.
