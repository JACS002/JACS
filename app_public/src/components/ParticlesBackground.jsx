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
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.4, random: true },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.6, direction: "none", outModes: "out" }
        },
        detectRetina: true
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
