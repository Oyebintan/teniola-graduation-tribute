# OOU Times — Rebuild Notes (v2)

Only changed/new files are included. Drop these into your repo, overwriting
the matching paths. Your `assets/photos` and `assets/video` folders stay as
they are except for the two corrected photos and the new poster thumbnails
noted below.

## What to do
1. Copy `index.html`, `css/style.css`, `js/app.js`, `js/archive-data.js`
   into your repo root, overwriting the existing files.
2. Copy the `assets/` folder here into your repo's `assets/`, adding:
   - `assets/photos/archive/400/400-1.jpg` and `400-2.jpg` — corrected
     (were HEIC files saved with a `.jpg` extension; most browsers
     couldn't decode them, so they showed as broken images).
   - `assets/video/300/posters/`, `assets/video/400/posters/`,
     `assets/video/IT/posters/` — new. Still frames extracted from each
     video, used as thumbnails in the archive grid.
3. Open `index.html` or push to GitHub Pages. No build step.

## Everything in this version

**From the first pass (full rebuild):**
- Fixed the syntax error that silently broke all JavaScript on the live
  site (theme toggle, archive, lightbox, easter egg — none of it worked)
- Fixed the loader being permanently hidden by a stray inline style
- Rebuilt the archive with correct image paths and full video support
  (poster thumbnails + lightbox playback)
- Fixed light-mode contrast bugs, removed debug borders, removed a
  duplicate section, fixed invalid HTML structure
- Added accessibility: keyboard-operable tiles, focus states, skip link,
  alt text, reduced-motion support
- Added the old-TV "broadcast reel" — auto-plays through every photo and
  video in chronological order with a channel readout and static-flicker
  transitions between chapters

**From this pass (your sketch + notes):**
- Replaced the wine/burgundy accent with a vivid broadcast red throughout
  (cards, ticker, buttons, accents) — pairs with black + gold instead
- Dark mode background is now true black, not dark charcoal
- Hero rebuilt: she's now positioned toward the right of frame, text panel
  on the left in a genuine frosted "Liquid Glass" style (blurred, translucent,
  edge-lit border), with a left-to-right black overlay that holds solid
  near the edge before gradually fading clear
- Masthead nameplate now uses a Pirata One (blackletter/gothic) wordmark in
  the spirit of a newspaper masthead, with an elegant italic subtitle
- Masthead bar itself is now genuinely glassy/translucent — blurred content
  shows through it as you scroll, rather than a flat tinted bar
- The "Begin Broadcast" button now has a red glow so it stays vivid against
  the glass rather than getting visually absorbed by it
- Added a small broadcast-camera viewfinder HUD (corner brackets + REC
  indicator) over the hero as a finishing touch

## One honest limitation
Google Fonts is blocked in my testing sandbox's network policy, so my own
screenshots show a fallback serif instead of the real Pirata One wordmark.
That's purely a sandbox restriction — it'll load correctly the moment you
open the site with normal internet access. Worth confirming once you're
at your PC.

## Known leftover housekeeping (not urgent)
- `200/100l-2.jpg` is unused (duplicate of `200/featured.jpg` under a
  leftover 100-level filename) — harmless to delete or ignore.
- `assets/content.js` and `assets/data.js` are empty leftover files from
  earlier iterations — safe to delete whenever.
