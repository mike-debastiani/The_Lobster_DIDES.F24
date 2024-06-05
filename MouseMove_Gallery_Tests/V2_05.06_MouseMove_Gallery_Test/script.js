document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const factor = 20; // Adjust this value to change the sensitivity
    const deltaX = (centerX - clientX) / factor;
    const deltaY = (centerY - clientY) / factor;

    gallery.style.transform = `translate(calc(-50% + ${deltaX}%), calc(-50% + ${deltaY}%))`;
  };

  const container = document.querySelector(".container");
  container.addEventListener("mousemove", handleMouseMove);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
  };
});
