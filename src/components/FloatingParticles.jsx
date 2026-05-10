import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function getParticleCount() {
  const w = window.innerWidth;
  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;

  if (mem && mem < 4) return 8;
  if (cores && cores < 4) return 8;
  if (w < 640) return 14;
  if (w < 1024) return 20;
  return 28;
}

export default function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL support check
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return; // Graceful degradation — CSS fallback handles it
    }

    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    const COUNT = getParticleCount();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Gold particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const velocities = [];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() * 0.003 + 0.001) * (isMobile ? 0.5 : 1),
        z: 0,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd4aa50,
      size: isMobile ? 0.025 : 0.04,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animId;
    let scrollY = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;

        // Wrap
        if (pos[i * 3 + 1] > 4)  pos[i * 3 + 1] = -4;
        if (pos[i * 3]     > 6)  pos[i * 3]     = -6;
        if (pos[i * 3]     < -6) pos[i * 3]     =  6;
      }
      geometry.attributes.position.needsUpdate = true;

      // Subtle parallax shift on scroll
      particles.position.y = scrollY * 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
