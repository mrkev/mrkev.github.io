// creates DOM element of type
function e(type, attrs) {
  var elem = document.createElement(type);
  Object.keys(attrs).forEach(function(key) {
    elem.setAttribute(key, attrs[key]);
  });
  return elem;
}

// loads a script
function script(src, attrs) {
  return e("script", { ...attrs, src });
}

//////////////////

/** Squares that show a pic */
function sketch0() {
  // Append canvas for paper
  document.getElementById("exp").appendChild(
    e("canvas", {
      resize: "true",
      hidpi: "off",
      id: "canvas-1"
    })
  );
  // Append paperscript
  document.body.appendChild(
    script("/js/raster.js", {
      type: "text/paperscript",
      canvas: "canvas-1"
    })
  );
}

/** Waves with x-axis perlin noise */
function sketch1() {
  document.body.appendChild(script("/js/p5test.js"));
}

/** Donut with cool flow effect */
function sketch2() {
  document.body.appendChild(script("/js/perlin.js"));
}

/** Donut with cool flow effect */
function sketch3() {
  document.body.prepend(
    e("canvas", {
      // resize: "true",
      // hidpi: "off",
      id: "canvas-1"
    })
  );
  document.body.appendChild(script("/js/particles.js"));
}

var sketches = [sketch0, sketch1, sketch2, sketch3];
var rand = Math.floor(Math.random() * sketches.length);

var testing = null;
if (testing !== null) {
  sketches[testing]();
} else {
  sketches[rand]();
}
