
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CharacterCard({ character, onClick }) {
  const mountRef = useRef();

  useEffect(() => {
    const width = 120, height = 160;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Neon-ish rim light
    const light1 = new THREE.PointLight(0x8a2be2, 0.8, 20); light1.position.set(3, 3, 6); scene.add(light1);
    const light2 = new THREE.PointLight(0x00e5ff, 0.7, 20); light2.position.set(-3, -2, 5); scene.add(light2);

    // Create a plane for the portrait texture
    const planeGeo = new THREE.PlaneGeometry(1.2, 1.6, 1, 1); // portrait aspect
    let planeMat;

    if (character.portrait) {
      const loader = new THREE.TextureLoader();
      const tex = loader.load(character.portrait);
      tex.colorSpace = THREE.SRGBColorSpace;
      planeMat = new THREE.MeshStandardMaterial({
        map: tex,
        metalness: 0.2,
        roughness: 0.6,
        transparent: true
      });
    } else {
      const gradient = new THREE.CanvasTexture(makeGradient());
      gradient.colorSpace = THREE.SRGBColorSpace;
      planeMat = new THREE.MeshStandardMaterial({
        map: gradient,
        metalness: 0.2,
        roughness: 0.5
      });
    }

    const plane = new THREE.Mesh(planeGeo, planeMat);
    scene.add(plane);

    camera.position.z = 3;

    // Hover interactivity
    let hover = false;
    const enter = () => { hover = true; };
    const leave = () => { hover = false; };
    mountRef.current.addEventListener("mouseenter", enter);
    mountRef.current.addEventListener("mouseleave", leave);

    // Animate subtle sway & glow
    const animate = () => {
      requestAnimationFrame(animate);
      plane.rotation.y = THREE.MathUtils.lerp(plane.rotation.y, hover ? 0.15 : 0.0, 0.08);
      plane.rotation.x = THREE.MathUtils.lerp(plane.rotation.x, hover ? -0.06 : 0.0, 0.08);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeEventListener("mouseenter", enter);
      mountRef.current.removeEventListener("mouseleave", leave);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      planeGeo.dispose();
      if (planeMat.map) planeMat.map.dispose();
      planeMat.dispose();
    };
  }, [character.portrait]);

  return (
    <div className="character-card" onClick={onClick} title={`${character.name}`}>
      <div className="card-canvas" ref={mountRef}></div>
      <p>{character.name}</p>
      <p className="level">Lvl {character.level} • XP {character.xp}</p>
    </div>
  );
}

/* Helper: make a neon gradient if no portrait yet */
function makeGradient(){
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createLinearGradient(0,0,256,256);
  grd.addColorStop(0, '#8a2be2');
  grd.addColorStop(.5, '#00e5ff');
  grd.addColorStop(1, '#ff4dff');
  g.fillStyle = grd; g.fillRect(0,0,256,256);
  return c;
}