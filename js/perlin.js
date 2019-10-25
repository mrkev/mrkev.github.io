function sketch(s) {
  const noiseScale = 0.01;
  function noise(x, y) {
    return s.noise(x * noiseScale, y * noiseScale);
  }

  class Point {
    constructor(x, y, color, weight = 10, decay = 0.03) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.weight = weight;
      this.decay = 0.03;
      this.lean = (2 * Math.PI * Math.random()) / 36;
    }

    draw() {
      if (this.weight < 0.01) {
        return;
      }
      const { x, y, color, weight, decay, lean } = this;
      const direction = noise(x, y) * 2 * Math.PI;
      s.stroke(color);
      s.strokeWeight(weight);
      s.point(x, y);
      this.x = x + Math.cos(direction) * 2;
      this.y = y + Math.sin(direction) * 2;
      this.weight = weight - decay;
    }
  }

  function init() {
    s.background(0, 0, 0);

    const cx = s.windowWidth / 2;
    const cy = s.windowHeight / 2;

    // 10 circles
    for (var c = 0; c < 12; c++) {
      const dist = 100 + c * 30;
      // draw a circle
      for (let i = 0; i < 360; i += 2) {
        const distance = dist + Math.random() * 30;
        const radians = (i * Math.PI) / 180;

        const x = cx + Math.cos(radians) * distance;
        const y = cy + Math.sin(radians) * distance;
        points.push(new Point(x, y, 255 * noise(x, y), 6, 0.004));
      }
    }
  }

  const points = [];
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    init();
  };

  s.draw = () => {
    for (let i = 0; i < points.length; i++) {
      points[i].draw(s);
    }
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    init();
  };
}

const myp5 = new p5(sketch, "exp");

var noiseScale = 0.02;
