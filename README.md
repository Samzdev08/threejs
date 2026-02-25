# 🌌 3D Solar System – Three.js

An interactive **3D Solar System simulation** built with **Three.js** and WebGL.  
This project renders the Sun, the 8 planets, orbital rings, a star field with 30,000 particles, and Saturn’s rings, all with interactive camera controls.

---

## 🚀 Overview

This project allows you to:

- 🌞 Visualize a textured 3D Sun
- 🪐 Observe the 8 planets orbiting in real time
- 💫 Experience a dynamic star field (30,000 particles)
- 💍 View Saturn’s textured ring system
- 🎥 Control the camera using OrbitControls
- 🖱️ Click on the Sun to display an information card

---

## 🛠️ Technologies Used

- **JavaScript (ES6 Modules)**
- **Three.js**
- **WebGL**
- **HTML5**
- **CSS3**

CDN import via importmap:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }
}
</script>
