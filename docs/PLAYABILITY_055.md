# Playability polish 0.55

Controls moved below the canvas; removed duplicate title overlay. Responsive play area reserves space for the footer. Contextual help supports menus, Atlas Inspector and both keyboard presets. Expand More controls for training shortcuts. Title-menu spacing leaves the last option clear of navigation hints.

Training uses a compact strip above the fighters, with details available through H or an accessible footer button. Detailed frame data, snapshot status, motion history and character-specific readouts remain available. The panel stays out of the round introduction. Announcements now expire using simulation time and appear below the training panel.

State-based presentation clocks replace fighter-lifetime/wall-clock playback. New movement starts at frame zero. Four-frame rebuilt sheets no longer wrap using legacy frame counts. Intro/victory respect pause. Presentation advances with simulation time, including slow motion and frame stepping; shared background/FX clocks follow the same delta. Rebuilt attack poses map to anticipation, late startup, active contact and recovery, without changing combat timing or damage.

Validation: transition/cadence/nonloop/pause/frame-step/slow-motion/attack-boundary/legacy/reset checks; JavaScript syntax and diff checks. Live browser checks recorded separately. No image generation or asset edits. Yurei partial frames remain local and excluded from this release.
