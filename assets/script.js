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
gsap.effects.entranceEffect(".item", { y: -20 });
gsap.effects.entranceEffect("nav h3", { y: -20 });
gsap.effects.entranceEffect(".talk", { y: -20 });
gsap.effects.entranceEffect(".taglines", { y: -50 });

const cursor = document.getElementById("cursor");

function cursorEffect(reel) {
  const reelShort = document.querySelector(reel);
  reelShort.addEventListener("mousemove", (details) => {
    cursor.style.display = "flex";
    gsap.to(cursor, {
      x: details.clientX,
      y: details.clientY,
    });
  });

  reelShort.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1,
    });
  });

  reelShort.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 0,
    });
  });
}

function navigationEffect() {
  const listItems = document.querySelectorAll(".item");
  listItems.forEach((item) => {
    let underline = item.querySelector(".underline");
    item.addEventListener("mouseover", () => {
      underline.style.display = "inline-block";
      gsap.fromTo(
        underline,
        {
          width: "0%",
          left: "0%",
        },
        {
          width: "100%",
          duration: 0.5,
        },
      );
    });
    item.addEventListener("mouseleave", () => {
      gsap.fromTo(
        underline,
        {
          width: "100%",
          left: "0%",
        },
        {
          width: "0%",
          left: "100%",
          duration: 0.5,
          immediateRender: false,
        },
      );
    });

    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      listItems.forEach((item) => {
        item.classList.remove("active");
      });
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

function textEffect(text) {
  let firstChild = text.querySelector("span");
  let lastChild = text.querySelector("span:last-of-type");
  text.addEventListener("mouseenter", () => {
    gsap.to(text, {
      duration: 0.3,
      x: 10,
    });
    gsap.to(firstChild, {
      y: 0,
      duration: 0.3,
    });
    gsap.to(lastChild, {
      y: -10,
      duration: 0.3,
    });
  });
  text.addEventListener("mouseleave", () => {
    gsap.to(text, {
      duration: 0.3,
      x: -18,
    });
    gsap.to(firstChild, {
      y: 10,
      duration: 0.3,
    });
    gsap.to(lastChild, {
      y: 0,
      duration: 0.3,
    });
  });
}

let playVideo = document.getElementById("page2-content");
let shortReel = document.querySelector(".reel-short");
let fullReel = document.querySelector(".reel-full");

playVideo.addEventListener("click", () => {
  const showFull = shortReel.style.display !== "none";
  const h5Text = cursor.querySelector("h5");

  if (showFull) {
    gsap.to(shortReel, {
      display: "none",
      rotate: 45,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
    });
    gsap.fromTo(
      fullReel,
      { display: "none", rotate: -45, opacity: 0, scale: 0.8 },
      {
        display: "flex",
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
    );
    h5Text.innerHTML = "Close Reel";
  } else {
    gsap.to(fullReel, {
      display: "none",
      rotate: 45,
      opacity: 0,
      duration: 0.8,
    });

    gsap.fromTo(
      shortReel,
      { display: "none", rotate: -45, opacity: 0 },
      { display: "flex", rotate: 0, opacity: 1, duration: 1 },
    );

    h5Text.innerHTML = "Play Reel";
  }
});

gsap.from(".page3-content h3", {
  y: -80,
  duration: 1,
  scrollTrigger: {
    trigger: ".page3-content h3",
    scroll: "body",
    markers: true,
    start: "top 60%",
    end: "top 40%",
    scrub: 3,
  },
});

let talkText = document.querySelector(".talk p");
let learnMore = document.querySelector(".learnMore p");
cursorEffect(".reel-short");
cursorEffect(".reel-full");
navigationEffect();
textEffect(talkText);
textEffect(learnMore);
