import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LogoSVG from "../components/LogoSVG";
import ParticlesBackground from "../components/ParticlesBackground";

export default function LogoIntro({ onComplete }) {
  const containerRef = useRef();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete?.();
          }, 800); // espera a que termine el fade
        },
      });

      tl.from("#izquierdo", { y: "-100%", duration: 1.2 })
        .from("#derecho", { y: "100%", duration: 1.2 }, "<")
        .to("#izquierdo", { y: "10", duration: 0.3 })
        .to("#derecho", { y: "-10", duration: 0.3 }, "<")
        .to(["#izquierdo", "#derecho"], { y: "0", duration: 0.15 })
        .to(["#izquierdo", "#derecho"], {
          scale: 1.04,
          duration: 0.08,
          yoyo: true,
          repeat: 1,
          transformOrigin: "center",
        }, "-=0.05")
        .from("#J", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("#A", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("#C", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("#S", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-dark">
      {/* Contenedor que hace fade out (logo + partículas) */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <ParticlesBackground />
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
          style={{ padding: "5vh 5vw" }}
        >
          <LogoSVG />
        </div>
      </div>
    </div>
  );
}
