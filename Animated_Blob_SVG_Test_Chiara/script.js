document.addEventListener("DOMContentLoaded", () => {
  const blob = document.getElementById("blob");

  const paths = [
    "M496 4.5C401.2 -20.3 217.656 85.9054 138.327 147.592C-195.808 407.419 150.998 562.28 384.498 622.78C617.998 683.28 649.368 546.251 663.327 343.593C676.827 147.592 614.5 35.5 496 4.5Z",
    "M482.998 4.03628C388.198 -20.7637 219.329 74.3352 140 136.022C-194.135 395.849 145.998 585.257 379.498 645.757C612.998 706.257 660.042 543.681 674 341.022C687.5 145.022 601.498 35.0363 482.998 4.03628Z",
    "M510.5 8.99997C384.5 -30.4999 218.329 74.8127 139 136.5C-195.135 396.326 149.998 579.248 383.498 639.748C616.998 700.248 676.041 555.172 690 352.513C703.5 156.513 636.5 48.4999 510.5 8.99997Z",
    "M486.998 4.2159C392.198 -20.5841 218.329 69.5147 139 131.202C-195.135 391.028 149.998 576.936 383.498 637.436C616.998 697.936 653.041 543.86 667 341.202C680.5 145.202 605.498 35.2159 486.998 4.2159Z",
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
