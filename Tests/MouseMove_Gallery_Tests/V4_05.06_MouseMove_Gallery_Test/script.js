document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  const handleMouseMove = (e) => {
    if (!mouseActive) {
      return;
    }
    const { clientX, clientY, currentTarget } = e;
    const { width: containerWidth, height: containerHeight } =
      currentTarget.getBoundingClientRect();
    const { width: galleryWidth, height: galleryHeight } =
      gallery.getBoundingClientRect();

    console.log(
      `container width: ${containerWidth} gallery width: ${galleryWidth} height: ${galleryHeight}`
    );
    // Berücksichtigung der Galeriegröße
    const factorX = galleryWidth / containerWidth;
    const factorY = galleryHeight / containerHeight;

    // Mittelpunkt der Galerie
    const centerX = galleryWidth / 2;
    const centerY = galleryHeight / 2;

    // Abstand des Mauszeigers zum Mittelpunkt der Galerie
    const deltaX = (centerX - clientX) * factorX;
    const deltaY = (centerY - clientY) * factorY;

    // Transformationsberechnung ((haelfte der css vh vw, ))
    const transformX = -150 + (deltaX / galleryWidth) * 100;
    const transformY = -150 + (deltaY / galleryHeight) * 100;

    // Anwenden der Transformation
    gallery.style.transform = `translate(${transformX}%,${transformY}%)`;
  };

  const container = document.querySelector(".container");
  let mouseActive = true;

  document.addEventListener("keypress", (e) => {
    if (e.key === "a") {
      mouseActive = true;
    }
    if (e.key === "q") {
      mouseActive = false;
    }
  });
  container.addEventListener("mousemove", handleMouseMove);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
  };
});
