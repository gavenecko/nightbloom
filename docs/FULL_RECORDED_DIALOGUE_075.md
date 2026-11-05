# Full recorded dialog — 0.75

All 452 exported story dialog entries are covered by 354 unique MP3s for the twelve fighters and narrator. This pass adds 88 recordings for Banshee, Medusa, Jiangshi, Yurei, Dullahan, Werewolf, Mummy and Witch. All 266 initial recordings remain byte-identical.

The newly approved voice profiles retain their audition speed, pitch, low-pass filter and subtle echo. Batch generation runs locally using the cached Kokoro q4 model; no side-panel synthesis or paid speech API is used. Raw WAV masters and production dependencies are kept outside the public game repository.

The full library is 9.09 MB, mono MP3 at 24kHz/48kbps. Files load only when their dialog is read. Repeated text for the same role shares a recording. Use Read dialog or Auto-read in Story mode; there is no model download or synthesis wait for these story lines. Missing-file/device fallbacks and optional custom neural profiles remain available.

See APPROVED_VOICE_PROFILES.json for the complete casting and PRERECORDED_VOICES_V2_QA.json for integrity, coverage and size checks.
