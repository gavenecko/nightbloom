# Painted effects —0.63

33 original animation sheets contain132 distinct generated frames: special A, projectile B and super for every fighter, plus shared hit, guard and counter impacts. Art uses the approved painted reference, character palettes, textured strokes, smoky edges and luminous cores. Dullahan keeps her existing head sprite with a painted spectral trail.

Every original sheet has four phases. Packing follows the actual transparent gaps between effects rather than assuming perfectly equal source cells. A common scale preserves the relative size changes across each animation. Final sheets use four256px cells with at least8 clear border pixels. Source sheets remain preserved in the downloadable art package; exact generation prompts are in PAINTED_FX_V1_PROMPTS.json.

The same textures render in combat, the Inspector and the effects gallery. Textures preload for the selected fighters. The existing geometric renderer remains a loading fallback; texture-ready notifications invalidate cached previews and repaint the paused gallery. Reduced motion holds the texture on a steady phase. Projectile cores remain visible at all effects detail levels. Painterly effects originate slightly ahead of the fighter so denser brushwork does not obscure faces.

Combat rules, damage, hitboxes, movement and timing are unchanged. Validation includes132 distinct frames and isolated packed borders, all30 fighter/detail atlas combinations, all-roster pose alignment, asynchronous paused-gallery loading, clean redraws, existing timing and Dullahan prop tests, and150 hit/block/counter comparisons against the earlier combat implementation.
