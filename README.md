# NIGHTBLOOM Prototype 0.76

Approved Chatterbox combat voices now play for all 12 fighters: exertions on normal attacks, attack calls on specials/throws/supers, pain on unblocked hits, and one character line during the winner’s five-second victory animation. Voices follow Master/SFX volume and mute; pauses and menus stop playback. Only the selected fighters’ clips preload. [Review the full cast](docs/combat-voice-roster.html).

354 prerecorded clips cover all 452 exported story dialog entries with the approved twelve fighters and narrator. Recordings load only when read; no neural model is needed for these lines. See [recorded voice notes](docs/FULL_RECORDED_DIALOGUE_075.md).

Story dialogue can be read aloud using device speech or the optional Gaven Echoes neural voice engine. Neural downloads start only when requested.

Grounded grab-and-release throws, directional back throws and opponent-facing retreat. See [controls and audio preparation](docs/THROWS_FOOTWORK_AUDIO_072.md).

Compact super banners keep fighters visible. Dash and tech recovery art now follows short action timings, with a clear pause indicator.

Five-second victory scenes, fight stats before route dialog, visible intro and wake-up poses, and square dialog portraits. See [presentation notes](docs/POST_FIGHT_070.md).

Arachne now has a refined anime pixel-art portrait matching her approved sprite design.

## Living Doll individual frame pass
- 72 separate high-resolution body frames use the approved mint-and-white ball-jointed doll design.
- Matching portrait and mint roster accents; see [art notes](docs/LIVING_DOLL_V10.md).

## Arachne orientation correction
- Final knockdown frame corrected;71 other body frames unchanged.

## Arachne individual frame pass
-72 isolated body frames use the approved detailed pixel-art design and spiderweb pantyhose.
- All18 actions rebuilt, with source and gutter checks. See [art notes](docs/ARACHNE_V10.md).

## Hidden selection cards and atlas review
- Secret selection cards appear only after their unlock conditions are met. Keyboard, mouse and controller selection skip hidden fighters.
- Atlas Inspector includes Arachne and Living Doll immediately for animation review; inspecting them does not unlock them for play.

## Secret fighters
- Complete Story Mode to unlock Arachne. Complete Story Mode with Arachne to unlock the Living Doll.
- Existing Story clears count, and unlocks persist in the existing browser save.
- Two new ten-chapter routes, endings, portraits, 144 isolated body frames and 24 painted effects frames.
- See [release notes](docs/SECRET_FIGHTERS_064.md) for controls, save behavior and validation.


This package is organized for GitHub Pages testing.

## Painted effects pass
- 132 painted frames across33 sheets replace the geometric spell cores for all ten fighters, supers, projectiles and shared impacts.
- Original high-resolution sheets and exact prompts are preserved; all packed frames have transparent gutters.
- Textures preload for the selected fighters and refresh paused gallery previews when loaded.

## Character effects pass
- Ten distinct magic styles, directional projectile trails, bright contact sparks, blue guard arcs and gold counter-hit accents.
- Effects originate from the fighter's attack pose, build into contact and dissipate during recovery.
- Witch traps show their arming progress; curse, petrify, armor and rage have clearer visual markers.
- Training and Inspector offer Full / Low / Minimal effects and reduced-motion controls. Essential projectile cores remain visible.
- The Inspector previews the same effects used in combat. [Compare all ten fighters in the effects gallery](https://gavenecko.github.io/nightbloom/docs/effects-gallery.html?v=063-painted).
- Four legacy effects images were extracted unchanged from the script, reducing the main script by roughly 25%. Original art is preserved.

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
- [Play the current build](https://gavenecko.github.io/nightbloom/?v=063-painted-effects).

## Included
- `index.html`
- `js/nightbloom.js`
- `docs/SPRITE_LAYER_PIPELINE.md`
- `assets/fighters/benchmark/`
- `assets/fx/benchmark/`

## Voice auditions

[Listen to five A/B voice pairs](docs/voice-auditions.html). All ten MP3s total 152 KB and load only when played; no neural model is needed. Choose voices and export the matching Gaven Echoes profiles. WAV masters remain outside the published game.

[Second audition set: eight remaining fighters, three options each](docs/voice-auditions-v2.html). More varied pace, pitch and light echo; all 24 clips total 404 KB and load only when played. Exported profiles retain each option's settings.

All 12 fighters and the narrator now have [approved voice profiles](docs/APPROVED_VOICE_PROFILES.json), including the exact pace, pitch and echo settings chosen in the second audition set. All approved roles now have prerecorded dialog. The original 266 clips are unchanged.

[Combat voice auditions](docs/combat-voice-auditions.html): 48 compact attack/pain previews across all twelve fighters, 233 KB total, loaded only on play. These older Kokoro previews have been superseded by the approved Chatterbox full-cast recordings.
