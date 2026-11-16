# Belladonna dialogue and super callouts

Preserves all 385 existing approved story recordings and adds 110 recorded lines with the approved character profiles. Belladonna uses the selected audition B: bf_isabella, speed 0.98, clean delivery. The new library includes her rival exchanges, course narration, ending, and responses from the cast. Belladonna is now the eleventh core fighter. Her dialogue and route definitions are recorded in BELLADONNA_DIALOGUE_PLAN.json.

Fourteen character introductions use Narrator's approved bf_lily profile. The first story chapter displays exactly the combined introduction and chapter narration that is spoken. Later chapters and secret challenger announcements retain their existing wording and voice. Dialogue remains enabled by default and obeys the voice volume and dialogue setting.

Fourteen super-name recordings use Chatterbox Turbo conditioned on each approved character voice. Four Belladonna combat cues are included for her fighter integration. All new audio uses normalized mono 24 kHz 48 kbps MP3, with decoded duration, loudness, peak and unique-file checks. The browser plays recordings and does not run a speech model.

Super callouts take priority over ordinary attacks and pain reactions. A super emits one callout; the following attack event does not duplicate it. Victory, pause, mute, and unavailable-file behavior retain their existing safeguards.

Production: Kokoro JS 1.2.1 q4 CPU for story dialogue, Chatterbox Turbo CPU for combat callouts, approved voice references and seed 42 (Belladonna combat seeds 42–45). Local resumable production scripts and originals are retained in the development workspace.

The title derives its queen count from the core roster and displays ELEVEN QUEENS. Existing secret unlock rules remain unchanged.
