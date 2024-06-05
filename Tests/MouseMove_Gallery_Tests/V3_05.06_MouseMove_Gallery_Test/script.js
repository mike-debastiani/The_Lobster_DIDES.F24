const container = document.querySelector(".container");
const gallery = document.querySelector(".gallery");
let isDragging = false;
let startX, startY;
let translateX = (-100 * window.innerWidth) / 100;
let translateY = (-100 * window.innerHeight) / 100;

const followMouse = (e) => {
  const rect = container.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 300 - 150;
  const y = ((e.clientY - rect.top) / rect.height) * 300 - 150;
  gallery.style.transform = `translate3d(${-x}vw, ${-y}vh, 0)`;
};

const startDrag = (e) => {
  isDragging = true;
  startX = e.pageX - translateX;
  startY = e.pageY - translateY;
};

const drag = (e) => {
  if (isDragging) {
    e.preventDefault();
    translateX = e.pageX - startX;
    translateY = e.pageY - startY;
    gallery.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  }
};

const stopDrag = () => {
  isDragging = false;
};

// Follow mouse movement on desktop
container.addEventListener("mousemove", (e) => {
  if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    followMouse(e);
  }
});

// Drag behavior on mobile
container.addEventListener("mousedown", startDrag);
container.addEventListener("mouseup", stopDrag);
container.addEventListener("mousemove", drag);
container.addEventListener("mouseleave", stopDrag);
