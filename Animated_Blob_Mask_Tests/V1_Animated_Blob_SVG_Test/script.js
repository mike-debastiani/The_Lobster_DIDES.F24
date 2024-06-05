document.addEventListener("DOMContentLoaded", () => {
  const blob = document.getElementById("blob");

  const paths = [
    "M487.998 4.2795C393.198 -20.5205 217.656 67.9054 138.327 129.592C-195.808 389.419 150.998 544.28 384.498 604.78C617.998 665.28 649.368 528.251 663.327 325.592C676.827 129.592 606.498 35.2795 487.998 4.2795Z",
    "M410.5 3.49993C315.193 26.2754 164.5 130 100.5 207.5C-169.018 533.869 163.5 598.5 397 659C630.5 719.5 734.041 603.658 748 401C761.5 205 546.5 -29 410.5 3.49993Z",
    "M266.5 3.49998C169.063 13.8933 51.6456 163.311 18.5 251C-60.5 460 137.29 667 378.5 667C478 667 637.541 629.658 651.5 427C665 231 604 -32.4999 266.5 3.49998Z",
    "M271.5 4.00006C174.063 14.3933 -24 76.5 3.50005 341C26.6057 563.234 109.29 749.5 350.5 749.5C450 749.5 607.541 660.158 621.5 457.5C635 261.5 609 -31.9998 271.5 4.00006Z",
  ];

  let currentIndex = 0;
  let start = null;
  const duration = 3000; // Duration of one transition

  function animatePath(time) {
    if (!start) start = time;
    const progress = (time - start) / duration;

    const fromPath = paths[currentIndex];
    const toPath = paths[(currentIndex + 1) % paths.length];

    const newPath = interpolatePaths(fromPath, toPath, progress);
    blob.setAttribute("d", newPath);

    if (progress < 1) {
      requestAnimationFrame(animatePath);
    } else {
      start = time;
      currentIndex = (currentIndex + 1) % paths.length;
      requestAnimationFrame(animatePath);
    }
  }

  function interpolatePaths(from, to, progress) {
    const fromCommands = from.match(/[a-df-z][^a-df-z]*/gi);
    const toCommands = to.match(/[a-df-z][^a-df-z]*/gi);
    const interpolatedCommands = fromCommands.map((fromCommand, i) => {
      const toCommand = toCommands[i];
      if (fromCommand[0].toLowerCase() !== "c") return fromCommand; // Keep the non-curve commands unchanged
      const fromPoints = fromCommand.match(/-?\d+(\.\d+)?/g).map(Number);
      const toPoints = toCommand.match(/-?\d+(\.\d+)?/g).map(Number);
      const interpolatedPoints = fromPoints.map((fromPoint, j) => {
        return fromPoint + (toPoints[j] - fromPoint) * progress;
      });
      return `${fromCommand[0]}${interpolatedPoints.join(" ")}`;
    });
    return interpolatedCommands.join("");
  }

  requestAnimationFrame(animatePath);
});
