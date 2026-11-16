# NIGHTBLOOM release-readiness audit

Updated: 2026-11-16. Reviewed baseline: 3a5e409. Scope: save/progression, Belladonna integration and presentation cleanup. Remaining release gates are listed below.

## Confirmed problems fixed

- Debug unlocks and challenger wins previously wrote to the earned save. Every debug testing action now enters a separate test profile; subsequent progress and score writes stay in `nightbloom_test_progress`. Reset/restore backups are also profile-specific.
- Returning to earned progress restores the in-memory earned snapshot and returns to the title, preventing an unfinished test fight from later writing rewards to the earned profile. Reloading starts in the earned profile. Test progress remains available on the next debug action. The footer identifies an active test save.
- The old debug menu backup can still be restored. A failed write does not delete that backup. Already contaminated saves without a backup cannot be reconstructed automatically.
- Malformed progress values could appear as completed Gallery entries or leave invalid score keys. Save repair now requires literal true completion flags, a first clear before a repeat clear, recognized secret fighter names, and finite nonnegative numeric scores under a recognized fighter/difficulty key. Valid scores are rounded down.
- Save write failures now produce an on-screen notice instead of being silently ignored.
- System Check recognized only part of the current screen list. Opening, relic bonus, group celebration, aftermath and atlas inspector states are now recognized. Diagnostic exports include the audit build label and date.

## Verification completed

Run from the repository root:

```
node tests/release-audit.cjs
node tests/debug-profile.cjs
node tests/belladonna-integration.cjs
node tests/challenger-voices-and-fx.cjs
node tests/supers-and-throws.cjs
node tests/super-voice-calls.cjs
node tests/story-voice-expansion.cjs
node tests/pause-moves.cjs
node tests/relic-course-flow.cjs
```

- All 14 Story routes have the expected unique starting-roster opponents and valid stages.
- All eleven starting fighters queue Arachne after the course clear without automatically unlocking her.
- Secret challenger losses do not unlock fighters; wins unlock only that challenger.
- Arachne leads to Living Doll; Living Doll leads to Narrator.
- First clears grant ending art; repeat clears grant Bonus Endings; Bonus Group requires all 14 Bonus Endings and triggers only on the transition to completion.
- Malformed save fields are repaired, and test/earned progress, scores and backup keys are isolated.
- Debug authentication, returning to earned progress, resuming saved tests and legacy backup restoration pass regression checks.
- All 29 current ending/bonus/group images exist. Full initialization checks find no missing initial fighter/stage art, and recorded dialogue checks validate all 495 recording files.
- All runtime JavaScript files pass syntax checks.
- Local in-app browser smoke test: game renders, password login succeeds, unlock-all Gallery renders, congratulations renders with fighter sprite and artwork, return to earned progress restores the original Gallery locks. No browser error logs appeared during this smoke test.

These checks execute real progression functions but do not simulate human combat or a complete course playthrough.

The relic bonus is now scheduled directly when the halfway match victory is recorded, with the next-fight check retained as a fallback. All 28 Story/Arcade course flows verify one bonus, the ready/start/destroy/resume sequence, correct Arcade points, and no skipped opponent. Additional checks cover a loss and retry before the midpoint, timeout, and resetting for a new course.

## Current presentation status

- Belladonna’s full-size scale and alignment are approved by the user. Her tiny intro/victory transformations remain intact.
- The live build was checked for the eleven-queen title, Belladonna’s story scene, combat super, pause move list, congratulations, Bonus Ending and Bonus Group.
- Browser title, title-screen build label and credits now describe the current game. The README documents current progression and audio behavior; earlier checkpoint notes are archived separately.
- Credits describe the actual art, voice and music categories. Final contributor names and distribution/licensing review are still required before release.

## Remaining release gates

| Priority | Work | Evidence needed |
| --- | --- | --- |
| P1 | Combat and controller playtest | Keyboard and controller full matches; throws, blocking, air attacks, corner behavior, supers, timeouts, double KOs and local P2 isolation. |
| P1 | Full course and retry playthrough | Human completion including relic bonus, secret challenger win/loss, continue exhaustion, replay and saved-state reload. |
| P1 | Loading and performance | Cold-cache and constrained-network runs; measured frame pacing and asset failures on intended browsers/devices. Published asset tree is about 174.9 MiB across 1,832 files, not a measurement of initial download size. |
| P1 | Visual continuity | All fighters' action frames and painted effects; six scrolling stages; portrait fit in every result screen; approved design references and corrected reward anatomy. |
| P1 | Audio mix | Listen to all stages and secret battles at default music 15%; dialogue interruption, mute, volume persistence, first-input start and tab switching. Defaults remain unchanged. |
| P1 | Distribution and rights | Confirm intended platforms, credits, fonts, music and generated-media usage rights; decide how production exposes developer tools. |
| P2 | Onboarding and accessibility | Controller-only menu navigation, readable controls, focus behavior, text sizes and reduced-motion coverage. |
| P2 | Save portability | User export/import and migration policy; browser-local saves currently stay with their origin and browser profile. |

## Debug workflow

F10 or the footer button opens the password menu; existing password is unchanged. Debug actions automatically switch to TEST SAVE. Use **Return to earned progress** and close the menu to resume normal play, or reload. Closing/locking the menu alone intentionally keeps testing active. Settings such as audio are shared across profiles; completion progress and score records are separate. The password is a client-side convenience gate, not access security.

Next pass: hands-on combat, input and full-route retry testing, followed by measured loading/performance checks. Preserve approved artwork, voices and normal unlock rules.
