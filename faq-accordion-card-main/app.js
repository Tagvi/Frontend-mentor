document.querySelectorAll("p").forEach((paragraph) => {
  paragraph.classList.add("hidden");
});
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.nodeName === "IMG") {
    e.target.parentElement.nextElementSibling.classList.toggle("hidden");
  } else if (e.target.nodeName === "LI") {
    e.target.nextElementSibling.classList.toggle("hidden");
  }
});
