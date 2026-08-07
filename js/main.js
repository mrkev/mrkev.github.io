var paperjs =
  "https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.11.4/paper-full.min.js";

// Only one sketch runs per page load, so libraries are fetched on demand
// instead of up front. three.js alone is ~580kb, and only 2 of 10 sketches
// want it. Keys here are what sketch() takes as `deps`.
var libs = {
  // Perlin noise. window.noise
  // From: https://github.com/josephg/noisejs
  noise: [{ src: "/js/lib/perlin.js" }],
  // For halftone effect. window.tsunami
  // From: https://github.com/patrickmatte/color-halftone-filter
  tsunami: [
    { src: "/js/lib/tsunami/utils/Debug.js" },
    { src: "/js/lib/tsunami/geom/Rectangle.js" },
    { src: "/js/lib/tsunami/geom/Point.js" },
    { src: "/js/lib/tsunami/geom/Ratio.js" },
    { src: "/js/lib/tsunami/filters/Blendmode.js" },
    { src: "/js/lib/tsunami/filters/ColorHalftoneFilter.js" },
  ],
  three: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js",
      integrity:
        "sha384-kijqCS4kUzfB12b3J3cYt5dJ/GKalDYzQRJxhniQVv427sju0NgQF2EhTMmnVcbm",
    },
  ],
  pts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/pts/0.10.5/pts.min.js",
      integrity:
        "sha512-uHA0Fm27FsjOUz5aS/5StEnRvBIYotMEDNYZU40T05NT3KCdkI3D7H4FGEvDjArhv+w+/ouzKtXMFWjAb5BcFQ==",
    },
  ],
};

// creates DOM element of type
function e(type, attrs) {
  var elem = document.createElement(type);
  Object.keys(attrs).forEach(function (key) {
    elem.setAttribute(key, attrs[key]);
  });
  return elem;
}

// loads scripts one at a time, since some of them depend on each other
function loadLibs(deps, done) {
  var queue = [];
  deps.forEach(function (name) {
    queue = queue.concat(libs[name]);
  });

  (function next() {
    var lib = queue.shift();
    if (!lib) {
      return done();
    }

    var attrs = { src: lib.src };
    if (lib.integrity) {
      attrs.integrity = lib.integrity;
      attrs.crossorigin = "anonymous";
    }

    var script = e("script", attrs);
    script.onload = next;
    script.onerror = function () {
      console.error(`couldn't load ${lib.src}`);
    };
    document.head.appendChild(script);
  })();
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

    // Add the sketch script, once whatever it needs is in place
    loadLibs(deps || [], function () {
      document.body.appendChild(
        e("script", {
          src: `/js/sketch${i}.js`,
        })
      );
    });
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

var sketches = [
  sketch0,
  sketch(1, true, ["noise"]),
  sketch(2, true, ["noise"]),
  sketch(3, true),
  sketch(4, true, ["tsunami"]),
  sketch(5, true, ["three"]),
  sketch(6, true, ["three"]),
  sketch(7, true),
  sketch(8, true, ["pts"]),
  sketch(9, true, ["pts"]),
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
