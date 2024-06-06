document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const openCanvasButton = document.getElementById("openCanvasButton");
  const closeCanvasButton = document.getElementById("closeCanvasButton");
  const canvas = document.getElementById("canvas");
  const quote4 = document.getElementById("quote-4");

  let mouseActive = false;

  const handleMouseMove = (e) => {
    if (!mouseActive) {
      return;
    }
    const { clientX, clientY, currentTarget } = e;
    const { width: containerWidth, height: containerHeight } =
      currentTarget.getBoundingClientRect();
    const { width: galleryWidth, height: galleryHeight } =
      gallery.getBoundingClientRect();

    const factorX = galleryWidth / containerWidth;
    const factorY = galleryHeight / containerHeight;

    const centerX = galleryWidth / 2;
    const centerY = galleryHeight / 2;

    const deltaX = (centerX - clientX) * factorX;
    const deltaY = (centerY - clientY) * factorY;

    const transformX = -150 + (deltaX / galleryWidth) * 100;
    const transformY = -200 + (deltaY / galleryHeight) * 100;

    gallery.style.transform = `translate(${transformX}%,${transformY}%)`;
  };

  const container = document.querySelector(".container");

  document.addEventListener("keypress", (e) => {
    if (e.key === "a") {
      mouseActive = true;
    }
    if (e.key === "q") {
      mouseActive = false;
    }
  });

  container.addEventListener("mousemove", handleMouseMove);

  openCanvasButton.addEventListener("click", () => {
    canvas.style.bottom = "0";
    openCanvasButton.style.display = "none";
  });

  closeCanvasButton.addEventListener("click", () => {
    canvas.style.bottom = "-100%";
    openCanvasButton.style.display = "block";
  });

  // Deaktivieren der Mauspositions-Transformation bei Seitenladevorgang
  mouseActive = false;

  // Wartezeit für die Einblendungsanimation des Videos (2.5s = 0.5s Verzögerung + 2s Animation)
  setTimeout(() => {
    mouseActive = true;
  }, 2500); // Dauer der Verzögerung und CSS Animation in ms

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
  };
});
