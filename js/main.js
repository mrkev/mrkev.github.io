var paperjs =
  "https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.11.4/paper-full.min.js";

// creates DOM element of type
function e(type, attrs) {
  var elem = document.createElement(type);
  Object.keys(attrs).forEach(function (key) {
    elem.setAttribute(key, attrs[key]);
  });
  return elem;
}

// usual is a numbered script + maybe a canvas
function sketch(i, withCanvas, deps) {
  return function () {
    // Maybe add a canvas
    if (withCanvas) {
      document.body.prepend(
        e("canvas", {
          id: "canvas-1",
        })
      );
    }

    // Add the sketch script
    document.body.appendChild(
      e("script", {
        src: `/js/sketch${i}.js`,
      })
    );
  };
}

//////////////////

function sketch0() {
  // Append canvas for paper
  document.getElementById("exp").appendChild(
    e("canvas", {
      resize: "true",
      hidpi: "off",
      id: "canvas-1",
    })
  );

  // append paper.js
  document.body.appendChild(
    e("script", {
      src: paperjs,
    })
  );

  // Append paperscript"/js/sketch0.js",
  document.body.appendChild(
    e("script", {
      src: "/js/sketch0.js",
      type: "text/paperscript",
      canvas: "canvas-1",
    })
  );
}

var sketch1 = sketch(1, true);
var sketch2 = sketch(2, true);
var sketch3 = sketch(3, true);
var sketch4 = sketch(4, true);
var sketch5 = sketch(5, true);
var sketch6 = sketch(6, true);
var sketch7 = sketch(7, true);

var sketches = [
  sketch0,
  sketch1,
  sketch2,
  sketch3,
  sketch4,
  sketch5,
  sketch6,
  sketch7,
];
var rand = Math.floor(Math.random() * sketches.length);

var testing =
  /^localhost/.test(window.location.host) &&
  parseInt(window.location.hash.substr(1));

if (testing !== false && !Number.isNaN(testing)) {
  sketches[testing]();
} else {
  sketches[rand]();
}
