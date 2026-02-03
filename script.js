import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//position de la camera
camera.position.set(0, 140, 250);

// Ajout des contrôles OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();

//ajout des etoiles
// ajout de la texture des etoiles , soleil
const circleTexture = new THREE.TextureLoader().load('img/circle-removebg-preview.png');
const texture = new THREE.TextureLoader();
const sunTexture = texture.load('img/sun.png');

// ajout de lumiere ambiente
const light = new THREE.AmbientLight('rgb(255, 255, 255)', 0.5); // Réduction de l'intensité
scene.add(light);



// Lumière directionnelle
const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Intensité augmentée
directionalLight.position.set(0, 150, 50); // Position pour éclairer depuis un angle
directionalLight.castShadow = true;

// Réglages des ombres pour la lumière directionnelle
directionalLight.shadow.mapSize.width = 4096; // Résolution des ombres
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;

// Ajuster le volume d'ombre pour capturer plus de détails
directionalLight.shadow.camera.left = -200;
directionalLight.shadow.camera.right = 200;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -200;

scene.add(directionalLight);


//boucle pour avoir des particules aléatoirement
const distance = 1000;
const nbParticule = 30000;

const point = new Float32Array(nbParticule * 3)
for (let i = 0; i < nbParticule; i++) {
    point[i * 3] = THREE.MathUtils.randFloatSpread(distance * 2)
    point[i * 3 + 1] = THREE.MathUtils.randFloatSpread(distance * 2)
    point[i * 3 + 2] = THREE.MathUtils.randFloatSpread(distance * 2)
}

//  création de la particule
const particuleGeometry = new THREE.BufferGeometry();
particuleGeometry.setAttribute('position', new THREE.BufferAttribute(point, 3));

const particuleMaterial = new THREE.PointsMaterial();
particuleMaterial.size = 0.6,
    particuleMaterial.sizeAttenuation = true,
    particuleMaterial.map = circleTexture,
    particuleMaterial.transparent = true,
    particuleMaterial.alphaTest = 0.01,
    particuleMaterial.blending = THREE.AdditiveBlending;

const particle = new THREE.Points(particuleGeometry, particuleMaterial)
scene.add(particle);

// creation du soleil
const geometry = new THREE.SphereGeometry(35, 64, 64);
const material = new THREE.MeshBasicMaterial();
material.map = sunTexture;
const sun = new THREE.Mesh(geometry, material);

scene.add(sun);

// Planètes
// array contenant les propri des planetes
const planetes = [
    { name: "Mercure", size: 4, position: { x: 40, y: 0, z: 5 }, texture: 'img/mercure.jpg', rotateSpeed: 0.021 }, // Mercure
    { name: "Venus", size: 6, position: { x: 55, y: 5, z: 5 }, texture: 'img/venus.jpg', rotateSpeed: 0.015 }, // Venus
    { name: "Terre", size: 11, position: { x: 80, y: 0, z: 10 }, texture: 'img/earth.png', rotateSpeed: 0.012 }, // Terre
    { name: "Mars", size: 9, position: { x: 110, y: -5, z: 5 }, texture: 'img/mars.jpg', rotateSpeed: 0.01 }, // Mars
    { name: "Jupiter", size: 20, position: { x: 150, y: 10, z: 20 }, texture: 'img/jupiter.jpg', rotateSpeed: 0.009 }, // Jupiter
    { name: "Saturne", size: 17.5, position: { x: 210, y: 15, z: 25 }, texture: 'img/saturn.jpg', rotateSpeed: 0.007 }, // Saturne
    { name: "Uranus", size: 15, position: { x: 270, y: 20, z: 30 }, texture: 'img/uranus.jpg', rotateSpeed: 0.006 }, // Uranus
    { name: "Neptune", size: 15, position: { x: 330, y: 0, z: 35 }, texture: 'img/neptune.jpg', rotateSpeed: 0.005 } //Neptune
];


