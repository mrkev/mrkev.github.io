/** perlin noise waves */
noise.seed(Math.random());
var COLOR_BACKGROUND = "#000";
var COLOR_FOREGROUND = "#FFF";
var NOISE_SCALE = 0.017;

var canvas = document.getElementById("canvas-1");
var context = canvas.getContext("2d");

const mouse = { x: 0, y: 0 };
function onMouseMove(e) {
  mouse.x = e.layerX;
  mouse.y = e.layerY;
}

let HALF = window.innerHeight / 2;

function onCanvasResize(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  HALF = window.innerHeight / 2;
}

// Prevents window from moving on touch on newer browsers.
window.addEventListener(
  "touchmove",
  function(event) {
    event.preventDefault();
  },
  { passive: false }
);

function init() {
  canvas.addEventListener("pointermove", onMouseMove, false);
  window.addEventListener("resize", onCanvasResize, false);
  window.requestAnimationFrame(update);
  onCanvasResize();
}

function update() {
  const WINDOW_WIDTH = window.innerWidth;
  const WINDOW_HEIGHT = window.innerHeight;
  context.fillStyle = COLOR_BACKGROUND;
  context.strokeStyle = COLOR_FOREGROUND;
  context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  context.lineWidth = 2;

  for (let x = 0; x < WINDOW_WIDTH; x++) {
    const noiseVal = noise.perlin2(
      (mouse.x + x) * NOISE_SCALE,
      mouse.y * NOISE_SCALE
    );

    // var noiseValUnit = (noiseVal + 1) / 2;
    // var lum = String(Math.ceil(noiseValUnit * 100)) + "%";
    // This uses a lot of memory apparently, and slows things
    // down a lot. Makes sense, it's a lot of strings.
    // context.strokeStyle = "hsl(0,0%," + lum + ")";

    context.beginPath();
    context.moveTo(x, mouse.y + noiseVal * 80);
    context.lineTo(x, HALF);
    context.stroke();
  }

  window.requestAnimationFrame(update);
}

init();
