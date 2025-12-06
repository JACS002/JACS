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
        detectRetina: true,
        particles: {
          number: {
            value: 120, // un poco más que antes
            density: { enable: true, area: 900 },
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: true,
              speed: 0.15,   // MUCHO más lento
              opacity_min: 0.15,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 2 },
            anim: {
              enable: false, // ya NO cambian de tamaño
            },
          },
          move: {
            enable: true,
            speed: 0.08,     // más lento, casi estático
            direction: "none",
            outModes: "out",
            straight: false,
          },
          links: {
            enable: false,   // sin líneas, solo estrellas
          },
        },
      }}
      className="fixed inset-0 -z-1 pointer-events-none"
    />
  );
}
