# NIGHTBLOOM release-readiness audit

Date: 2026-11-15. Baseline: 3630d7c. Scope: first save/progression audit, not a shipping certification.

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
```

- All 13 Story routes have the expected unique starting-roster opponents and valid stages.
- All ten starting fighters queue Arachne after the course clear without automatically unlocking her.
- Secret challenger losses do not unlock fighters; wins unlock only that challenger.
- Arachne leads to Living Doll; Living Doll leads to Narrator.
- First clears grant ending art; repeat clears grant Bonus Endings; Bonus Group requires all 13 Bonus Endings and triggers only on the transition to completion.
- Malformed save fields are repaired, and test/earned progress, scores and backup keys are isolated.
- Debug authentication, returning to earned progress, resuming saved tests and legacy backup restoration pass regression checks.
- All 27 ending/bonus/group image files exist. All 39 complete literal asset paths found in the main page and runtime scripts exist. This does not validate every dynamically constructed resource URL.
- All runtime JavaScript files pass syntax checks.
- Local in-app browser smoke test: game renders, password login succeeds, unlock-all Gallery renders, congratulations renders with fighter sprite and artwork, return to earned progress restores the original Gallery locks. No browser error logs appeared during this smoke test.

These checks execute real progression functions but do not simulate human combat or a complete course playthrough.

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
