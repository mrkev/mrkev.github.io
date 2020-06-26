/** 3D Icosahedron */

/** Scene, renderer, camera */

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas-1"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);
camera.rotation.x = (-10 * Math.PI) / 180;
camera.lookAt(0, 0, 0);

var lights = [];
lights[0] = new THREE.PointLight(0x00ffff, 1, 0);
lights[1] = new THREE.PointLight(0xff00ff, 1, 0);
lights[2] = new THREE.PointLight(0xffff00, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
document.getElementById("exp").appendChild(renderer.domElement);

/** Geometry */

var randNum = function (min = 0, max = 1) {
  return min + Math.random() * (max - min);
};

var radius = randNum(1, 75) >> 0;
var geometry = new THREE.IcosahedronGeometry(radius, 1);
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var material = new THREE.MeshPhongMaterial({
  color: 0x156289,
  emissive: 0x072534,
  side: THREE.DoubleSide,
  flatShading: true,
});

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var animate = function () {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005 / Math.max(1, radius / 10);
  mesh.rotation.y += 0.005 / Math.max(1, radius / 10);
  renderer.render(scene, camera);
};

animate();
