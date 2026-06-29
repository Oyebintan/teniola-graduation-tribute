/* ============================================================
   ARCHIVE DATA
   ----------------------------------------------------------
   Every chapter of the documentary archive lives here, kept
   separate from the rendering logic in app.js. To add a new
   photo or clip later: drop the file into the matching
   /assets/photos/archive/<level>/ or /assets/video/<level>/
   folder, then add one line below — no other code changes
   needed.

   Note on video posters: each clip has a matching still frame
   in /assets/video/<level>/posters/ (generated from the video
   itself) so the archive shows a real preview instead of a
   blank box before you press play.
   ============================================================ */

const ARCHIVE = [
  {
    id: "100",
    number: "01",
    label: "100 Level",
    tag: "Freshman Year",
    caption: "New lecture halls, new faces, and the first steps into Mass Communication.",
    cover: { src: "assets/photos/archive/100/featured.jpg", alt: "Teniola smiling on campus during her first year at Olabisi Onabanjo University" },
    photos: [
      { src: "assets/photos/archive/100/100l-2.jpg", alt: "Teniola, 100 Level — early days at OOU" },
      { src: "assets/photos/archive/100/100l-3.jpg", alt: "Teniola, 100 Level — early days at OOU" },
      { src: "assets/photos/archive/100/100l-4.jpg", alt: "Teniola, 100 Level — early days at OOU" },
      { src: "assets/photos/archive/100/100l-5.jpg", alt: "Teniola, 100 Level — early days at OOU" }
    ],
    videos: []
  },
  {
    id: "200",
    number: "02",
    label: "200 Level",
    tag: "Building Momentum",
    caption: "More confidence, more growth — and a deeper footing in the department.",
    cover: { src: "assets/photos/archive/200/featured.jpg", alt: "Teniola during 200 Level at Olabisi Onabanjo University" },
    photos: [
      { src: "assets/photos/archive/200/200-1.jpg", alt: "Teniola, 200 Level" },
      { src: "assets/photos/archive/200/200-3.jpg", alt: "Teniola, 200 Level" },
      { src: "assets/photos/archive/200/200-4.jpg", alt: "Teniola, 200 Level" },
      { src: "assets/photos/archive/200/200-5.jpg", alt: "Teniola, 200 Level" }
    ],
    videos: []
  },
  {
    id: "300",
    number: "03",
    label: "300 Level",
    tag: "The Demanding Year",
    caption: "The most demanding academic year — and the one that tested distance, too.",
    cover: { src: "assets/photos/archive/300/featured.jpg", alt: "Teniola during 300 Level at Olabisi Onabanjo University" },
    photos: [
      { src: "assets/photos/archive/300/300-2.jpg", alt: "Teniola, 300 Level" },
      { src: "assets/photos/archive/300/300-3.jpg", alt: "Teniola, 300 Level" },
      { src: "assets/photos/archive/300/300-4.jpg", alt: "Teniola, 300 Level" },
      { src: "assets/photos/archive/300/300-5.jpg", alt: "Teniola, 300 Level" }
    ],
    videos: [
      { src: "assets/video/300/1E3DD631-C22A-47B3-82B1-4AA0552B0E64.mp4", poster: "assets/video/300/posters/1E3DD631-C22A-47B3-82B1-4AA0552B0E64.jpg", alt: "Video clip from 300 Level" },
      { src: "assets/video/300/Snapchat-760782670.mp4", poster: "assets/video/300/posters/Snapchat-760782670.jpg", alt: "Video clip from 300 Level" },
      { src: "assets/video/300/VID-20241104-WA0041.mp4", poster: "assets/video/300/posters/VID-20241104-WA0041.jpg", alt: "Video clip from 300 Level" },
      { src: "assets/video/300/VID-20250106-WA0012.mp4", poster: "assets/video/300/posters/VID-20250106-WA0012.jpg", alt: "Video clip from 300 Level" }
    ]
  },
  {
    id: "it",
    number: "04",
    label: "Industrial Training",
    tag: "Learning Beyond The Classroom",
    caption: "SIWES took her off campus — and tested a long-distance chapter of its own.",
    cover: { src: "assets/photos/archive/it/featured.jpg", alt: "Teniola during her Industrial Training placement" },
    photos: [
      { src: "assets/photos/archive/it/it-2.jpg", alt: "Teniola during Industrial Training" },
      { src: "assets/photos/archive/it/it-3.jpg", alt: "Teniola during Industrial Training" }
    ],
    videos: [
      { src: "assets/video/IT/Snapchat-1723033189.mp4", poster: "assets/video/IT/posters/Snapchat-1723033189.jpg", alt: "Video clip from Industrial Training" },
      { src: "assets/video/IT/VID-20250812-WA0019.mp4", poster: "assets/video/IT/posters/VID-20250812-WA0019.jpg", alt: "Video clip from Industrial Training" },
      { src: "assets/video/IT/VID-20250815-WA0007.mp4", poster: "assets/video/IT/posters/VID-20250815-WA0007.jpg", alt: "Video clip from Industrial Training" },
      { src: "assets/video/IT/VID-20250914-WA0013.mp4", poster: "assets/video/IT/posters/VID-20250914-WA0013.jpg", alt: "Video clip from Industrial Training" },
      { src: "assets/video/IT/VID-20251127-WA0009.mp4", poster: "assets/video/IT/posters/VID-20251127-WA0009.jpg", alt: "Video clip from Industrial Training" }
    ]
  },
  {
    id: "400",
    number: "05",
    label: "400 Level",
    tag: "The Final Chapter",
    caption: "The final chapter — and the headline she's about to earn.",
    cover: { src: "assets/photos/archive/400/featured.jpg", alt: "Teniola in her final year at Olabisi Onabanjo University" },
    photos: [
      { src: "assets/photos/archive/400/400-1.jpg", alt: "Teniola, 400 Level — final year" },
      { src: "assets/photos/archive/400/400-2.jpg", alt: "Teniola, 400 Level — final year" },
      { src: "assets/photos/archive/400/400-3.jpg", alt: "Teniola, 400 Level — final year" },
      { src: "assets/photos/archive/400/400-4.jpg", alt: "Teniola, 400 Level — final year" }
    ],
    videos: [
      { src: "assets/video/400/751DAE29-A32C-47DC-9229-C2633BA414BA.mp4", poster: "assets/video/400/posters/751DAE29-A32C-47DC-9229-C2633BA414BA.jpg", alt: "Video clip from 400 Level" },
      { src: "assets/video/400/Snapchat-1647950345.mp4", poster: "assets/video/400/posters/Snapchat-1647950345.jpg", alt: "Video clip from 400 Level" },
      { src: "assets/video/400/Snapchat-393158608.mp4", poster: "assets/video/400/posters/Snapchat-393158608.jpg", alt: "Video clip from 400 Level" }
    ]
  }
];
