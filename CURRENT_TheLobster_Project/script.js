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
  }, 5000); // Dauer der Verzögerung und CSS Animation in ms

  // Hinzufügen des Soundeffekts beim Überfahren von Videos
  /*const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    video.addEventListener("mouseenter", function () {
      this.muted = false;
      this.play();
    });

    video.addEventListener("mouseleave", function () {
      this.muted = true;
      this.pause();
    });
  });*/

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
  };
});

// Update the position of the custom cursor based on mouse movement
document.addEventListener("mousemove", function (event) {
  var cursor = document.querySelector(".custom-cursor");
  cursor.style.left = event.clientX + "px";
  cursor.style.top = event.clientY + "px";

  var cursorText = document.querySelector(".cursor-text");
  cursorText.style.left = event.clientX + 45 + "px"; // Adjust the horizontal position of the text
  cursorText.style.top = event.clientY + 17 + "px";
});

// Function to add hover effect
function addHoverEffect(selector) {
  var elements = document.querySelectorAll(selector);

  elements.forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      document
        .querySelector(".custom-cursor")
        .classList.add("custom-cursor-hover");
    });

    element.addEventListener("mouseleave", function () {
      document
        .querySelector(".custom-cursor")
        .classList.remove("custom-cursor-hover");
    });
  });
}

// Add hover effect to elements with the class .quote, .open-canvas-button, and .close-canvas-button
addHoverEffect(".quote");
addHoverEffect(".open-canvas-button");
addHoverEffect(".close-canvas-button");

/*document.addEventListener("DOMContentLoaded", function() {
  // Function to make the button visible
  function showButton() {
    const button = document.querySelector(".open-canvas-button");
    button.classList.add("visible");
  }
// Set a timeout to show the button after 8 seconds
setTimeout(showButton, 1000);

});*/

//================= Hover effect audio quotes =================

document.addEventListener("DOMContentLoaded", function () {
  function setupHoverSound(quoteId, audioId) {
    var quote = document.getElementById(quoteId);
    var hoverSound = document.getElementById(audioId);

    quote.addEventListener("mouseenter", function () {
      hoverSound.currentTime = 0; // Reset audio to the beginning
      hoverSound.play();
    });

    quote.addEventListener("mouseleave", function () {
      hoverSound.pause();
      hoverSound.currentTime = 0; // Reset audio to the beginning
    });
  }

  // Setup hover sound for all quotes
  setupHoverSound("quote-1", "hover-sound-1");

  setupHoverSound("quote-2", "hover-sound-2");

  setupHoverSound("quote-3", "hover-sound-3");

  setupHoverSound("quote-4", "hover-sound-4");

  setupHoverSound("quote-5", "hover-sound-5");

  setupHoverSound("quote-6", "hover-sound-6");

  setupHoverSound("quote-7", "hover-sound-7");

  setupHoverSound("quote-8", "hover-sound-8");

  setupHoverSound("quote-9", "hover-sound-9");

  setupHoverSound("quote-10", "hover-sound-10");
});
