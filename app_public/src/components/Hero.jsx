import { useEffect, useRef } from "react";
import styles from "../components/styles/Hero.module.css";
import LogoNombre from "../assets/icons/LogoNombre";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current.querySelectorAll(".logo-letra");
      const logoContainer = logoRef.current.querySelector(".logo-container");
      const reflection = logoRef.current.querySelector(".logo-reflection");
      const bienvenida = logoRef.current.querySelector(".bienvenida");
      const wrapper = logoRef.current.querySelector(".logoWrapper");

      // Reset
      gsap.set(letters, { y: -200, opacity: 0 });
      gsap.set(logoContainer, { filter: "none" });
      gsap.set(reflection, { opacity: 0 });
      gsap.set(wrapper, { y: 0 });
      gsap.set(bienvenida, { y: 100, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      letters.forEach((letter, i) => {
        tl.to(letter, { y: 0, opacity: 1, ease: "power2.out" }, i * 0.1);
      });

      const glowStart = letters.length * 0.1 + 0.2;

      tl.to(letters, { fill: "#ffffff", stroke: "#ffffff" }, glowStart);
      tl.to(logoContainer, {
        filter: "drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 20px #d000ff)",
      }, "<");
      tl.to(reflection, { opacity: 0.15 }, "<");

      tl.to(wrapper, { y: -100 }, "+=0.3");
      tl.to(logoContainer, { scale: 0.6 }, "<");
      tl.to(reflection, { scale: 0.6, y: 10, opacity: 0.1 }, "<");
      tl.to(bienvenida, { y: 0, opacity: 1 }, "<+0.2");
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroSection} ref={logoRef}>
      <div className={`${styles.logoWrapper} logoWrapper`}>
        <div className={`logo-container ${styles.logoContainer}`}>
          <LogoNombre
            fillColor="#a26bf0"
            strokeColor="#a26bf0"
            classPerLetter="logo-letra"
          />
        </div>
        <div className={`logo-reflection ${styles.logoReflection}`}>
          <LogoNombre
            fillColor="#a26bf0"
            strokeColor="#a26bf0"
            classPerLetter="logo-letra"
          />
        </div>
      </div>
      <div className={`${styles.bienvenida} bienvenida`}>
        <h1>Bienvenido</h1>
      </div>
    </section>
  );
}
