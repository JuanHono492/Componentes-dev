const scrollElement = document.querySelector(".carousel");
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");

function moveScroll(displacement) {
  let currentPosition = scrollElement.scrollLeft;
  scrollElement.scrollTo(currentPosition + displacement, 0);
}

scrollLeft.addEventListener("click", () => {
  moveScroll(-200);
});

scrollRight.addEventListener("click", () => {
  moveScroll(200);
});

onload = () => {
  console.log(scrollElement.style);
  if (scrollElement.style.display) {
    scrollLeft.style.display = "none";
  }
};