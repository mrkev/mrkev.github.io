// Pts.namespace(window);

// var space = new CanvasSpace("#canvas-1");
let run = Pts.quickStart("#canvas-1", "#e2e6ef");

var chain = new Group();
var stretch = false;
var form = space.getForm();

run((time, ftime) => {
  // rectangle

  const center = space.center.$subtract(space.center.$divide(7));

  var rect = Rectangle.fromCenter(center, space.size.$divide(2));
  var poly = Rectangle.corners(rect);
  var poly2 = Rectangle.corners(rect);
  // poly.shear2D(Num.cycle((time % 20000) / 20000) - 0.5, center);

  const xF = (space.pointer.x - center.x) / space.size.x;
  const yF = (space.pointer.y - center.y) / space.size.y;
  const distToCenter =
    space.pointer.$subtract(center).divide(center).magnitude() / 1.41421356237; //srt2

  poly.shear2D(distToCenter * xF * yF * 2, center);
  poly.scale(distToCenter / 2 + 0.5, center);
  // drawing
  form.fillOnly("#123").polygon(poly);
  form.strokeOnly("#fff", 3).rect(rect);

  // poly2.scale(0.34, space.center);
  // poly2.shear2D(distToCenter * xF * yF * -1.41, space.center);
  // form.fillOnly("#F01").polygon(poly2);
});

//// ----

//// ----

space.bindMouse().bindTouch().play();
