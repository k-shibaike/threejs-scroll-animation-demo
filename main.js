import './style.css'
import * as THREE from "three";

// Get canvas of ID
const canvas = document.querySelector("#webgl");

// scene
const scene = new THREE.Scene();

// Background Texture
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('gb/astronomy.jpg');
scene.background = bgTexture;

// Size
const sizeObj = {
  width: innerWidth,
  height: innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizeObj.width / sizeObj.height,
  0.1,
  1000
);

// box object add
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, -15);
box.rotation.set(1, 1, 0);
scene.add(box);

// donut object add
const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 1, 10);
scene.add(torus);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizeObj.width, sizeObj.height);
renderer.setPixelRatio(window.devicePixelRatio);

// Smoothly animate using linear interpolation
function linear(x, y, a) {
  return (1 - a) * x + a * y;
}

function scaleRate(start, end) {
  return (scrollRate - start) / (end - start);
}
// Scroll Animation
const animationScripts = [];

animationScripts.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.position.z = linear(-15, 2, scaleRate(0, 40));
    torus.position.z = linear(10, -20, scaleRate(0, 40));
  }
});

// Get scroll rate
let scrollRate = 0;
document.body.onscroll = () => {
  scrollRate = (document.documentElement.scrollTop / 
    (document.documentElement.scrollHeight - 
    document.documentElement.clientHeight)) * 100;
    console.log(`scrollRate is ${scrollRate }%`);
}

// Start animation use animationScripts
function playScrollAnimation() {
  animationScripts.forEach((animation) => {
    if (scrollRate >= animation.start && scrollRate < animation.end) {
      animation.function();
    } 
  });
}

// Animation
const tick = () => {
  window.requestAnimationFrame(tick);
  playScrollAnimation();
  renderer.render(scene, camera);
}

tick();

// Browser Resize
window.addEventListener('resize', () => {
  sizeObj.width = innerWidth;
  sizeObj.height = innerHeight;

  camera.aspect = sizeObj.width / sizeObj.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizeObj.width / sizeObj.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});
