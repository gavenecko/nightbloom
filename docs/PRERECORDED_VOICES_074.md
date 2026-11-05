# Prerecorded story voices — 0.74

266 unique clips cover 292 of the 452 exported dialogue entries. Approved casting: Vampira/Alice, Nekomata/Bella, Arachne/Emma, Living Doll/Nicole and Narrator/Lily. The other eight fighters now have approved profiles, but their prerecorded clips are not included in this library yet; they use the current device/neural fallback. Narration covers all routes.

Use Read dialog or optional Auto-read in Story mode. Saved recordings are preferred, with no model download or synthesis wait. The manifest loads on the first Read action; each audio file loads only when its line plays. Initial page load does not request the voice library. Stop, scene changes, focus loss and mute cancel playback. Music ducks while reading. Imported profiles that change a voice's settings bypass its baked recording.

The complete approved library is 7.23 MB: mono MP3, 24kHz, 48kbps. Repeated text for the same voice shares one clip. Raw WAV masters, model cache, dependencies and resumable progress remain outside the public repository.

Production used Kokoro JS 1.2.1, the same engine family as Gaven Echoes, q4 model weights, CPU batch generation and the approved natural/clean profiles. Every clip was decoded, measured for audible output and checked for file integrity before publishing. See PRERECORDED_VOICES_V1_QA.json for totals.
