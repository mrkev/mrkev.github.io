function e(type, attrs) {
  var elem = document.createElement(type);
  Object.keys(attrs).forEach(function(key) {
    elem.setAttribute(key, attrs[key]);
  });
  return elem;
}

function script(src, attrs) {
  return e("script", { ...attrs, src });
}

//////////////////

function sketch1() {
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

function sketch2() {
  document.body.appendChild(script("/js/p5test.js"));
}

function sketch3() {
  document.body.appendChild(script("/js/perlin.js"));
}

var sketches = [sketch1, sketch2, sketch3];
var rand = Math.floor(Math.random() * sketches.length);
sketches[rand]();
