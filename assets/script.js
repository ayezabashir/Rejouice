const logoTl = gsap.timeline();
logoTl.from(".letter", {
  stagger: -0.09,
  y: 100,
  opacity: 0,
});

function cursorEffect() {
  const page1Content = document.getElementById("page1-content");
  const cursor = document.getElementById("cursor");

  page1Content.addEventListener("mousemove", (details) => {
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

cursorEffect();
