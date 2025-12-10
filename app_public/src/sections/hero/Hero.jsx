// src/sections/hero/Hero.jsx
// -----------------------------------------------------------------------------
// Sección "Hero" del portfolio
// -----------------------------------------------------------------------------

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import LogoNombre from "../../assets/icons/LogoNombre";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../context/LanguageProvider";
import { useScroll } from "../../context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ enableAnimations }) {
  const logoRef = useRef(null);
  const { t } = useLang();
  const { refreshScroll } = useScroll();

  // Timeline principal del hero
  useEffect(() => {
    if (!enableAnimations) return;
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      const letters = logoRef.current.querySelectorAll(".logo-letra");
      const logoContainer = logoRef.current.querySelector(".logo-container");
      const halo = logoRef.current.querySelector(".logo-halo");
      const wrapper = logoRef.current.querySelector(".logoWrapper");
      const bienvenida = logoRef.current.querySelector(".bienvenida");

      if (!letters.length || !logoContainer || !halo || !wrapper || !bienvenida)
        return;

      const isSmallViewport =
        window.innerHeight < 740 || window.innerWidth < 400;

      // Estados iniciales
      gsap.set(letters, { y: -200, opacity: 0 });
      gsap.set(logoContainer, { filter: "none", scale: 1 });
      gsap.set(halo, { opacity: 0, scale: 1, y: 0, yPercent: 0 });
      gsap.set(wrapper, { y: 0, opacity: 1 });
      gsap.set(bienvenida, { y: 100, opacity: 0 });

      // --------------------------------------
      //TIMELINE CINEMÁTICO (LENTO + SUAVE)
      // --------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top top",
          end: "+=900",
          scrub: 2,     //animación muy lenta al scrollear
          pin: true,
          invalidateOnRefresh: true,
          refreshPriority: 10,
          onRefresh: (self) => {
            window.heroStart = self.start;
            window.heroEnd = self.end;
          },
          onUpdate: (self) => {
            window.heroStart = self.start;
            window.heroEnd = self.end;
          },
        },
      });

      // 1) Caída de letras — muy lenta
      tl.to(letters, {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 4.5,   // antes era ~2
        stagger: 0.25,   // más separación entre letras
      });

      // 2) Glow de letras (iluminación)
      tl.to(
        letters,
        {
          fill: "#ffffff",
          stroke: "#ffffff",
          duration: 2.5,
          ease: "power1.out",
        },
        "+=0.6"
      );

      // 3) Glow del logo
      tl.to(
        logoContainer,
        {
          filter:
            "drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 18px #9c65f2)",
          duration: 2.5,
        },
        "<"
      );

      // 4) Halo aparece
      tl.to(
        halo,
        {
          opacity: 0.5,
          duration: 2.5,
        },
        "<"
      );

      // 5) Wrapper sube lentamente
      tl.to(
        wrapper,
        {
          y: isSmallViewport ? "-25vh" : "-20vh",
          duration: 6,
          ease: "power2.inOut",
        },
        "+=0.5"
      );

      // 6) Logo se encoge mientras sube
      tl.to(
        [logoContainer, halo],
        {
          scale: 0.5,
          duration: 6,
          ease: "power2.inOut",
        },
        "<"
      );

      // 7) Halo sube también
      tl.to(
        halo,
        {
          yPercent: -60,
          duration: 6,
          ease: "power2.inOut",
        },
        "<"
      );

      // 8) Texto de bienvenida — entrada suave
      tl.to(
        bienvenida,
        {
          y: 0,
          opacity: 1,
          duration: 3.5,
          ease: "power3.out",
        },
        "<+1"
      );

      // 9) Pausa para que el usuario lo lea
      tl.to({}, { duration: 2 });

      // 10) Fade-out final
      tl.to([wrapper, bienvenida], {
        opacity: 0,
        y: -50,
        duration: 2,
        ease: "power1.in",
      });
    }, logoRef);

    refreshScroll();

    return () => ctx.revert();
  }, [enableAnimations, refreshScroll]);

  // Indicador de scroll (optimizado)
  useEffect(() => {
    const icon = document.querySelector(".scroll-indicator");
    if (!icon) return;

    const handleScroll = () => {
      icon.style.opacity = window.scrollY > 20 ? "0" : "1";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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

      {/* Texto de bienvenida */}
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

      {/* Indicador de scroll */}
      <div className={`${styles.scrollIndicator} scroll-indicator`}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <p>{t("hero.scrollHint")}</p>
      </div>
    </section>
  );
}
