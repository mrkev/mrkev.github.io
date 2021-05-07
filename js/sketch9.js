// Based on work by William Ngan.
Pts.quickStart("#canvas-1", "#666");

let waves = [];
let gradients = [];
const nums = 20;

let ll1 = [];
let ll2 = [];
let w = [];

let showGuides = false;

// Follows the mouse
let trailer = new Pt(0, 0);

function getColors() {
  let cs = [
    [0, 255, 50],
    [255, 255, 50],
    [255, 0, 50],
    [255, 50, 255],
    [50, 0, 255],
    [50, 255, 255],
  ];
  let a = [...cs[Math.floor(Math.random() * cs.length)], 0.7];
  let b = [...cs[Math.floor(Math.random() * cs.length)], 0.7];
  let c = b.slice();
  c[3] = 0;
  let stops = [0.1, 0.4, 1];
  return [a, b, c].map((p, i) => [
    stops[i],
    `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${p[3]})`,
  ]);
}

function getGradients() {
  gradients = [];
  for (let i = 0; i < nums; i++) {
    gradients.push(form.gradient(getColors()));
  }
}

space.add({
  start: (bound) => {
    trailer = new Pt(space.center.x, space.center.y);
    // Create two lines and convert to `Noise` points
    let ln1 = Create.distributeLinear(
      [new Pt(0, space.size.y * 0.3), new Pt(space.width, space.size.y * 0.3)],
      nums
    );
    let ln2 = Create.distributeLinear(
      [new Pt(0, space.size.y * 0.6), new Pt(space.width, space.size.y * 0.6)],
      nums
    );
    waves = [Create.noisePts(ln1, 0.1, 0.1), Create.noisePts(ln2, 0.1, 0.1)];

    getGradients();

    ll1 = Create.distributeLinear(
      [new Pt(0, space.size.y * 0.3), new Pt(space.width, space.size.y * 0.3)],
      nums
    );
    ll2 = Create.distributeLinear(
      [new Pt(0, space.size.y * 0.6), new Pt(space.width, space.size.y * 0.6)],
      nums
    );

    w = Create.noisePts(ln1, 1, 1);
    // console.log(ln2, w);
  },

  animate: (time, ftime) => {
    const distToCenter = space.pointer
      .$subtract(space.center)
      .divide(space.center);
    // .magnitude() / 1.41421356237; //srt2

    const trailerToCursor = space.pointer.$subtract(trailer).divide(32);
    trailer.add(trailerToCursor);

    // Use pointer position to change background and speed
    let speed = space.pointer.$subtract(space.center).divide(space.center);
    // .abs();
    let gr = speed.x * 100; // background gray
    // form.fill(`rgb(${gr + 80},${gr + 80},${gr + 80})`).rect(space.innerBound);
    // Generate wave movements from Noise
    let nps = waves.map((nl, i) => {
      return nl.map((p, j) => {
        // if (i === 1 && j === 4) {
        //   // p.step(0.001 * (1 - speed.x), 0.005 * speed.y);
        //   console.log(p.noise2D());
        // }

        return p.$add(
          trailer.$subtract(space.center).$multiply(p.noise2D()).x,
          (p.noise2D() *
            space.size.y *
            Math.sin((time * p.noise2D()) / 3000) *
            Math.cos((time * p.noise2D() * -4) / 3000)) /
            2
          // Num.cycle(p.step(0.001 * (1 - speed.x), 0.005 * speed.y).noise2D()) *
          //   (space.size.y / 2)
          // 10,
          // (space.pointer.x - space.center.x) / 4,
          // p.step(0.001 * (1 - speed.x), 0.005 * speed.y).noise2D() *
          //   (space.size.y / 2)
        );
      });
    });

    if (showGuides) {
      form
        .strokeOnly("#F00", 2)
        .line([
          new Pt(0, space.size.y * 0.3),
          new Pt(space.width, space.size.y * 0.3),
        ]);

      form
        .strokeOnly("#F00", 2)
        .line([
          new Pt(0, space.size.y * 0.6),
          new Pt(space.width, space.size.y * 0.6),
        ]);

      form.fillOnly("#123").points(ll1, 2, "circle");
      form.fillOnly("#123").points(ll2, 2, "circle");
      form.fillOnly("#00F").points(waves[0], 2, "circle");
      form.fillOnly("#0F0").points(nps[0], 2, "circle");
      form.fillOnly("#F0F").points(nps[1], 2, "circle");
      form.fillOnly("#000").points([trailer], 5, "circle");
    }

    // console.log(space.size);

    if (!showGuides) {
      // Set canvas composite operation
      form.composite("overlay");

      for (let k = 0, klen = nps.length; k < klen; k++) {
        for (let i = 0; i < nums; i++) {
          let c1 = Circle.fromCenter(
            nps[k][i],
            space.size.minValue().value * 0.2
          );
          let c2 = Circle.fromCenter(
            nps[k][i],
            space.size.minValue().value * 0.7
          );
          let grad = gradients[k === 0 ? i : nums - i - 1];
          form.fillOnly(grad(c1, c2)).circle(c2);
        }
      }
    }
  },

  action: (type, x, y) => {
    if (type === "down") {
      getGradients();

      // showGuides = true;
    }
    if (type === "up") {
      // showGuides = false;
      // getGradients();
    }
  },
});

space.bindMouse().bindTouch().play();
