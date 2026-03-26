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
  text.addEventListener("mouseenter", () => {
    gsap.to(text, {
      duration: 0.3,
      x: 5,
    });
  });
  text.addEventListener("mouseleave", () => {
    gsap.to(text, {
      duration: 0.3,
      x: -18,
    });
  });
}

let playVideo = document.getElementById("page2-content");
let shortReel = document.querySelector(".reel-short");
let fullReel = document.querySelector(".reel-full");

playVideo.addEventListener("click", () => {
  const showFull = shortReel.style.display !== "none";
  let h5Text = cursor.querySelector("h5");

  shortReel.style.display = showFull ? "none" : "flex";
  fullReel.style.display = showFull ? "flex" : "none";
  
  h5Text.innerHTML = showFull ? "Close Reel" : "Play Reel";
});

let talkText = document.querySelector(".talk p");
cursorEffect(".reel-short");
cursorEffect(".reel-full");
navigationEffect();
textEffect(talkText);
