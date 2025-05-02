import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const titleRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 3, ease: "power3.out" }
    );
  }, []);
  

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <h1 ref={titleRef} className="text-4xl font-bold">
        ¡Bienvenido a mi portafolio!
      </h1>
    </section>
  );
}
