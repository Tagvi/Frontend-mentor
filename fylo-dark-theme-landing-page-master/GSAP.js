let tl = gsap.timeline({
  defaults: {
    opacity: 0,
    stagger: 0.3,
  },
});
tl.from("nav ul a, links--text", {
  y: 50,
  duration: 0.5,
}).from(".section--leading *", {
  x: 500,
  duration: 1.5,
});
gsap.from(".section--features", {
  scrollTrigger: {
    trigger: ".section--features",
  },
  x: 500,
  opacity: 0,
  duration: 2,
});
gsap.from(".section--productive", {
  scrollTrigger: {
    trigger: ".section--productive",
  },
  y: 100,
  opacity: 0,
  duration: 2,
});
gsap.from(".section--testimonials", {
  scrollTrigger: {
    trigger: ".section--testimonials",
  },
  y: 100,
  opacity: 0,
  duration: 2,
});
