# Jiangshi V10 — Cursed Court Lady

This pass animates the user-approved adult Court Lady / Broken Seal design: mature face and pale jade-grey skin, fuller hips and thighs, plum-and-gold embroidered split coat, fitted opaque dark trousers, wide sleeves, embroidered boots, complete official's hat and gold finial, attached red forehead talisman, jade ornaments and long braid. The same outfit and proportions are locked to the approved padded reference.

Completed October 27, 2026: all 18 actions have four distinct body frames, with no temporary holds. One initial half-crouch request was rejected; a targeted edit of the accepted neighboring crouch preserved the approved outfit and proportions and completed that slot. Body cells are 192 × 192, atlas 1536 × 1728 (eight columns/nine rows), with 8px exact transparent borders and base anchor 184. All 72 sources pass the visible-edge check (alpha >8/255), and all packed cells pass the exact gutter check. Enlarged sheets were reviewed for anatomy, full hat/braid/sleeves and consistent proportions.

The 8fps walking cycle is a four-phase hop: anticipation, lift, descent and landing. The two middle frames have 8px/5px visual lifts, followed by landing compression. This is a sprite offset only; world movement, collision boxes, combat timing and existing AI hops remain unchanged.

A matching 256px portrait uses the approved design. Separate 128 × 160-cell effects reuse existing guard, spirit-paw/chi and super artwork; their 72 exact 8px cell gutters pass validation. Large magic and detached paper remain outside body frames.

Jiangshi is the fifth Inspector fighter. Shared compact fighter buttons keep all five entries clear of the action controls; both pointer handlers use the same geometry. Keyboard fighter controls remain unchanged.

Vampira V14, Nekomata V11, Banshee V10 and Medusa V10 remain unchanged. Jiangshi's previous 12×10 body atlas is preserved as `nightbloom_jiangshi_legacy_12x10.png`. Exact built-in image-generation prompts are retained with the completed pass.
