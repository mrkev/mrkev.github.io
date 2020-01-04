/** Endless scrolling 3d plane */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

camera.position.set(0, 2, 5);
camera.rotation.x = (-10 * Math.PI) / 180;
/* camera.lookAt(scene.position) */
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("exp").appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.LineBasicMaterial({ color: "red" });

camera.position.z = 5;

/* From https://www.youtube.com/watch?v=c-O-tOYdAFY */
/* Note: this is drawing the lines, not the squares. */
/* Horizontal and verticall, all the way throuhg hte plane */
var plane = new THREE.Geometry();
var size = 40,
  step = 1;
for (var i = -size; i <= size; i += step) {
  const y = -0.04;
  plane.vertices.push(new THREE.Vector3(-size, y, i));
  plane.vertices.push(new THREE.Vector3(size, y, i));
  plane.vertices.push(new THREE.Vector3(i, y, -size));
  plane.vertices.push(new THREE.Vector3(i, y, size));
}

var line = new THREE.LineSegments(plane, material);
scene.add(line);

var animate = function() {
  requestAnimationFrame(animate);

  camera.position.z -= 0.02;
  // Seamless, endless loop
  if (camera.position.z <= 4) {
    camera.position.z = 5;
    console.log(camera.position.z);
  }

  renderer.render(scene, camera);
};

animate();
