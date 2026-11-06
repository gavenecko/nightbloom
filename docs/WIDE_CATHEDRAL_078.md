# Wide Cathedral — build 0.78

Crimson Cathedral now uses a 1920px world inside the existing 960px viewport. Other stages remain 960px wide. Fighters, attacks, projectiles, sigils, particles and throws use world coordinates; the HUD stays in screen coordinates. Audio panning accounts for the camera position.

The camera follows the midpoint using frame-time-based exponential easing, clamps to the stage ends, and keeps both fighters in view. Separation is limited to 810px, so retreating cannot leave an opponent offscreen. Fighter size and movement speed are unchanged. Round starts and Training resets center both fighters in the wider arena. Snapshot restoration recenters safely.

The floor and fighters move at the same world rate. Distant scenery moves at 35% of camera travel, the middle layer at 72%, and foreground decoration at 110%. The foreground remains clipped below fighter bodies. “Parallax depth: Off” and Reduced motion remove differential depth movement while preserving the essential scrolling game camera. Pause freezes camera movement.

The added background is an expanded panorama, uniformly resized and vertically cropped to 2560×720 without horizontal stretching. Existing transparent props are reused at their original height and proportions. The original artwork and first parallax preview remain available. The built-in image-generation prompt and packaging details are saved with the new background asset.

Validation: traversal and corner collision beyond x=960, projectiles and throws in the right half, both fighters visible, separation limit, camera easing and pause, unchanged widths for other stages, actual rendered layers at left/center/right. Existing post-fight, backward walk/throw, all-fighter combat voice hooks, animation and recorded dialogue checks pass.
