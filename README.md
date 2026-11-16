# NIGHTBLOOM: Queens of the Haunted

A gothic arcade fighting game with eleven starting queens, three secret challengers, and six scrolling haunted arenas.

[Play the current build](https://gavenecko.github.io/nightbloom/)

## Current build — 0.81 · Eleven Queens

- Belladonna joins the starting roster with her approved nightshade design, 80 animation frames, painted Fairy Dust, Nightshade Gale and Midnight Bloom effects, and selected voice B. Her full-size sprite and alignment are approved.
- All fourteen fighters have story routes, recorded dialogue, spoken super names, congratulations artwork and second-clear Bonus Endings.
- Completing a starting fighter's course leads to Arachne. Defeating the challenger unlocks her; clearing Arachne's course leads to Living Doll, and Living Doll's leads to Narrator. Losing a challenger fight does not unlock that fighter.
- Bonus Group includes Belladonna and unlocks after earning all fourteen Bonus Endings. Gallery character selection stays fixed until the player chooses another character.
- The opening starts after the first Enter. Music defaults to 15%; music, character voices and effects have separate volume controls. Dialogue plays automatically by default and can be disabled.
- The pause screen lists each fighter's moves and inputs. Training includes a dummy, reset controls, frame stepping, effects settings and reduced motion.
- Story and Arcade insert the Cursed Reliquary bonus immediately after the halfway match victory: match five for starting queens, match six for secret fighters. Press Enter to start the 15-second challenge; destroying the relic adds 1,500 points in Arcade.
- A match-winning super becomes a 36-hit Haunted Finale, continuing after zero health. Course completion now shows cumulative stats, including retries and overkill hits.
- Escape asks before returning to the menu. Tools below the game live in a collapsed Controls & settings dropdown, which also offers Automatic / On / Off touch controls.

## Controls

Keyboard: WASD move, J/K attacks, L special, U super, I throw, Shift guard, P pause. The pause move list includes motion commands and controller bindings. Options offers Classic and Arcade layouts. Local player two uses the arrow keys and number pad.

## Saves and testing

Progress is stored in the current browser and site origin. Debug actions use a separate test save; Return to earned progress restores normal play. F10 or the footer button opens the developer menu. Its client-side password is a convenience gate.

## Project notes

- [Belladonna and the fourteen-fighter roster](docs/BELLADONNA.md)
- [Approved voices and recorded dialogue](docs/VOICE_EXPANSION.md)
- [Release checks and remaining playtests](docs/RELEASE_READINESS.md)
- [Stage and layer previews](docs/stage-depth.html)
- [Historical development notes](docs/DEVELOPMENT_HISTORY_081.md)
- [Haunted Finale, course stats and touch controls](docs/FINALE_COURSE_INTERFACE.md)

This is a development build. Full controller/course playthroughs, cold-cache performance checks, final audio listening, accessibility review and distribution credits remain release work.
