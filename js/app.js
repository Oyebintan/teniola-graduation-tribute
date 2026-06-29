/* ================================================================
   OOU TIMES — SPECIAL GRADUATION EDITION
   App logic
   ----------------------------------------------------------------
   Organized as small, independent init functions so one broken
   feature can never take the whole script down with it (the
   previous version had everything nested inside a single
   forEach callback that was missing its closing brace — a
   syntax error that silently disabled every feature on the
   page: theme toggle, archive, lightbox, easter egg, all of it).
   ================================================================ */

(function () {
    "use strict";

    /* ---------- helpers ---------- */
    function escapeAttr(str) {
        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    /* ---------- broadcast sound ----------
       Browsers block ALL audio (even silent/soft) from playing until the
       visitor interacts with the page at least once — this is a universal
       browser security policy, not something this site can opt out of.
       So: the moment the visitor taps/clicks/presses any key, every sound
       element gets "unlocked" for the rest of the session, and from then
       on the loader's existing beeps/horn/chime fire normally in sync. */
    let audioUnlocked = false;
    let bgMusicMuted = false;
    let introChimeEl, countdownBeepEl, onairHornEl, bgMusicEl;

    function unlockBroadcastAudio() {
        if (audioUnlocked) return;
        audioUnlocked = true;

        [introChimeEl, countdownBeepEl, onairHornEl, bgMusicEl].forEach((el) => {
            if (!el) return;
            el.play()
                .then(() => el.pause())
                .catch(() => {
                    /* element has no source yet, or browser still refused — fine */
                });
        });

        if (introChimeEl) {
            introChimeEl.currentTime = 0;
            introChimeEl.volume = 0.5;
            introChimeEl.play().catch(() => {});
        }
    }

    function playCountdownBeep() {
        if (!audioUnlocked || !countdownBeepEl) return;
        countdownBeepEl.currentTime = 0;
        countdownBeepEl.volume = 0.5;
        countdownBeepEl.play().catch(() => {});
    }

    function playOnAirHorn() {
        if (!audioUnlocked || !onairHornEl) return;
        onairHornEl.currentTime = 0;
        onairHornEl.volume = 0.55;
        onairHornEl.play().catch(() => {});
    }

    function startBackgroundMusic() {
        if (!bgMusicEl) return;
        bgMusicEl.loop = true;
        bgMusicEl.volume = bgMusicMuted ? 0 : 0.16;
        bgMusicEl.play().catch(() => {
            /* no source yet — silent no-op until a real file is added */
        });
    }

    function initSound() {
        introChimeEl = document.getElementById("introChimeAudio");
        countdownBeepEl = document.getElementById("countdownBeepAudio");
        onairHornEl = document.getElementById("onairHornAudio");
        bgMusicEl = document.getElementById("bgMusicAudio");

        ["pointerdown", "keydown"].forEach((evt) => {
            document.addEventListener(evt, unlockBroadcastAudio, { once: true });
        });

        const soundToggle = document.getElementById("soundToggle");
        if (!soundToggle) return;
        const icon = soundToggle.querySelector("span");

        soundToggle.addEventListener("click", () => {
            bgMusicMuted = !bgMusicMuted;
            if (bgMusicEl) bgMusicEl.muted = bgMusicMuted;
            if (icon) icon.textContent = bgMusicMuted ? "🔇" : "🔈";
            soundToggle.setAttribute("aria-pressed", String(bgMusicMuted));
            soundToggle.setAttribute(
                "aria-label",
                bgMusicMuted ? "Unmute background music" : "Mute background music"
            );
        });
    }

    /* ---------- loader / intro ---------- */
    function initLoader() {
        const loader = document.getElementById("loader");
        const screen1 = document.getElementById("screen1");
        const screen2 = document.getElementById("screen2");
        const screen3 = document.getElementById("screen3");
        const countdown = document.getElementById("countdown");
        const skipBtn = document.getElementById("skipIntro");
        const goLiveBtn = document.getElementById("goLiveBtn");

        if (!loader || !screen1 || !screen2 || !screen3 || !countdown || !skipBtn) {
            return;
        }

        let finished = false;
        let count = 5;

        document.body.classList.add("lock-scroll");

        function endIntro() {
            if (finished) return;
            finished = true;
            loader.style.opacity = "0";
            document.body.classList.remove("lock-scroll");
            startBackgroundMusic();
            setTimeout(() => {
                loader.hidden = true;
            }, 800);
        }

        skipBtn.addEventListener("click", endIntro);

        function startSequence() {
            if (finished) return;

            screen1.classList.remove("active");
            screen2.classList.add("active");

            const timer = setInterval(() => {
                count--;

                if (count >= 0) {
                    countdown.textContent = String(count);
                    playCountdownBeep();
                }

                if (count <= 0) {
                    clearInterval(timer);
                    screen2.classList.remove("active");
                    screen3.classList.add("active");
                    playOnAirHorn();
                    setTimeout(endIntro, 1400);
                }
            }, 500);
        }

        // the countdown (and its sound) only starts once the visitor
        // deliberately presses "Go Live" — this is also the user gesture
        // that unlocks audio for the rest of the session, so the beeps
        // and horn land perfectly in sync instead of racing a timer
        if (goLiveBtn) {
            goLiveBtn.addEventListener("click", () => {
                unlockBroadcastAudio();
                goLiveBtn.disabled = true;
                startSequence();
            });
        }
    }

    /* ---------- theme toggle ---------- */
    function initTheme() {
        const btn = document.getElementById("themeToggle");
        if (!btn) return;

        const icon = btn.querySelector("span");
        const STORAGE_KEY = "ooutimes-theme";

        function applyTheme(isLight) {
            document.body.classList.toggle("light", isLight);
            if (icon) icon.textContent = isLight ? "☀️" : "🌙";
            btn.setAttribute("aria-pressed", String(isLight));
            btn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
        }

        let saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            /* localStorage unavailable (privacy mode, etc.) — default to dark */
        }

        applyTheme(saved === "light");

        btn.addEventListener("click", () => {
            const isLight = !document.body.classList.contains("light");
            applyTheme(isLight);
            try {
                localStorage.setItem(STORAGE_KEY, isLight ? "light" : "dark");
            } catch (e) {
                /* ignore */
            }
        });
    }

    /* ---------- begin broadcast ---------- */
    function initBeginBroadcast() {
        const beginBtn = document.getElementById("beginBtn");
        const storySection = document.getElementById("story");
        if (!beginBtn || !storySection) return;

        beginBtn.addEventListener("click", () => {
            storySection.scrollIntoView({ behavior: "smooth" });
        });
    }

    /* ---------- documentary archive ---------- */
    function mediaTileHTML(item) {
        const safeAlt = escapeAttr(item.alt);
        const thumbSrc = item.isVideo ? item.poster : item.src;

        return `
            <button class="media-tile${item.isVideo ? " is-video" : ""}" type="button"
                data-type="${item.isVideo ? "video" : "image"}"
                data-src="${escapeAttr(item.src)}"
                ${item.isVideo ? `data-poster="${escapeAttr(item.poster)}"` : ""}
                data-alt="${safeAlt}">
                <img src="${escapeAttr(thumbSrc)}" alt="${safeAlt}" loading="lazy">
                ${item.isVideo ? '<span class="play-icon" aria-hidden="true"></span>' : ""}
                <span class="media-index">${String(item.index).padStart(2, "0")} / ${String(item.total).padStart(2, "0")}</span>
            </button>
        `;
    }

    function renderArchive() {
        const container = document.getElementById("archiveContainer");
        if (!container || typeof ARCHIVE === "undefined") return;

        // photos only here — video lives exclusively in the broadcast
        // reel above, so it's never duplicated/silent in two places
        container.innerHTML = ARCHIVE.map((chapter) => {
            const total = chapter.photos.length;

            const photoTiles = chapter.photos
                .map((photo, idx) => {
                    return mediaTileHTML({
                        src: photo.src,
                        alt: photo.alt,
                        index: idx + 1,
                        total: total,
                        isVideo: false
                    });
                })
                .join("");

            return `
                <article class="chapter" id="chapter-${chapter.id}">
                    <div class="chapter-head">
                        <span class="chapter-num">${chapter.number}</span>
                        <div>
                            <p class="chapter-tag">${chapter.tag}</p>
                            <h3>${chapter.label}</h3>
                            <p class="chapter-caption">${chapter.caption}</p>
                        </div>
                    </div>

                    <div class="chapter-cover">
                        <img src="${escapeAttr(chapter.cover.src)}" alt="${escapeAttr(chapter.cover.alt)}" loading="lazy">
                    </div>

                    <div class="chapter-grid">
                        ${photoTiles}
                    </div>
                </article>
            `;
        }).join("");
    }

    /* ---------- lightbox (images + video) ---------- */
    function initLightbox() {
        const lightbox = document.getElementById("lightbox");
        const lightboxImage = document.getElementById("lightboxImage");
        const lightboxVideo = document.getElementById("lightboxVideo");
        const closeBtn = document.getElementById("lightboxClose");

        if (!lightbox || !lightboxImage || !lightboxVideo || !closeBtn) return;

        let lastFocused = null;

        function open(tile) {
            const type = tile.dataset.type;
            const src = tile.dataset.src;
            const alt = tile.dataset.alt || "";

            lastFocused = document.activeElement;

            if (type === "video") {
                lightboxVideo.src = src;
                lightboxVideo.hidden = false;
                lightboxImage.hidden = true;
                lightboxImage.removeAttribute("src");
                lightboxVideo.play().catch(() => {
                    /* autoplay can be blocked — controls remain available */
                });
            } else {
                lightboxImage.src = src;
                lightboxImage.alt = alt;
                lightboxImage.hidden = false;
                lightboxVideo.hidden = true;
                lightboxVideo.pause();
                lightboxVideo.removeAttribute("src");
            }

            lightbox.hidden = false;
            document.body.classList.add("lock-scroll");
            closeBtn.focus();
        }

        function close() {
            lightbox.hidden = true;
            document.body.classList.remove("lock-scroll");
            lightboxVideo.pause();
            lightboxVideo.removeAttribute("src");
            lightboxImage.removeAttribute("src");
            lightboxImage.alt = "";

            if (lastFocused && typeof lastFocused.focus === "function") {
                lastFocused.focus();
            }
        }

        // event delegation: works for archive tiles even though they're
        // rendered dynamically after this listener is attached
        document.addEventListener("click", (e) => {
            const tile = e.target.closest(".media-tile");
            if (tile) open(tile);
        });

        closeBtn.addEventListener("click", close);

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) close();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !lightbox.hidden) close();
        });
    }

    /* ---------- celebration confetti ---------- */
    function launchConfetti(targetEl) {
        if (!targetEl) return;
        const colors = ["#c81d2b", "#e8333f", "#c9a24a", "#e3c785", "#f1ece0"];
        const burst = document.createElement("div");
        burst.className = "confetti-burst";

        for (let i = 0; i < 36; i++) {
            const piece = document.createElement("span");
            piece.className = "confetti-piece";
            piece.style.left = (30 + Math.random() * 40) + "%";
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 0.3) + "s";
            piece.style.animationDuration = (1.6 + Math.random() * 1.2) + "s";
            piece.style.setProperty("--drift", (Math.random() * 200 - 100) + "px");
            piece.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
            burst.appendChild(piece);
        }

        targetEl.appendChild(burst);
        setTimeout(() => burst.remove(), 3200);
    }

    /* ---------- colophon (easter egg) ---------- */
    function initColophon() {
        const revealBtn = document.getElementById("revealCode");
        const codeBox = document.getElementById("codeBox");
        const compileBtn = document.getElementById("compileBtn");
        const compileOutput = document.getElementById("compileOutput");

        if (!revealBtn || !codeBox) return;

        revealBtn.addEventListener("click", () => {
            const willShow = codeBox.hasAttribute("hidden");
            codeBox.hidden = !willShow;
            revealBtn.setAttribute("aria-expanded", String(willShow));
            revealBtn.textContent = willShow ? "Hide Colophon" : "View Colophon";
        });

        if (!compileBtn || !compileOutput) return;

        let compiling = false;

        compileBtn.addEventListener("click", () => {
            if (compiling) return;
            compiling = true;
            compileBtn.disabled = true;
            compileOutput.textContent = "Compiling...";

            setTimeout(() => {
                compileOutput.textContent = "Linking libraries...";
            }, 1100);

            setTimeout(() => {
                compileOutput.textContent = "Building executable...";
            }, 2200);

            setTimeout(() => {
                compileOutput.innerHTML = `
                    ✅ BUILD SUCCESSFUL<br><br>
                    Output:<br><br>
                    Congratulations, Giggles 🤭<br>
                    Mass Communication — Class of 2026<br><br>
                    Special Broadcast Completed.<br><br>
                    — Lammyde
                `;
                compileBtn.disabled = false;
                compiling = false;
            }, 3400);
        });
    }

    /* ---------- scroll reveal ---------- */
    function initScrollReveal() {
        const sections = document.querySelectorAll("main > section");
        if (!sections.length) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
            sections.forEach((s) => s.classList.add("in-view"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        sections.forEach((section) => observer.observe(section));

        // safety net: never leave a section permanently offset — if for any
        // reason the observer doesn't fire (slow load, edge-case browser,
        // a section that's never actually scrolled past), settle everything
        // into place after a few seconds regardless.
        setTimeout(() => {
            sections.forEach((s) => s.classList.add("in-view"));
        }, 3500);
    }

    /* ---------- broadcast clock ---------- */
    function initBroadcastClock() {
        const clockEl = document.getElementById("broadcastClock");
        if (!clockEl) return;

        let seconds = 0;

        setInterval(() => {
            seconds++;
            const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
            const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
            const s = String(seconds % 60).padStart(2, "0");
            clockEl.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    /* ---------- broadcast reel (old-TV montage) ---------- */
    function initTvReel() {
        const tv = document.getElementById("tvReel");
        if (!tv || typeof ARCHIVE === "undefined") return;

        const img = document.getElementById("reelImage");
        const vid = document.getElementById("reelVideo");
        const chapterLabel = document.getElementById("reelChapterLabel");
        const staticEl = document.getElementById("reelStatic");
        const playPauseBtn = document.getElementById("reelPlayPause");
        const prevBtn = document.getElementById("reelPrev");
        const nextBtn = document.getElementById("reelNext");
        const muteBtn = document.getElementById("reelMute");

        if (!img || !vid || !chapterLabel || !playPauseBtn || !prevBtn || !nextBtn || !muteBtn) {
            return;
        }

        // flatten every chapter's cover + photos + videos into one ordered reel
        const items = [];
        ARCHIVE.forEach((chapter) => {
            items.push({
                type: "image",
                src: chapter.cover.src,
                alt: chapter.cover.alt,
                label: chapter.label,
                number: chapter.number
            });
            chapter.photos.forEach((photo) => {
                items.push({
                    type: "image",
                    src: photo.src,
                    alt: photo.alt,
                    label: chapter.label,
                    number: chapter.number
                });
            });
            chapter.videos.forEach((video) => {
                items.push({
                    type: "video",
                    src: video.src,
                    alt: video.alt,
                    label: chapter.label,
                    number: chapter.number
                });
            });
        });

        if (!items.length) return;

        const PHOTO_DURATION = 3200;
        const VIDEO_MAX_DURATION = 6500;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let index = 0;
        let playing = !prefersReducedMotion;
        let userMuted = false;
        let advanceTimer = null;

        function clearAdvanceTimer() {
            if (advanceTimer) {
                clearTimeout(advanceTimer);
                advanceTimer = null;
            }
        }

        function flicker() {
            if (prefersReducedMotion) return;
            staticEl.classList.remove("flicker");
            // restart the CSS animation
            void staticEl.offsetWidth;
            staticEl.classList.add("flicker");
        }

        function render(chapterChanged) {
            const item = items[index];
            chapterLabel.textContent = `CH ${item.number} · ${item.label.toUpperCase()}`;

            if (chapterChanged) flicker();

            if (item.type === "video") {
                img.hidden = true;
                img.removeAttribute("src");
                vid.src = item.src;
                // muted until the visitor has interacted at least once
                // (browser requirement) or they've manually muted the reel
                vid.muted = userMuted || !audioUnlocked;
                vid.volume = 0.22;
                vid.hidden = false;
                vid.currentTime = 0;
                if (playing) {
                    vid.play().catch(() => {
                        /* autoplay blocked — controls still work */
                    });
                }
            } else {
                vid.pause();
                vid.hidden = true;
                vid.removeAttribute("src");
                // restart the ken-burns animation on each new photo
                img.style.animation = "none";
                img.src = item.src;
                img.alt = item.alt || "";
                img.hidden = false;
                void img.offsetWidth;
                img.style.animation = "";
            }
        }

        function scheduleAdvance() {
            clearAdvanceTimer();
            if (!playing) return;
            const item = items[index];
            const duration = item.type === "video" ? VIDEO_MAX_DURATION : PHOTO_DURATION;
            advanceTimer = setTimeout(advance, duration);
        }

        function advance() {
            const previousChapter = items[index].number;
            index = (index + 1) % items.length;
            render(items[index].number !== previousChapter);
            scheduleAdvance();
        }

        function goPrev() {
            const previousChapter = items[index].number;
            index = (index - 1 + items.length) % items.length;
            render(items[index].number !== previousChapter);
            scheduleAdvance();
        }

        prevBtn.addEventListener("click", goPrev);
        nextBtn.addEventListener("click", advance);

        playPauseBtn.addEventListener("click", () => {
            playing = !playing;
            playPauseBtn.textContent = playing ? "⏸" : "▶";
            playPauseBtn.setAttribute("aria-label", playing ? "Pause" : "Play");

            if (playing) {
                if (items[index].type === "video") {
                    vid.play().catch(() => {});
                }
                scheduleAdvance();
            } else {
                clearAdvanceTimer();
                vid.pause();
            }
        });

        muteBtn.addEventListener("click", () => {
            userMuted = !userMuted;
            vid.muted = userMuted || !audioUnlocked;
            muteBtn.textContent = userMuted ? "🔇" : "🔊";
            muteBtn.setAttribute("aria-label", userMuted ? "Unmute" : "Mute");
        });

        vid.addEventListener("ended", () => {
            if (playing) advance();
        });

        // pause the reel when it's scrolled out of view — saves resources
        // and avoids audio playing somewhere off-screen unexpectedly
        if (typeof IntersectionObserver !== "undefined") {
            const visibilityObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            clearAdvanceTimer();
                            vid.pause();
                        } else if (playing) {
                            if (items[index].type === "video") {
                                vid.play().catch(() => {});
                            }
                            scheduleAdvance();
                        }
                    });
                },
                { threshold: 0.3 }
            );
            visibilityObserver.observe(tv);
        }

        if (!playing) {
            playPauseBtn.textContent = "▶";
            playPauseBtn.setAttribute("aria-label", "Play");
        }

        render(false);
        scheduleAdvance();
    }

    /* ---------- run ---------- */
    renderArchive();
    initTvReel();
    initTheme();
    initBeginBroadcast();
    initLightbox();
    initColophon();
    initScrollReveal();
    initBroadcastClock();
    initSound();
    initLoader();
})();