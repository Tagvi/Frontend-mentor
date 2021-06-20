const burger = document.querySelector(".burger");
const menu = document.querySelector(".mobile-menu");
burger.addEventListener("click", () => {
  if (menu.classList.contains("hidden")) {
    gsap.to(".mobile-menu", {
      x: 0,
      opacity: 1,
    });
  } else {
    gsap.to(".mobile-menu", {
      x: 500,
      opacity: 0,
    });
  }
  menu.classList.toggle("hidden");
});
