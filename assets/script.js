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

var tl = gsap.timeline();
tl.from("#loader h3", {
  x: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
});

tl.to("#loader h3", {
  opacity: 0,
  x: -40,
  stagger: 0.1,
  duration: 1,
});

tl.to("#loader", {
  opacity: 0,
});

tl.to("#loader", {
  display: "none",
});

tl.from(
  "#page1",
  {
    y: "-100%",
    duration: 0.5,
  },
  "<",
);

tl.from(
  "#page2",
  {
    opacity: 0,
    backgroundColor: "white",
  },
  "<",
);

tl.from(
  "#page1-content",
  {
    opacity: 0,
    y: 150,
    duration: 0.6,
  },
  "<",
);

tl.from(".letter", {
  opacity: 0,
  y: -50,
  duration: 0.4,
  stagger: -0.15,
});

tl.from(
  ".item, nav h3, .talk",
  {
    opacity: 0,
    y: -20,
  },
  "<",
);

tl.from(".hero-foot", {
  y: 100,
  opacity: 0,
});

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
textEffect(document.querySelector(".slide_seven .learnMore p"));
textEffect(document.querySelector(".social_one p"));
textEffect(document.querySelector(".social_two p"));

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
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  speed: 5000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  freeMode: true,
});

const swiperContainer = document.querySelector(".mySwiper");

swiperContainer.addEventListener("mouseenter", () => {
  swiper.autoplay.stop();
});

swiperContainer.addEventListener("mouseleave", () => {
  swiper.autoplay.start();
});

let swiperAnimation = () => {
  const mySwiper = document.querySelector("#swiperSection");
  gsap.from(mySwiper, {
    y: 50,
    x: -50,
    skewY: 5,
    opacity: 0,
    scrollTrigger: {
      trigger: mySwiper,
      scroller: "#main",
      start: "top 35%",
      end: "top 45%",
      scrub: 2,
    },
  });
};

swiperAnimation();
const usa_time = document.querySelector(".usa_time");
const france_time = document.querySelector(".france_time");

const parisFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Paris",
  timeStyle: "medium",
});

const sdFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  timeStyle: "medium",
});

function displayTime() {
  const now = new Date();

  if (france_time) france_time.textContent = parisFormat.format(now);
  if (usa_time) usa_time.textContent = sdFormat.format(now);
}

displayTime();
const timerId = setInterval(displayTime, 1000);

// move needles
const needle_paris = document.querySelector(".hour_needle_paris");
const needle_sandiego = document.querySelector(".hour_needle_sandiego");
const needle_seconds = document.querySelector(".needle_seconds");
const needle_minutes = document.querySelector(".needle_minutes");
const minuteFormatter = new Intl.DateTimeFormat("en-US", {
  minute: "2-digit",
});

const secondFormatter = new Intl.DateTimeFormat("en-US", {
  second: "2-digit",
});

const parisFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
});

const sdFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  hour: "2-digit",
});

