# Vampira V12 temporary anatomy repair

Build 0.47 removes the confirmed three-leg image from knockdown frame 2 (one-based). The image-generation anatomy edit was rejected, so no generated replacement or alternate outfit was accepted.

The temporary repair copies the verified two-leg knockdown frame 1 into frame 2. This deliberately holds the kneeling pose for one additional animation frame before proceeding to the existing lying poses. It is a clean-pose hold, not a newly drawn in-between.

- All other 71 frame PNGs remain byte-for-byte identical to V11.
- All 72 cells pass the eight-pixel transparent-border check.
- Cell dimensions, sole baseline, action indices, timing, controls and combat logic are unchanged.
- Additional reported anatomy problems remain to be identified by action/frame number; this release does not claim to repair an unidentified second frame.

The original V11 atlas remains in the repository for comparison.
