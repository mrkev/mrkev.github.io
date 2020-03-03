/** Particles */

var COLOR_BACKGROUND = "#D9CB9E";
var COLOR_MOUSE = "#DC3522";
var COLOR_1 = "#374140";
var COLOR_2 = "#2A2C2B";
var COLOR_3 = "#1E1E20";

let WINDOW_HEIGHT = window.innerHeight;
let WINDOW_WIDTH = window.innerWidth;

////////////////////////////// Particles

function randDir() {
  return Math.random() < 0.5 ? -1 : 1;
}

function randBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function Particle() {
  this.x = Math.random() * WINDOW_WIDTH;
  this.y = Math.random() * WINDOW_HEIGHT;
  this.vx = randDir() * randBetween(1, 3);
  this.vy = randDir() * randBetween(1, 3);
  this.past = []; // to draw the tail
  this.size = 5 * Math.random() + 5;
  this.color =
    Math.random() > 0.5 ? COLOR_1 : Math.random() > 0.5 ? COLOR_2 : COLOR_3;
}

Particle.prototype.tick = function() {
  this.x += this.vx;
  this.y += this.vy;

  if (this.x > WINDOW_WIDTH) {
    this.vx *= -1;
  } else if (this.x < 0) {
    this.vx = 1 + Math.random();
  }

  if (this.y > WINDOW_HEIGHT) {
    this.vy = -1;
  } else if (this.y < 0) {
    this.vy = 1;
  }
};

Particle.prototype.commit = function() {
  this.past.push({ x: this.x, y: this.y });
  if (this.past.length > 45) {
    this.past.shift();
  }
};

var particles = [];
for (var i = 0; i < 64; i++) {
  particles.push(new Particle());
}

///////////////////////////////////// Mouse

function Mouse() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.color = COLOR_MOUSE;
  this.past = []; // to draw the tail
}

var requested = false; // debounce this method
Mouse.prototype.onMove = function(e) {
  e.preventDefault();
  e.stopPropagation();

  if (requested) {
    return;
  }

  if (this.x !== 0 && this.y !== 0) {
    this.past.push({ x: this.x, y: this.y });
  }
  if (this.past.length > 45) {
    this.past.shift();
  }

  this.vx = e.layerX - this.x;
  this.vy = e.layerY - this.y;
  this.x = e.layerX;
  this.y = e.layerY;

  window.requestAnimationFrame(update);
  requested = true;
};

var mouse = new Mouse();

var canvas = document.getElementById("canvas-1");
var context = canvas.getContext("2d");

function onCanvasResize(e) {
  WINDOW_HEIGHT = window.innerHeight;
  WINDOW_WIDTH = window.innerWidth;
  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;
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
  canvas.addEventListener("pointermove", mouse.onMove.bind(mouse), false);
  window.addEventListener("resize", onCanvasResize, false);
  window.requestAnimationFrame(update);
  // context.beginPath();
  onCanvasResize();
}

function update() {
  requested = false;
  context.fillStyle = COLOR_BACKGROUND;
  context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  // mouse velocity = hypothenuse of x and y velocity
  var mV = Math.sqrt(Math.pow(mouse.vx, 2) + Math.pow(mouse.vy, 2));
  var normalizedV = mV < 1 ? mV : Math.sqrt(mV); // 1 => 1, 100 => 10
  var cappedV = Math.min(normalizedV, 10); // max speed
  var ticks = Math.max(1, Math.ceil(cappedV)); // Must be an integer and at least 1
  // ticks is the number of times we'll "update" each particle,
  // for that superhot "the faster you move the faster time ticks" effect

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    for (var j = 0; j < ticks; j++) {
      particle.tick();
    }
    particle.commit();

    context.strokeStyle = particle.color;
    context.beginPath();
    context.lineWidth = particle.size * 2;
    context.lineCap = "round";
    for (var j = 0; j < particle.past.length; j++) {
      context.lineTo(particle.past[j].x, particle.past[j].y);
    }
    context.stroke();

    // context.fillStyle = particle.color;
    // context.beginPath();
    // context.arc(
    //   particle.x,
    //   particle.y,
    //   particle.size + Math.sqrt(ticks),
    //   0,
    //   Math.PI * 2,
    //   true
    // );
    // context.closePath();
    // context.fill();
  }

  context.strokeStyle = mouse.color;
  context.beginPath();
  for (var j = 0; j < mouse.past.length; j++) {
    context.lineTo(mouse.past[j].x, mouse.past[j].y);
  }

  context.stroke();
}

init();

// function Draw(x, y) {
//   context.strokeStyle = "#ff0000";
//   context.lineWidth = 4;
//   context.lineTo(x, y);
//   context.stroke();
// }
