import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

// Initialisation de la scène, caméra et renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // Initialement centré sur le soleil

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Soleil et planètes
const objects = [];

// Soleil
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planète
const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.set(5, 0, 0);
scene.add(planet);
objects.push(planet); // Ajouter aux objets cliquables

// Initialisation de la caméra
camera.position.set(10, 10, 10);
controls.update();

// Gestion des clics
window.addEventListener('click', (event) => {
    // Calcul des coordonnées du clic
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Lancer un rayon depuis la caméra
    raycaster.setFromCamera(mouse, camera);

    // Vérifier les intersections
    const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        const targetObject = intersects[0].object;

        // Animation vers la nouvelle cible
        const targetPosition = targetObject.position.clone();
        gsap.to(controls.target, {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: 1,
            onUpdate: () => controls.update(),
        });
    }
});

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
