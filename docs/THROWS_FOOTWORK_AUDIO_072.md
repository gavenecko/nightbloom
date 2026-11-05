# Throws, footwork and upcoming audio — 0.72

Hold away from the opponent to walk backward while continuing to face her. Backward walking is slower than advancing and plays the walk poses in reverse. Holding away guards when the opponent attacks or an enemy projectile is nearby; Shift remains a stationary guard. Double-tap movement still dashes, and the dash pose now survives the movement-state selection.

I (or local P2 Numpad 5) attempts a close grounded throw. A connected throw briefly holds the opponent, then launches her into a knockdown. Holding away when the throw connects selects a back throw. Throws cannot catch an airborne opponent or ignore invulnerability. The existing throw-tech input and damage/meter accounting remain in place. Existing body and effect art is reused.

## Audio production

The game currently uses synthesized music and effects. Actual music, effects and voice recordings have not been installed in this pass. Provide music as stereo MP3 or OGG and short effects as WAV or OGG, ideally with silence trimmed from their starts. Keep uncompressed masters separately. Suggested folders are assets/audio/music, assets/audio/sfx and assets/audio/voices. Music will loop per stage; effects can map to attack, hit, block, throw release, tech and KO events, using the existing music/SFX volume controls.

[DIALOGUE_VOICE_EXPORT.json](DIALOGUE_VOICE_EXPORT.json) contains story introductions, both fighters' lines, aftermath and endings for every route. Each entry has a stable ID, speaker, exact text and suggested audio filename. This is a production export, not a claim that voices are already connected.

For Gaven Echos, the preferred integration is to generate or record clips there, export the audio, then bundle it with the game. This gives consistent voices without requiring a live voice service during play. If that project instead provides a voice-generation API, its URL and supported interface are needed before implementing a connection. Do not embed service credentials in this public static game.
