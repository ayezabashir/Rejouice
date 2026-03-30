function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotiveScroll();

const cursor = document.getElementById("cursor");

function cursorEffect() {
  window.addEventListener("mousemove", (details) => {
    gsap.to(cursor, {
      x: details.clientX,
      y: details.clientY,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  const activeZones = ["#page2-content", ".reel-full"];
  activeZones.forEach((zone) => {
    const el = document.querySelector(zone);
    el.addEventListener("mouseenter", () =>
      gsap.to(cursor, { scale: 1, opacity: 1 }),
    );
    el.addEventListener("mouseleave", () =>
      gsap.to(cursor, { scale: 0, opacity: 0 }),
    );
  });
}

let playZone = document.getElementById("page2-content");
let shortReel = document.querySelector(".reel-short");
let fullReel = document.querySelector(".reel-full");
let fullVideo = fullReel.querySelector("video");

playZone.addEventListener("click", () => {
  fullReel.style.display = "flex";
  fullVideo.play();
  fullVideo.muted = false;

  gsap.fromTo(
    fullReel,
    { opacity: 0, scale: 0.8, rotate: -45 },
    { opacity: 1, scale: 1, duration: 0.5, rotate: 0, ease: "back.out(1.7)" },
  );
  cursor.querySelector("h5").innerHTML = "Close";
});

fullReel.addEventListener("click", () => {
  gsap.to(fullReel, {
    opacity: 0,
    duration: 0.4,
    rotate: 45,
    onComplete: () => {
      fullReel.style.display = "none";
      fullVideo.pause();
      fullVideo.currentTime = 0;
      cursor.querySelector("h5").innerHTML = "Play Reel";
    },
  });
});

function navigationEffect() {
  const listItems = document.querySelectorAll(".item");
  listItems.forEach((item) => {
    let underline = item.querySelector(".underline");
    item.addEventListener("mouseover", () => {
      underline.style.display = "inline-block";
      gsap.fromTo(underline, { width: "0%" }, { width: "100%", duration: 0.5 });
    });
    item.addEventListener("mouseleave", () => {
      gsap.fromTo(
        underline,
        { width: "100%" },
        { width: "0%", left: "100%", duration: 0.5, immediateRender: false },
      );
    });
    item.addEventListener("click", () => {
      listItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

function textEffect(text) {
  let firstChild = text.querySelector("span");
  let lastChild = text.querySelector("span:last-of-type");
  text.addEventListener("mouseenter", () => {
    gsap.to(text, { duration: 0.3, x: 10 });
    gsap.to(firstChild, { y: 0, duration: 0.3 });
    gsap.to(lastChild, { y: -10, duration: 0.3 });
  });
  text.addEventListener("mouseleave", () => {
    gsap.to(text, { duration: 0.3, x: -18 });
    gsap.to(firstChild, { y: 10, duration: 0.3 });
    gsap.to(lastChild, { y: 0, duration: 0.3 });
  });
}

gsap.registerEffect({
  name: "entranceEffect",
  effect: (targets, config) => {
    return gsap.from(targets, {
      duration: config.duration,
      stagger: -0.09,
      y: config.y,
      opacity: 0,
    });
  },
  defaults: { duration: 0.5, y: -100 },
});

gsap.effects.entranceEffect(".letter", { duration: 1 });
gsap.effects.entranceEffect(".item, nav h3, .talk", { y: -20 });
gsap.effects.entranceEffect(".taglines", { y: -50 });

gsap.from(".page3-content h3", {
  y: 120,
  opacity: 0,
  duration: 0.5,
  scrollTrigger: {
    trigger: ".page3-content h3",
    scroller: "#main",
    start: "top 50%",
    end: "top 45%",
    scrub: 2,
  },
});

cursorEffect();
navigationEffect();
textEffect(document.querySelector(".talk p"));
textEffect(document.querySelector(".learnMore p"));
textEffect(document.querySelector(".seeWork p"));

function caseStudyEffect(container, videoDiv, logo) {
  gsap.set(videoDiv, {
    scale: 0,
    xPercent: -50,
    yPercent: -50,
    opacity: 0,
  });

  container.addEventListener("mouseenter", () => {
    gsap.to(videoDiv, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(container.querySelector("img"), {
      filter: "brightness(0.6)",
      duration: 0.3,
    });
    gsap.to(logo, {
      scale: 0,
      duration: 0.3,
    });
  });

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(videoDiv, {
      x: x,
      y: y,
      duration: 0.6,
      ease: "power2.out",
    });
  });

  container.addEventListener("mouseleave", () => {
    gsap.to(videoDiv, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    });
    gsap.to(container.querySelector("img"), {
      filter: "brightness(1)",
      duration: 0.3,
    });
    gsap.to(logo, {
      scale: 1,
      duration: 0.3,
    });
  });
}

const case1 = document.querySelector(".casestudy_1");
const case1Vid = document.querySelector(".case1_vid");
const watermark1 = document.querySelector(".watermark_1");
const case2 = document.querySelector(".casestudy_2");
const case2Vid = document.querySelector(".case2_vid");
const watermark2 = document.querySelector(".watermark_2");
const case3 = document.querySelector(".casestudy_3");
const vase3Vid = document.querySelector(".case3_vid");
const watermark3 = document.querySelector(".watermark_3");

caseStudyEffect(case1, case1Vid, watermark1);
caseStudyEffect(case2, case2Vid, watermark2);
caseStudyEffect(case3, vase3Vid, watermark3);

const animatedBorder = document.querySelector(".animatedBorder");
gsap.from(animatedBorder, {
  width: 0,
  duration: 0.2,
  scrollTrigger: {
    scroller: "#main",
    trigger: animatedBorder,
    scrub: 2,
    start: "top 80%",
    end: "top 78%",
  },
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const usa_time = document.querySelector(".usa_time");
const france_time = document.querySelector(".france_time");

const parisFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Paris",
  timeStyle: "medium",
});

const sdFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  timeStyle: "medium",
});

function displayTime() {
  const now = new Date();

  if (france_time) france_time.textContent = parisFormatter.format(now);
  if (usa_time) usa_time.textContent = sdFormatter.format(now);
}

displayTime();
const timerId = setInterval(displayTime, 1000);

// move needles
const needle_paris = document.querySelector(".hour_needle_paris");
const needle_sandiego = document.querySelector(".hour_needle_sandiego");
const needle_seconds = document.querySelector(".needle_seconds");
const needle_minutes = document.querySelector(".needle_minutes");
