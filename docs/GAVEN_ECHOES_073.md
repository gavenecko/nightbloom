# Gaven Echoes story voices — 0.73

Open Story mode. Below the dialog, **Read dialog** reads the current page's narration followed by both fighters' lines. Aftermath and ending pages read their displayed narrative. **Stop voice** cancels speech, and leaving the page or switching away from the browser stops it as well. Story progression remains manual.

Device speech works without a neural model download when the browser supports speech synthesis. Device voices depend on the installed system voices. **Auto-read** is optional and starts off each session. Speech follows master/SFX volume and mute; music ducks during reading.

**Load neural voices (download)** explicitly loads the versioned public engine from [Gaven Echoes](https://gavenecko.com/neural-voice), then the Kokoro browser model in memory-saver mode. The initial download may take several minutes. Neither the external engine nor model is requested before that button is pressed. The engine runs voice generation in the browser. Default character assignments use clean, natural delivery; they are starting choices that can be replaced.

To reuse Voice Lab character settings, name profiles after fighters (for example ARACHNE, VAMPIRA or LIVING DOLL; NARRATOR is also supported), choose **EXPORT GAME VOICES** there, then **Import voice profiles** here. Import accepts the Gaven neural-character-voices JSON format and only applies matching fighter names. Importing alone does not download the model. Profile imports last for this page session.

No paid service credentials or runtime generation server are required. Neural download or playback failures retain device reading where available; text remains playable everywhere. Old speech/generation results cannot start playing after dialog changes.

For production, the separate [dialogue export](DIALOGUE_VOICE_EXPORT.json) remains available for generating and saving WAV clips in Voice Lab. Actual recorded music and sound effects still need to be supplied and integrated.

Validation includes device line order, volume/mute, scene changes, deferred model loading and cancellation of late neural generation with a test engine. The full model download and synthesis are user-triggered and were not run as part of automated validation.
