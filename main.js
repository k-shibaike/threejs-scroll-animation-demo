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

// Make object
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, -15);
scene.add(box);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizeObj.width, sizeObj.height);
renderer.setPixelRatio(window.devicePixelRatio);

// Animation
const tick = () => {
  window.requestAnimationFrame(tick);
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
