const wrapper = document.querySelector(".main-wrapper");
const galleryRef = wrapper; // Assuming the .main-wrapper is the target element
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;

document.addEventListener("mousemove", (event) => {
  const { clientX, clientY, currentTarget } = event;
  const { width, height } = wrapper.getBoundingClientRect();
  const centerX = width / 2;
  const centerY = height / 2;

  const factor = 1; // Adjust this factor as needed
  const deltaX = (centerX - clientX) / factor;
  const deltaY = (centerY - clientY) / factor;

  targetX = deltaX;
  targetY = deltaY;
});

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function animate() {
  mouseX = lerp(mouseX, targetX, 0.1);
  mouseY = lerp(mouseY, targetY, 0.1);

  galleryRef.style.transform = `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px))`;

  requestAnimationFrame(animate);
}

animate();