// Fonction pour créer les planètes parce que j'ai trop le flm
const createPlanet = (size, texture) => {
    const texturePlanet = new THREE.TextureLoader().load(texture);
    const geometry = new THREE.SphereGeometry(size, 64, 64);
    const material2 = new THREE.MeshStandardMaterial();
    material2.map = texturePlanet;

    const planete = new THREE.Mesh(geometry, material2);
    planete.receiveShadow = true;
    planete.castShadow = true;


    scene.add(planete);

    return planete;
};


// Construction des planètes
const planeteRotation = planetes.map(item => ({
    mesh: createPlanet(item.size, item.texture),
    angle: 0,
    position: item.position,
    rotateSpeed: item.rotateSpeed,
    distance: Math.sqrt(item.position.x * item.position.x + item.position.z * item.position.z), // Distance initiale par rapport au soleil
}));

const saturn = planetes.find(planet => planet.texture === 'img/saturn.jpg');
const intervalle = Math.sqrt(saturn.position.x * saturn.position.x + saturn.position.z * saturn.position.z)
let saturnAngle = 0;

// anneaux de saturne
const ringSaturnTexture = new THREE.TextureLoader().load('img/ringSaturn.jpg');

const ringSaturnGeometry = new THREE.RingGeometry(30, 20, 64);
const ringSaturnMaterial = new THREE.MeshBasicMaterial({
    map: ringSaturnTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1
});

const ringSaturn = new THREE.Mesh(ringSaturnGeometry, ringSaturnMaterial);
ringSaturn.rotation.x = 78 * Math.PI / 180;

scene.add(ringSaturn);

// anneaux 
const ringData = [
    { size: 40, radius: 41, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(255, 255, 255)" },
    { size: 54, radius: 55, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(250, 255, 255)" },
    { size: 79, radius: 80, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(250, 255, 255)" },
    { size: 109, radius: 110, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(250, 255, 255)" },
    { size: 149, radius: 150, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(250, 255, 255)" },
    { size: 209, radius: 210, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(250, 255, 255)" },
    { size: 269, radius: 270, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(250, 255, 255)" },
    { size: 329, radius: 330, rotation: { x: 89.5 * Math.PI / 180 }, color: "rgb(250, 255, 255)" }
];

const rings = [];

const createRing = (size, radius, rotation, color) => {
    const ringGeometry = new THREE.RingGeometry(size, radius, 512);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
    });
    ringMaterial.transparent = true;
    ringMaterial.opacity = 0.2

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = rotation.x,
        scene.add(ring);
    return ring;
};

ringData.forEach(ring => {
    rings.push(createRing(ring.size, ring.radius, ring.rotation, ring.color));
});


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
    // calculate pointer position in normalized device coordinates (-1 to +1) for both components
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function render() {
    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([sun]);

    if (intersects.length > 0) {

        let card = document.getElementById('card');
        card.style.display = "block";


    }


    renderer.render(scene, camera);
}


// Fonction pour faire tourner la caméra autour de la planète

document.getElementById('close').addEventListener('click', () => {

    let card = document.getElementById('card');
    card.style.display = "none";
})

window.addEventListener('pointermove', onPointerMove, false);
window.addEventListener('click', render, false);

// Animation de la scène
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Animation du soleil (rotation)
    sun.rotation.y += 0.003;

    // Rotation des planètes
    planeteRotation.forEach((planet) => {
        planet.angle += planet.rotateSpeed;
        planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
        planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
        planet.mesh.rotation.y += 0.005;
    });

    // Rotation de Saturne
    ringSaturn.rotation.z += 0.014;
    particle.rotation.y += 0.002;
    saturnAngle += 0.007;
    ringSaturn.position.x = Math.cos(saturnAngle) * intervalle;
    ringSaturn.position.z = Math.sin(saturnAngle) * intervalle;

    renderer.render(scene, camera);
}

animate();