function clockStyle() {
  const now = new Date();
  let currMinute = now.getMinutes();
  let currSecond = now.getSeconds();

  let parisHour =
    parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Paris",
        hour: "numeric",
        hour12: false,
      }).format(now),
    ) % 12;

  let sdHour =
    parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        hour12: false,
      }).format(now),
    ) % 12;

  needle_paris.style.transform = `translateX(-50%) rotate(${scale(parisHour, 0, 12, 0, 360)}deg)`;
  needle_sandiego.style.transform = `translateX(-50%) rotate(${scale(sdHour, 0, 12, 0, 360)}deg)`;
  needle_minutes.style.transform = `translateX(-50%) rotate(${scale(currMinute, 0, 60, 0, 360)}deg)`;
  needle_seconds.style.transform = `translateX(-50%) rotate(${scale(currSecond, 0, 60, 0, 360)}deg)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
clockStyle();
setInterval(clockStyle, 1000);

const slide_3_img = document.querySelectorAll(
  ".slide_three .bottom-section img",
);
const slide_5_img = document.querySelectorAll(
  ".slide_five .bottom-section img",
);
let currentIndex = 0;

setInterval(() => {
  slide_3_img.forEach((img) => {
    img.classList.remove("active");
  });
  slide_3_img[currentIndex].classList.add("active");
  currentIndex = (currentIndex + 1) % slide_3_img.length;
}, 1000);

setInterval(() => {
  slide_5_img.forEach((img) => {
    img.classList.remove("active");
  });
  slide_5_img[currentIndex].classList.add("active");
  currentIndex = (currentIndex + 1) % slide_5_img.length;
}, 1000);

const slideContent = document.querySelector(".slide_content");
const paragraphs = gsap.utils.toArray(".slide_content p");

function updateOpacities() {
  const currentParas = document.querySelectorAll(".slide_content p");
  currentParas.forEach((p, i) => {
    if (i === 0) p.style.opacity = "1";
    else if (i === 1) p.style.opacity = "0.66";
    else if (i === 2) p.style.opacity = "0.46";
    else p.style.opacity = "0";
  });
}

updateOpacities();

function scrollText() {
  const firstItem = slideContent.querySelector("p");
  const itemHeight = firstItem.offsetHeight + 10;

  gsap.to(slideContent, {
    y: -itemHeight,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      slideContent.appendChild(firstItem);
      gsap.set(slideContent, { y: 0 });
      updateOpacities();
    },
  });
}
setInterval(scrollText, 1000);

const slide_eight_bottom = document.querySelector(
  ".slide_eight .bottom-section",
);
const slide_eight = document.querySelector(".slide_eight");
const percentText = document.querySelector(".slide_eight .percentage-p");
let countData = { value: 125 };

slide_eight.addEventListener("mouseenter", () => {
  gsap.to(countData, {
    value: 150,
    duration: 0.8,
    ease: "power2.out",
    onUpdate: () => {
      percentText.textContent = `${Math.round(countData.value)}%`;
    },
  });
  gsap.to(slide_eight_bottom, {
    display: "block",
    opacity: 1,
    y: 0,
    duration: 0.5,
  });
});

slide_eight.addEventListener("mouseleave", () => {
  gsap.to(countData, {
    value: 125,
    duration: 0.5,
    onUpdate: () => {
      percentText.textContent = `${Math.round(countData.value)}%`;
    },
  });

  gsap.to(slide_eight_bottom, {
    opacity: 0,
    y: 20,
    duration: 0.4,
    onComplete: () => gsap.set(slide_eight_bottom, { display: "none" }),
  });
});

const slide_nine = document.querySelector(".slide_nine");
const slide_nine_vid = document.querySelector(".slide_nine .bg-video");
slide_nine_vid.muted = true;

slide_nine.addEventListener("mouseenter", () => {
  gsap.killTweensOf(slide_nine_vid);
  slide_nine_vid.play();
  gsap.to(slide_nine_vid, {
    opacity: 1,
    duration: 0.5,
  });
});

slide_nine.addEventListener("mouseleave", () => {
  gsap.to(slide_nine_vid, {
    currentTime: 0,
    duration: 1,
    ease: "none",
    onComplete: () => {
      slide_nine_vid.pause();
    },
  });
});

const portfolioVid = document.querySelector(".portfolio-vid");
gsap.fromTo(
  portfolioVid,
  {
    scale: 0.4,
  },
  {
    scale: 1,
    scrollTrigger: {
      trigger: ".portfolio-loop",
      scroller: "#main",
      start: "top 70%",
      end: "top 20%",
      scrub: 2,
    },
  },
);

const contactHover = document.querySelector(".contact");
contactHover.addEventListener("mouseenter", () => {
  gsap.fromTo(
    ".contact h3",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      y: -110,
      duration: 0.5,
    },
  );
  gsap.to(".contact .line", {
    width: "220px",
    right: "41%",
  });
});

contactHover.addEventListener("mouseleave", () => {
  gsap.to(".contact h3", {
    y: 0,
    duration: 0.5,
  });
  gsap.to(".contact .line", {
    right: "36%",
    width: "338px",
  });
});

const footer = document.querySelector(".footer");
gsap.from(footer, {
  y: "-30%",
  scrollTrigger: {
    scroller: "#main",
    trigger: ".footer",
    start: "top 40%",
    end: "top 36%",
    scrub: 5,
  },
});

gsap.from(".footer_letter", {
  opacity: 0,
  y: -50,
  duration: 0.4,
  stagger: -0.15,
  scrollTrigger: {
    scroller: "#main",
    trigger: ".footer_letter",
    start: "bottom 60%",
  },
});
