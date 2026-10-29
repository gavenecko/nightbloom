# NIGHTBLOOM Prototype 0.61

This package is organized for GitHub Pages testing.

## Playability polish
- Training has clickable position reset, refill, dummy mode, speed, pause and frame-step controls.
- Atlas Inspector has clickable playback, speed and layer controls. Visible frame cards select the correct pose, and hovering leaves playback running.
- Inspector cards and status text fit inside their panels; Back returns to the title screen.
- The game reserves space for the control panel as it wraps or expands, and browser zoom is enabled.
- Controls appear below the game, with contextual help and expandable shortcuts.
- Compact training panel; H or the footer button shows detailed frame data.
- Presentation clocks restart on animation changes and respect pause, slow motion and frame stepping.
- Rebuilt fighters use their four-frame animation metadata; attack poses follow startup, active and recovery phases.
- Existing artwork, combat data, controls and collision are unchanged.

## Current sprite pass
- Mummy V10 completes all ten animation passes with the approved Regal Empress A design, 72 isolated body frames, matching portrait and separate Bandage Lash / Scarab Curse effects.
- Werewolf V10 adds 72 isolated wolf-warrior body frames, digitigrade movement and separate Moon Claw / Howl Wave effects.
- Witch V10 adds 72 isolated aubergine-coat body frames, a distinct walking cycle and separate Moon Sigil / Hex Bolt effects.
- Dullahan V10 adds72 isolated armor frames with separate carried-head/lance props and a matching Head Toss projectile.
- Yurei V10 adds 72 isolated ivory-and-indigo kimono body frames, a drifting step cycle and separate Grave Reach / Lantern Curse effects.
- Full roster portraits now match the rebuilt fighters; Jiangshi keeps her approved portrait.
- New full-body design references and portraits for Yurei, Dullahan, Werewolf, Mummy and Witch. All ten fighters now have rebuilt animation passes.
- [View character designs](https://gavenecko.github.io/nightbloom/docs/roster-gallery.html).
- Jiangshi V10 adds the approved adult Court Lady design, 72 isolated body frames, a distinct hopping cycle and matching portrait.
- Medusa V10 adds 72 isolated original-outfit body frames, an Inspector entry and a separate layer using existing serpent/petrify effects.
- Banshee V10 adds 72 isolated original-outfit body frames, separate from the FX atlas.
- Vampira V14 and Nekomata V11 add wider walking strides and lifted passing steps, with an 8fps walk cadence.
- Vampira and Nekomata retain their previously approved artwork and original outfits.
- Separate FX atlases for Vampira, Nekomata, Banshee, Medusa, Jiangshi, Yurei, Dullahan, Witch, Werewolf and Mummy.
- Atlas Inspector can preview BODY / FX / COMPOSITE.
- [Play the current build](https://gavenecko.github.io/nightbloom/?v=061-training-inspector).

## Included
- `index.html`
- `js/nightbloom.js`
- `docs/SPRITE_LAYER_PIPELINE.md`
- `assets/fighters/benchmark/`
- `assets/fx/benchmark/`
