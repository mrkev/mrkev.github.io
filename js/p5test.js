function sketch(s) {
  var noiseScale = 0.02;
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0, 0, 0);
    for (var x = 0; x < s.width; x++) {
      var noiseVal = s.noise(
        (s.mouseX + x) * noiseScale,
        s.mouseY * noiseScale
      );
      s.stroke(noiseVal * 255);
      s.line(x, s.mouseY + noiseVal * 80, x, s.height);
    }
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };
}

const myp5 = new p5(sketch, "exp");

var noiseScale = 0.02;
