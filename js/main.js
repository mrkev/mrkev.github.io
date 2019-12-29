// creates DOM element of type
function e(type, attrs) {
  var elem = document.createElement(type);
  Object.keys(attrs).forEach(function(key) {
    elem.setAttribute(key, attrs[key]);
  });
  return elem;
}

// usual is a numbered script + maybe a canvas
function sketch(i, withCanvas) {
  return function() {
    if (withCanvas) {
      document.body.prepend(
        e("canvas", {
          id: "canvas-1"
        })
      );
    }
    document.body.appendChild(
      e("script", {
        src: `/js/sketch${i}.js`
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
      id: "canvas-1"
    })
  );
  // Append paperscript"/js/sketch0.js",
  document.body.appendChild(
    e("script", {
      src: "/js/sketch0.js",
      type: "text/paperscript",
      canvas: "canvas-1"
    })
  );
}

var sketch1 = sketch(1, true);
var sketch2 = sketch(2);
var sketch3 = sketch(3, true);
var sketch4 = sketch(4, true);

var sketches = [sketch0, sketch1, sketch2, sketch3, sketch4];
var rand = Math.floor(Math.random() * sketches.length);

var testing = null;
if (testing !== null) {
  sketches[testing]();
} else {
  sketches[rand]();
}
