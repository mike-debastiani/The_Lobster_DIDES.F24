const wrapper = document.querySelector(".main-wrapper");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;

document.addEventListener("mousemove", (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
});

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function animate() {
  mouseX = lerp(mouseX, targetX, 0.1);
  mouseY = lerp(mouseY, targetY, 0.1);

  wrapper.style.transform = `translate3d(${mouseX - 50}px, ${
    mouseY - 50
  }px, 0)`;

  requestAnimationFrame(animate);
}

animate();
