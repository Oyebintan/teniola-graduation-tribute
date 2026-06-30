# OOU Times — UI Patch

Drop-in replacements. Overwrite the matching files in your repo.

## What's fixed in this patch

1. **Confetti now actually fires.** The code existed in your last version
   but was never called from the compile-success handler — copy/paste
   slip on my end. Now wired in: hit Compile in the Colophon section and
   confetti bursts across the code box.

2. **Nav redesigned as floating pills.** Masthead and ticker are merged
   into a single transparent row. "OOU Times" is a glassy floating pill;
   the gold ticker bar sits behind it and the scrolling text visually
   emerges from under the logo as it animates left-to-right. The
   theme/sound toggle buttons are separate floating glass discs on the
   right with their own shadow, so they read clearly instead of blending
   into the ticker.

3. **Hero now fits the actual screen.** Root cause: the ticker used to
   live in normal document flow with `margin-top:76px`, stacked *under*
   a separately fixed-position masthead. That silently added ~110px of
   dead space above a `100vh` hero, pushing "Begin Broadcast" off-screen
   on real laptop windows — exactly what your screenshot showed. Folding
   the ticker into the same fixed row as the masthead reclaims that
   space. Also trimmed the hero's internal padding/font sizes a bit
   further so the whole hero comfortably fits common laptop viewport
   heights without scrolling.

4. **Removed repeated content.** "Beyond The Headline," "By The Numbers,"
   and "Things The Broadcast Could Not Ignore" were three separate
   sections all repeating the same handful of facts (Gigiola, dancing,
   good energy, graduate status — four times total once you count the
   Public Profile quote). Merged into one clean section; reworded the
   closing pull-quote so it's not a fourth repeat of the same lines.

5. **Fixed two genuinely broken photos.** `400-1.jpg` and `400-2.jpg`
   were HEIC files saved with a `.jpg` extension — a codec almost no
   browser can decode, so they showed as broken images for nearly every
   visitor. Converted both to real JPEGs, same content, now included in
   this patch.

## Still on you
`assets/video/main-video.mp4` still needs to be pushed to your repo —
the TV section is already wired to load it from that exact path the
moment it exists.
