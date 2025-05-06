import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LogoNombre from "../assets/icons/LogoNombre";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const reflectionRef = useRef(null);
  const textRef = useRef(null);

  const [logoState, setLogoState] = useState({
    fillColor: "none",
    strokeColor: "#3a2470",
    strokeWidth: 1.5
  });

  const [showReflection, setShowReflection] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true
          }
        });

        // Etapa 1: activar relleno blanco e iluminación
        tl.to({}, {
          duration: 1,
          onUpdate: () => {
            setLogoState({
              fillColor: "#ffffff",
              strokeColor: "none",
              strokeWidth: 0
            });
            setShowReflection(true);
            if (logoRef.current) {
              logoRef.current.style.filter = "drop-shadow(0 0 25px white)";
            }
          }
        });

        // Etapa 2: mover logo a la derecha y mostrar "Bienvenido"
        tl.to(logoRef.current, {
          xPercent: 60,
          duration: 1
        });

        tl.fromTo(
          textRef.current,
          { xPercent: -100, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1 },
          "<"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Contenedor del logo */}
      <div
        ref={logoRef}
        className="relative z-10 w-[400px] h-auto transition-all duration-500"
      >
        <LogoNombre {...logoState} />
      </div>

      {/* Reflejo debajo del logo */}
      {showReflection && (
        <div
          ref={reflectionRef}
          className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[400px] h-auto scale-y-[-1] opacity-25 pointer-events-none z-0"
          style={{
            filter: "blur(6px) drop-shadow(0 0 15px white)",
            transformOrigin: "top"
          }}
        >
          <LogoNombre fillColor="#ffffff" strokeColor="none" strokeWidth={0} />
        </div>
      )}

      {/* Texto "Bienvenido" que entra desde la izquierda */}
      <div
        ref={textRef}
        className="absolute left-10 text-5xl font-bold text-white opacity-0 z-20"
      >
        Bienvenido
      </div>
    </section>
  );
}
