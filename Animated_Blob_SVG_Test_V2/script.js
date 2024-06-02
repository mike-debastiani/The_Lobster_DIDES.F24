const morphPath = document.getElementById("morphPath");
const paths = [
  "M483.5 4.73577C388.7 -20.0642 255.829 57.6369 176.5 119.324C-157.635 379.151 45.5001 579.324 279 639.824C512.5 700.324 629.042 546.482 643.001 343.824C656.501 147.824 602 35.7358 483.5 4.73577Z",
  "M496 4.5C401.2 -20.3 217.656 85.9054 138.327 147.592C-195.808 407.419 150.998 562.28 384.498 622.78C617.998 683.28 649.368 546.251 663.327 343.593C676.827 147.592 614.5 35.5 496 4.5Z",
  "M485.5 8.50011C361 -22.625 110.862 42.1552 44.4794 160.236C-87.5 395 99.5 577 333 637.5C566.5 698 678.022 556.394 691.98 353.736C705.48 157.736 619.5 42.0002 485.5 8.50011Z",
  "M476 4.5C381.2 -20.3 225.829 70.813 146.5 132.5C-187.635 392.327 124 592.288 357.5 652.788C591 713.288 627.541 508.658 641.5 306C655 110 594.5 35.5 476 4.5Z",
];

let index = 0;

const morph = () => {
  anime({
    targets: "#morphPath",
    d: [{ value: paths[index] }],
    easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 1500,
    complete: () => {
      index = (index + 1) % paths.length;
      morph();
    },
  });
};

morph();
