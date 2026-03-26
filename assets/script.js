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
gsap.effects.entranceEffect(".item",{y:-20});
gsap.effects.entranceEffect("nav h3", { y: -20 });
gsap.effects.entranceEffect(".talk", { y: -20 });
gsap.effects.entranceEffect(".taglines", { y: -50 });

function cursorEffect() {
  const page1Content = document.getElementById("page2");
  const cursor = document.getElementById("cursor");

  page1Content.addEventListener("mousemove", (details) => {
    cursor.style.display="flex"
    gsap.to(cursor, {
      x: details.clientX,
      y: details.clientY,
    });
  });

  page1Content.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1,
    });
  });

  page1Content.addEventListener("mouseleave", () => {
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
      x: 0,
    });
  });
  text.addEventListener("mouseleave", () => {
    gsap.to(text, {
      duration: 0.3,
      x: -18,
    });
  });
}

let talkText = document.querySelector(".talk p");

cursorEffect();
navigationEffect();
textEffect(talkText);
