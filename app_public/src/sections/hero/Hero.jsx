// src/components/Hero.jsx
// -----------------------------------------------------------------------------
// Sección "Hero" del portfolio
// -----------------------------------------------------------------------------

import { useLayoutEffect, useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import LogoNombre from "../../assets/icons/LogoNombre";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../context/LanguageProvider";
import { useScroll } from "../../context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const logoRef = useRef(null);
  const { t } = useLang();
  const { refreshScroll } = useScroll();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = logoRef.current.querySelectorAll(".logo-letra");
      const logoContainer = logoRef.current.querySelector(".logo-container");
      const halo = logoRef.current.querySelector(".logo-halo");
      const wrapper = logoRef.current.querySelector(".logoWrapper");
      const bienvenida = logoRef.current.querySelector(".bienvenida");

      const isSmallViewport =
        window.innerHeight < 740 || window.innerWidth < 400;

      gsap.set(letters, { y: -200, opacity: 0 });
      gsap.set(logoContainer, { filter: "none", scale: 1 });
      gsap.set(halo, { opacity: 0, scale: 1, y: 0, yPercent: 0 });
      gsap.set(wrapper, { y: 0, opacity: 1 });
      gsap.set(bienvenida, { y: 100, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          refreshPriority: 10,
          onRefresh: (self) => {
            window.heroEnd = self.end;
          },
          onUpdate: (self) => {
            window.heroEnd = self.end;
          },
        },
      });

      let lastFallTime = 0;

      letters.forEach((letter, i) => {
        const time = i * 0.1;

        tl.to(
          letter,
          { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
          time
        );

        if (time > lastFallTime) lastFallTime = time;
      });

      const glowStart = lastFallTime + 0.5;

      tl.to(
        letters,
        { fill: "#ffffff", stroke: "#ffffff", duration: 1 },
        glowStart
      );

      tl.to(
        logoContainer,
        {
          filter:
            "drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 20px #9c65f2)",
          duration: 1,
        },
        "<"
      );

      tl.to(
        halo,
        { opacity: 0.5, duration: 1 },
        "<"
      );

      tl.to(
        wrapper,
        {
          y: isSmallViewport ? "-25vh" : "-20vh",
          duration: 3,
          ease: "power1.inOut",
        },
        "+=0.5"
      );

      tl.to(
        [logoContainer, halo],
        {
          scale: 0.5,
          transformOrigin: "center center",
          duration: 3,
        },
        "<"
      );

      tl.to(
        halo,
        { yPercent: -60, duration: 3 },
        "<"
      );

      tl.to(
        bienvenida,
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 2,
        },
        "<+1"
      );

      tl.to({}, { duration: 2 });

      tl.to([wrapper, bienvenida], {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power1.in",
      });
    }, logoRef);

    refreshScroll();

    return () => {
      ctx.revert();
      window.heroEnd = null;
    };
  }, [refreshScroll]);

  // Mostrar / ocultar indicador de scroll
  useEffect(() => {
    const handleScroll = () => {
      const icon = document.querySelector(".scroll-indicator");
      if (!icon) return;
      icon.style.opacity = window.scrollY > 20 ? "0" : "1";
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="inicio" className={styles.heroSection} ref={logoRef}>
      {/* Wrapper principal del logo */}
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

      {/* Bloque de texto de bienvenida */}
      <div
        className={`
          ${styles.bienvenida} bienvenida
          mt-8 md:mt-10 lg:mt-12
        `}
      >
        <h1 className="text-white font-titulos font-bold text-5xl mb-5 mt-3">
          {t("hero.title")}
        </h1>

        <h2 className="text-white font-titulos font-semibold text-3xl mb-5">
          <span className="text-accent">{t("hero.tagline.fs")}</span> ·{" "}
          <span className="text-accent">{t("hero.tagline.dm")}</span>
        </h2>

        <p className="text-center text-white font-contenido text-lg md:text-xl leading-relaxed mb-3">
          {t("hero.p1")}
        </p>
        <p className="text-center text-gray-400 font-contenido text-lg md:text-xl leading-relaxed">
          {t("hero.p2")}
        </p>
      </div>

      {/* Indicador de scroll (mouse + texto) */}
      <div className={`${styles.scrollIndicator} scroll-indicator`}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <p>{t("hero.scrollHint")}</p>
      </div>
    </section>
  );
}
