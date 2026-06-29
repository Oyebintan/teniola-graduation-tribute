# OOU Times — Final Patch

Drop-in replacements only. Push index.html, css/style.css, js/app.js into 
your repo and the remaining steps handle themselves.

## One thing you must do manually
Add your main-video.mp4 at exactly this path in your repo:
  assets/video/main-video.mp4

The TV section now shows ONLY that one video. No other video changes needed.

## What changed in this patch
- Removed "Skip Intro" button from the loader
- Removed the blinking REC indicator (was one too many "live" signals)
- TV reel now plays main-video.mp4 only (no cycling photos/archive clips)
- Audio sequence fixed:
    • "Go Live" button press unlocks audio (browser requirement)
    • countdown-beep.mp3 plays ONCE from the start of the countdown
      (not restarted every tick - was chopping it up before)
    • onair-horn.mp3 plays on the ON AIR screen and fades out
      as the main page appears
    • background-music.mp3 fades IN at low volume (0.13) as the
      horn fades — was broken before (volume was hardcoded to 0.0)
- Ticker bar is slightly smaller (font reduced to .65rem)
