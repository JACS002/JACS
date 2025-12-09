import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LogoSVG from "../components/ui/LogoSVG";

export default function LogoIntro({ onComplete }) {
  const containerRef = useRef();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete?.();
          }, 800);
        },
      });

      tl.from("#izquierdo", { y: "-100%", duration: 1.2 })
        .from("#derecho", { y: "100%", duration: 1.2 }, "<")
        .to("#izquierdo", { y: "10", duration: 0.3 })
        .to("#derecho", { y: "-10", duration: 0.3 }, "<")
        .to(["#izquierdo", "#derecho"], { y: "0", duration: 0.15 })
        .to(
          ["#izquierdo", "#derecho"],
          {
            scale: 1.04,
            duration: 0.08,
            yoyo: true,
            repeat: 1,
            transformOrigin: "center",
          },
          "-=0.05"
        )
        .from("#J", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("#A", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("#C", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from("#S", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3");
    }, containerRef);

    return () => {
      document.body.style.overflow = "auto";
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-transparent">
      {/* Logo animado con fade */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
          style={{ padding: "5vh 5vw" }}
        >
          {/* Wrapper SOLO para escalar el logo, no para recortarlo */}
          <div className="origin-center scale-[0.5] sm:scale-[0.55] md:scale-[0.63] lg:scale-[0.7]">
            <LogoSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
