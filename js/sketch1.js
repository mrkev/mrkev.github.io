noise.seed(Math.random());
var COLOR_BACKGROUND = "#000";
var NOISE_SCALE = 0.017;
var STROKE_COLOR = "#FFF";

var canvas = document.getElementById("canvas-1");
var context = canvas.getContext("2d");

const mouse = { x: 0, y: 0 };
function onMouseMove(e) {
  mouse.x = e.layerX;
  mouse.y = e.layerY;
}

function onCanvasResize(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function init() {
  canvas.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("resize", onCanvasResize, false);
  window.requestAnimationFrame(update);
  onCanvasResize();
}

function update() {
  context.fillStyle = COLOR_BACKGROUND;
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (var x = 0; x < window.innerWidth; x++) {
    var noiseVal = noise.perlin2(
      (mouse.x + x) * NOISE_SCALE,
      mouse.y * NOISE_SCALE
    );

    const noiseValUnit = (noiseVal + 1) / 2;
    context.strokeStyle = `rgb(${noiseValUnit * 255},${noiseValUnit *
      255},${noiseValUnit * 255})`;
    context.beginPath();
    context.lineWidth = 2;

    context.moveTo(x, mouse.y + noiseVal * 80);
    context.lineTo(x, window.innerHeight);
    context.stroke();
  }

  window.requestAnimationFrame(update);
}

init();
