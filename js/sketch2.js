/** Donut with cool flow effect */

noise.seed(Math.random());
var COLOR_BACKGROUND = "#000";
var NOISE_SCALE = 0.007;

var canvas = document.getElementById("canvas-1");
var context = canvas.getContext("2d");

function onCanvasResize(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.fillStyle = COLOR_BACKGROUND;
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  points = [];
  createPoints();
}

class Point {
  constructor(x, y, color, weight = 10, decay = 0.03) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.weight = weight;
    this.decay = 0.02;
    this.lean = (2 * Math.PI * Math.random()) / 36;
  }

  draw() {
    if (this.weight < 0.01) {
      return;
    }
    const { x, y, color, weight, decay, lean } = this;
    const direction = perlin(x, y) * 2 * Math.PI;

    const c = (color >> 0).toString(16);
    const fill = `#${c}${c}${c}`;
    context.fillStyle = fill;

    context.beginPath();
    context.arc(x >> 0, y >> 0, weight / 2, 0, 2 * Math.PI, true);
    context.fill();

    this.x = x + Math.cos(direction) * 2;
    this.y = y + Math.sin(direction) * 2;
    this.weight = weight - decay;
  }
}

function perlin(x, y) {
  return (
    // convert [-1,1] to, [0,1]
    (noise.perlin2(x * NOISE_SCALE, y * NOISE_SCALE) + 1) / 2 //*
    // scale the noise
    // NOISE_SCALE
  );
}

let points = [];
function createPoints() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  // 10 circles
  for (var c = 0; c < 12; c++) {
    const dist = 100 + c * 30;
    // draw a circle
    for (let i = 0; i < 360; i += 2) {
      const distance = dist + Math.random() * 30;
      const radians = (i * Math.PI) / 180;

      const x = cx + Math.cos(radians) * distance;
      const y = cy + Math.sin(radians) * distance;
      points.push(new Point(x, y, 255 * perlin(x, y), 6, 0.004));
    }
  }
}

function init() {
  onCanvasResize();
  window.addEventListener("resize", onCanvasResize, false);
  window.requestAnimationFrame(update);
}

createPoints();
init();

function update() {
  for (let i = 0; i < points.length; i++) {
    points[i].draw();
  }

  window.requestAnimationFrame(update);
}
