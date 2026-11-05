# Combat voices — build 0.76

All twelve fighters use the approved Chatterbox Turbo audition recordings from `assets/audio/combat-model-roster-v1/`. No new generation or model download is required.

| Clip | Trigger |
| --- | --- |
| 1 — Attack line | Special A, Special B, throw, or super startup |
| 2 — Character line | Once when the match winner begins the five-second victory animation |
| 3 — Exertion | Normal, low, overhead, or aerial attack startup |
| 4 — Pain / reaction | Unblocked melee, projectile, throw, or sigil hit |

Only the current matchup's clips preload after audio is unlocked. Mirror matches share downloads. Late-loading or failed clips are skipped rather than queued, and missing audio never interrupts gameplay.

There is one voice at a time. Pain can interrupt an attack call; victory has highest priority. Separate per-fighter attack and pain cooldowns limit repetition, and supers produce only one call. Master and SFX volume control combat voices, with a small additional mix reduction. Mute, pause, focus loss, menus, round reset, and matchup changes stop voices; interrupted clips do not resume later.

Story dialogue keeps its existing recordings and controls. Match mechanics and the five-second celebration duration are unchanged.

Validation: all 12 fighters' real attack/hit hooks, winner line once, mirror cooldowns, selected-fighter preload, priority, late audio, pause/mute/menu cleanup; regression checks for post-fight timing, throws/backward movement, and recorded story dialogue.
