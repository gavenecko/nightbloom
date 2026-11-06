# Cathedral grounding fix — 0.79

The expanded stage previously blended an upper copy of the panorama over a differently positioned full panorama. The broad fade included architectural edges near the floor, producing ghosted or doubled scenery. The original transparent railing/pedestal layer also retained the earlier stage's higher horizon and moved independently from the world floor.

The renderer now draws distant scenery once, then replaces only the pavement below 75% of screen height with the world-aligned floor. A short pavement-only feather softens the join; it ends before the fighting-floor band. There is no crossfade between shifted architectural copies. Grounded railing and pedestal props follow world camera motion, with their bases lowered 24 pixels at the 960×540 viewport to meet the new pavement horizon.

The game and wide preview use the same corrected renderer. Arena size, fighter motion, camera easing and foreground depth are preserved. No art regeneration was needed.

Verified with actual image assets at five camera positions: railing bases reach the floor; the visible fighting-floor band is pixel-identical to the world-aligned source; scenery stays opaque at both ends. Wide-arena movement/combat and actual game renders also pass.
