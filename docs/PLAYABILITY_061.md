# Playability update 0.61

The Atlas Inspector's old frame hit areas were offset from its four visible cards. Cards now share their drawing and click bounds. Clicking pauses on that pose; hovering no longer changes the pose or pauses playback. Fighter and action changes restart at the first frame. Layer buttons and Back work with the mouse.

Shorter frame cards leave room above the status area. Playback state, frame position, speed and the layer comparison hint have separate lines. The Back button no longer covers the title.

Buttons below the game expose Inspector playback, previous/next frame, speed and layers. Training buttons expose existing reset positions, refill, dummy, speed, pause and step commands. Step is enabled while paused. These buttons use the same command path as the keyboard shortcuts and return focus to the game.

The canvas reserves space for the footer as controls wrap or help expands. Browser zoom is enabled. Artwork, fighter data and combat mechanics are unchanged.

Validation: JavaScript syntax, frame-card click/hover/layer/Back regression checks, combat-code comparison, animation timing checks, and Dullahan body/prop smoke checks.
