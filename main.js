import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

console.log(THREE);

// Scene¨
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.autoRotate = false;




const loader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry();

const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('img/cube1.png') }), 
    new THREE.MeshBasicMaterial({ map: loader.load('img/cube2.png') }),
    new THREE.MeshBasicMaterial({ map: loader.load('img/cube3.png') }), 
    new THREE.MeshBasicMaterial({ map: loader.load('img/cube4.png') }), 
    new THREE.MeshBasicMaterial({ map: loader.load('img/cube5.png') }),
    new THREE.MeshBasicMaterial({ map: loader.load('img/cube6.png') }), 
  ];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();