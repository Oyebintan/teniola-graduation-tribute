window.addEventListener("load", () => {

    const loader =
    document.getElementById("loader");

    const screen1 =
    document.getElementById("screen1");

    const screen2 =
    document.getElementById("screen2");

    const screen3 =
    document.getElementById("screen3");

    const countdown =
    document.getElementById("countdown");

    const skipBtn =
    document.getElementById("skipIntro");

    let count = 5;

    function endIntro(){

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 800);

    }

    skipBtn.addEventListener(
        "click",
        endIntro
    );

    setTimeout(() => {

        screen1.classList.remove("active");

        screen2.classList.add("active");

        const timer = setInterval(() => {

            count--;

            countdown.textContent = count;

            if(count === 0){

                clearInterval(timer);

                screen2.classList.remove("active");

                screen3.classList.add("active");

                setTimeout(() => {

                    endIntro();

                }, 1000);

            }

        }, 500);

    }, 2200);

});



/* theme toggle */

const themeBtn =
document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    themeBtn.textContent =
    document.body.classList.contains("light")
        ? "☀️"
        : "🌙";

});



/* begin broadcast */

const beginBtn =
document.querySelector(".primary-btn");

const storySection =
document.querySelector(".story");

beginBtn.addEventListener("click", () => {

    storySection.scrollIntoView({

        behavior: "smooth"

    });

});



/* reveal code */

const revealCode =
document.getElementById("revealCode");

const codeBox =
document.getElementById("codeBox");

revealCode.addEventListener("click", () => {

    if (codeBox.style.display === "block") {

        codeBox.style.display = "none";

    } else {

        codeBox.style.display = "block";

    }

});



/* compile */

const compileBtn =
document.getElementById("compileBtn");

const compileOutput =
document.getElementById("compileOutput");

compileBtn.addEventListener("click", () => {

    compileOutput.innerHTML =
    "Compiling...";

    setTimeout(() => {

        compileOutput.innerHTML =
        "Linking libraries...";

    }, 1200);

    setTimeout(() => {

        compileOutput.innerHTML =
        "Building executable...";

    }, 2500);

    setTimeout(() => {

        compileOutput.innerHTML = `
        ✅ BUILD SUCCESSFUL
        <br><br>

        Output:
        <br><br>

        Congratulations Giggles 🤭
        <br>

        Mass Communication
        <br>

        Class of 2026
        <br><br>

        Special Broadcast Completed.
        <br><br>

        — Lammyde
        `;

    }, 4000);

});



/* simple reveal animation */

const sections =
document.querySelectorAll(
"section:not(.hero)"
);

const observer =
new IntersectionObserver(

(entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform =
            "translateY(0px)";

        }

    });

},
{
    threshold: 0.15
}

);

sections.forEach((section) => {

    section.style.opacity = "0";

    section.style.transform =
    "translateY(40px)";

    section.style.transition =
    "all 0.8s ease";

    observer.observe(section);

    

let seconds = 0;

setInterval(() => {

    seconds++;

    const h =
    String(Math.floor(seconds/3600))
    .padStart(2,"0");

    const m =
    String(Math.floor(
    (seconds%3600)/60))
    .padStart(2,"0");

    const s =
    String(seconds%60)
    .padStart(2,"0");

    document.getElementById(
        "broadcastClock"
    ).textContent =
    `${h}:${m}:${s}`;

},1000);

const archive =
document.getElementById(
"archiveContainer"
);

if(archive){

archive.innerHTML = `

<div class="archive-level">

<h3>100 Level</h3>

<p>The beginning of the journey.</p>

<div class="archive-grid">

<img src="assets/photos/archive/100/featured.png">

<img src="assets/photos/archive/100/100l-2.JPG">

<img src="assets/photos/archive/100/100l-3.JPG">

<img src="assets/photos/archive/100/100l-4.JPG">

<img src="assets/photos/archive/100/100l-5.JPG">

</div>

</div>

<div class="archive-level">

<h3>200 Level</h3>

<p>More confidence. More growth.</p>

<div class="archive-grid">

<img src="assets/photos/archive/200/featured.jpg">

<img src="assets/photos/archive/200/200-1.jpeg">

<img src="assets/photos/archive/200/200-3.jpeg">

<img src="assets/photos/archive/200/200-4.png">

<img src="assets/photos/archive/200/200-5.png">

</div>

</div>

<div class="archive-level">

<h3>300 Level</h3>

<p>The most demanding academic year.</p>

<div class="archive-grid">

<img src="assets/photos/archive/300/featured.jpeg">

<img src="assets/photos/archive/300/300-2.jpg">

<img src="assets/photos/archive/300/300-3.jpg">

<img src="assets/photos/archive/300/300-4.jpg">

<img src="assets/photos/archive/300/300-5.jpeg">

</div>

</div>

<div class="archive-level">

<h3>Industrial Training</h3>

<p>Learning beyond the classroom.</p>

<div class="archive-grid">

<img src="assets/photos/archive/IT/featured.jpg">

<img src="assets/photos/archive/IT/it-2.jpg">

<img src="assets/photos/archive/IT/it-3.jpg">

</div>

</div>

<div class="archive-level">

<h3>400 Level</h3>

<p>The final chapter.</p>

<div class="archive-grid">

<img src="assets/photos/archive/400/featured.jpeg">

<img src="assets/photos/archive/400/IMG-20260329-WA0050.jpg">

<img src="assets/photos/archive/400/IMG-20260611-WA0075.jpg">

<img src="assets/photos/archive/400/IMG_1839.jpeg">

<img src="assets/photos/archive/400/IMG_7888.jpeg">

</div>

</div>

`;

}

const photos =
document.querySelectorAll(
".archive-grid img"
);

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

if(lightbox && lightboxImage){

    const photos =
    document.querySelectorAll(
    ".chapter-grid img"
    );

    photos.forEach(photo=>{

        photo.addEventListener(
        "click",
        ()=>{

            lightbox.style.display =
            "flex";

            lightboxImage.src =
            photo.src;

        });

    });

    lightbox.addEventListener(
    "click",
    ()=>{

        lightbox.style.display =
        "none";

    });

}