const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg") });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const group = new THREE.Group();
scene.add(group);

for (let i = 0; i < 100; i++) {
  const geometry = new THREE.SphereGeometry(0.2, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 60%)`),
    roughness: 0.4,
    metalness: 0.6
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 30
  );
  group.add(sphere);
}

function animate() {
  requestAnimationFrame(animate);
  group.rotation.x += 0.0015;
  group.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

const nameEl = document.getElementById('name');
nameEl.addEventListener('mousemove', () => {
  nameEl.style.transform = `rotate(${(Math.random() * 6 - 3)}deg) scale(1.1)`;
});
nameEl.addEventListener('mouseleave', () => {
  nameEl.style.transform = 'rotate(0deg) scale(1)';
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
