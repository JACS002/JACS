// src/components/ParticlesBackground.jsx
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadBasic } from "tsparticles-basic";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine); // Carga solo lo necesario
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.3,
            random: true,
            anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
          },
          size: {
            value: { min: 1, max: 2 },
            anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
          },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            outModes: "out",
            straight: false
          },
          links: {
            enable: true,
            distance: 120,
            color: "#ffffff",
            opacity: 0.05,
            width: 1
          }
        },
        detectRetina: true
      }}
      
      className="fixed inset-0 -z-1 pointer-events-none"
    />
  );
}
