var canvas = document.getElementById("canvas-1");
var loadedImage = new Image();
var halftoneFilter = new tsunami.filters.ColorHalftoneFilter();
var pixelsPerPoint = 2 + Math.random() * 198;

function drawFiltered() {
  var sizeToFit = tsunami.geom.Ratio.scaleToFit(
    { width: canvas.width, height: canvas.height },
    { width: loadedImage.width, height: loadedImage.height }
  );

  var context = canvas.getContext("2d");

  context.drawImage(
    loadedImage,
    (loadedImage.width - sizeToFit.width) / 2,
    (loadedImage.height - sizeToFit.height) / 2,
    sizeToFit.width,
    sizeToFit.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
  var context = canvas.getContext("2d");
  var context = canvas.getContext("2d");
  halftoneFilter.pixelsPerPoint = pixelsPerPoint;
  halftoneFilter.applyFilter(context);
}

function onCanvasResize(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawFiltered();
}

function init() {
  window.addEventListener("resize", onCanvasResize, false);
  loadedImage.onload = function(e) {
    drawFiltered();
  };
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  loadedImage.src = "/img/photo2.jpg";
}

init();
