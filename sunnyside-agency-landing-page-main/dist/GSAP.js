let tl = gsap.timeline({
  defaults: {
    opacity: 0,
    stagger: 0.1,
  },
});
tl.from("nav *", {
  duration: 1,
  y: 20,
}).from(".leading *", {
  duration: 2,
});
gsap.from(".glass , .standout", {
  scrollTrigger: {
    trigger: ".glass",
  },
  x: 500,
  duration: 2,
  opacity: 0,
});
gsap.from(".testimonials *", {
  scrollTrigger: {
    trigger: ".testimonials",
  },
  stagger: 0.15,
  y: 200,
  duration: 1,
  opacity: 0,
});
