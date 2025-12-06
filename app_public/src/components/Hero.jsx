// src/components/Hero.jsx
import { useEffect, useRef } from "react";
import styles from "../components/styles/Hero.module.css";
import LogoNombre from "../assets/icons/LogoNombre";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBackground from "./ParticlesBackground";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const logoRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current.querySelectorAll(".logo-letra");
      const logoContainer = logoRef.current.querySelector(".logo-container");
      const halo = logoRef.current.querySelector(".logo-halo");
      const wrapper = logoRef.current.querySelector(".logoWrapper");
      const bienvenida = logoRef.current.querySelector(".bienvenida");

      gsap.set(letters, { y: -200, opacity: 0 });
      gsap.set(logoContainer, { filter: "none", scale: 1 });
      gsap.set(halo, { opacity: 0, scale: 1, y: 0, yPercent: 0 });
      gsap.set(wrapper, { y: 0 });
      gsap.set(bienvenida, { y: 100, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          markers: false,
          onUpdate: (self) => {
            window.heroEnd = self.end;
          },
        },
      });

      let lastFallTime = 0;
      letters.forEach((letter, i) => {
        const time = i * 0.1;
        tl.to(letter, { y: 0, opacity: 1, ease: "power2.out" }, time);
        if (time > lastFallTime) lastFallTime = time;
      });

      const glowStart = lastFallTime + 0.2;

      tl.to(letters, { fill: "#ffffff", stroke: "#ffffff" }, glowStart);
      tl.to(
        logoContainer,
        {
          filter:
            "drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 20px #9c65f2)",
        },
        "<"
      );
      tl.to(halo, { opacity: 0.5 }, "<");

      tl.to(wrapper, { y: -200 }, "+=0.3");

      tl.to(
        [logoContainer, halo],
        {
          scale: 0.5,
          transformOrigin: "center center",
        },
        "<"
      );

      tl.to(
        halo,
        {
          yPercent: -60,
        },
        "<"
      );

      tl.to(
        bienvenida,
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "<+0.2"
      );
    }, logoRef);

    return () => {
      ctx.revert();
      window.heroEnd = null;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const icon = document.querySelector(".scroll-down");
      if (!icon) return;
      icon.style.opacity = window.scrollY > 20 ? "0" : "1";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="inicio" className={styles.heroSection} ref={logoRef}>
      <ParticlesBackground />

      <div className={`${styles.logoWrapper} logoWrapper`}>
        <div className={`logo-container ${styles.logoContainer}`}>
          <LogoNombre
            fillColor="#a26bf0"
            strokeColor="#a26bf0"
            classPerLetter="logo-letra"
          />
        </div>
        <div className={`${styles.logoHalo} logo-halo`}></div>
      </div>

      <div
        className={`${styles.bienvenida} bienvenida`}
        style={{ marginTop: "3rem" }}
      >
        <h1 className="text-white font-titulos font-bold text-5xl mb-5 mt-3">
          {t("hero.title")}
        </h1>

        <h2 className="text-white font-titulos font-semibold text-3xl mb-5">
          <span className="text-accent">{t("hero.tagline.fs")}</span> ·{" "}
          <span className="text-accent">{t("hero.tagline.dm")}</span>
        </h2>

        <p className="text-white font-contenido text-lg md:text-xl leading-relaxed mb-3">
          {t("hero.p1")}
        </p>

        <p className="text-gray-300 font-contenido text-base md:text-lg leading-relaxed">
          {t("hero.p2")}
        </p>
      </div>

      <div className={`${styles.scrollDown} scroll-down`}>
        <span className={styles.arrow}></span>
      </div>
    </section>
  );
}
