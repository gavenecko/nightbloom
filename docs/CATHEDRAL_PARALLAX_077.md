# Crimson Cathedral parallax test — 0.77

Three separate full-frame layers replace the flattened cathedral only. The original remains intact and available through the Training control **Stage layers: Original**. The preview page also shows each layer and the original.

- Background plate: reconstructed scenery behind removed objects; 377,946 bytes.
- Middle layer: transparent gargoyles, pedestals and broken balustrades; 150,188 bytes.
- Foreground: transparent roses, thorns and candles; 62,258 bytes.

Total game layer download: **590,392 bytes**. Layers load as a set; until all three load successfully, the game retains its original stage. Other stages are unchanged.

The camera follows the fighters' horizontal midpoint with easing. Maximum displacements at 960px are 7px for the upper background, 15px for the middle, and 25px for the foreground. Background overscan and a feathered upper plate prevent edge exposure and leave the floor fixed. The foreground is clipped below ground + 15px so it cannot obscure fighter bodies. No hitboxes, stage dimensions, floor height, or fighter positions are changed.

Pause freezes the camera; Reduced motion uses a stationary composite. The preview respects the operating system's reduced-motion preference and offers manual controls. The game's layer toggle is saved alongside its existing display preferences.

Art uses built-in image_gen to reconstruct a clean plate and extract two transparent layers; this involves small re-rendered details rather than a pixel-identical segmentation. Original source and complete prompts are in `assets/stages/cathedral-parallax-v1/`.

Validation uses the actual images: camera extremes remain opaque, the fighting-floor region remains pixel-identical during movement, foreground alpha stays below the body area, pause/reduced motion remain stationary, and the fallback/original toggle work. Combat voice and post-fight tests also pass.
