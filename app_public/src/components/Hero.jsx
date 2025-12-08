// src/components/Hero.jsx
// -----------------------------------------------------------------------------
// Sección "Hero" del portfolio
// - Pantalla inicial con animación de logo tipo “intro cinemática”.
// - Usa GSAP + ScrollTrigger para:
//   * Caída de letras del logo
//   * Encendido / glow
//   * Transformación y subida del logo
//   * Aparición y desaparición del texto de bienvenida
//   * Pin del hero para crear una experiencia tipo “story scroll”
// - Integra el sistema de idiomas (useLang) y el contexto de scroll (useScroll)
// -----------------------------------------------------------------------------

import { useLayoutEffect, useRef, useEffect } from "react";
import styles from "../components/styles/Hero.module.css";
import LogoNombre from "../assets/icons/LogoNombre";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../context/LanguageProvider";
import { useScroll } from "../context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// COMPONENTE PRINCIPAL: HERO
// ============================================================================

export default function Hero() {
  // Ref principal de la sección Hero (se usa como trigger y contenedor del logo)
  const logoRef = useRef(null);

  // Hook de traducciones (Textos dinámicos según idioma)
  const { t } = useLang();

  // Hook del contexto de scroll (para forzar refresh manual cuando cambian secciones)
  const { refreshScroll } = useScroll();

  // ==========================================================================
  // useLayoutEffect: configuración de la animación GSAP + ScrollTrigger
  // ==========================================================================

  useLayoutEffect(() => {
    // gsap.context para limitar los selectores y facilitar cleanup
    const ctx = gsap.context(() => {
      // -----------------------------
      // Selección de elementos clave
      // -----------------------------
      const letters = logoRef.current.querySelectorAll(".logo-letra");      // letras individuales del logo SVG
      const logoContainer = logoRef.current.querySelector(".logo-container"); // contenedor del logo
      const halo = logoRef.current.querySelector(".logo-halo");              // halo brillante detrás del logo
      const wrapper = logoRef.current.querySelector(".logoWrapper");         // wrapper general del logo
      const bienvenida = logoRef.current.querySelector(".bienvenida");       // bloque de texto de bienvenida
      const isSmallViewport = window.innerHeight < 740 || window.innerWidth < 400;
      // -----------------------------
      // Estado inicial de la animación
      // -----------------------------
      gsap.set(letters, { y: -200, opacity: 0 });   // letras fuera de vista hacia arriba
      gsap.set(logoContainer, { filter: "none", scale: 1 });
      gsap.set(halo, { opacity: 0, scale: 1, y: 0, yPercent: 0 });
      gsap.set(wrapper, { y: 0, opacity: 1 });
      gsap.set(bienvenida, { y: 100, opacity: 0 }); // texto de bienvenida oculto y desplazado hacia abajo

      // ----------------------------------------------------------------------
      // Timeline principal del Hero (vinculada a ScrollTrigger)
      // ----------------------------------------------------------------------
      const tl = gsap.timeline({
      scrollTrigger: {
        trigger: logoRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        refreshPriority: 10,
        onRefresh: (self) => { window.heroEnd = self.end; },
        onUpdate: (self) => { window.heroEnd = self.end; },
      },
    });

      // ------------------------------------------------------------------
      // 1. Caída de letras del logo (entrada individual con pequeño delay)
      // ------------------------------------------------------------------
      let lastFallTime = 0;

      letters.forEach((letter, i) => {
        const time = i * 0.1; // escalonado entre letras

        tl.to(
          letter,
          { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
          time
        );

        if (time > lastFallTime) lastFallTime = time;
      });

      // Punto de inicio de la fase de “glow” (después de la caída)
      const glowStart = lastFallTime + 0.5;

      // ------------------------------------------------------------------
      // 2. Encendido de luces / Glow del logo + halo
      // ------------------------------------------------------------------
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
        "<" // "<" = mismo instante que el tween anterior
      );

      tl.to(
        halo,
        { opacity: 0.5, duration: 1 },
        "<" // sincrónico con el glow
      );

      // ------------------------------------------------------------------
      // 3. Transformación y subida del logo
      //    - El wrapper sube
      //    - Logo y halo se escalan hacia un tamaño más pequeño
      //    - Halo sube un poco más (yPercent)
      // ------------------------------------------------------------------
      tl.to(
        wrapper,
        { y: isSmallViewport ? "-30vh" : "-20vh", duration: 3, ease: "power1.inOut" },
        "+=0.5" // pequeño delay después del glow
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

      // ------------------------------------------------------------------
      // 4. Aparición del texto de Bienvenida
      // ------------------------------------------------------------------
      tl.to(
        bienvenida,
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 2,
        },
        "<+1" // se solapa ligeramente después del movimiento del logo
      );

      // ------------------------------------------------------------------
      // 5. Pausa visual breve (timeline “en reposo” mientras se lee)
      // ------------------------------------------------------------------
      tl.to({}, { duration: 2 });

      // ------------------------------------------------------------------
      // 6. Desvanecimiento final de logo + texto de bienvenida
      // ------------------------------------------------------------------
      tl.to([wrapper, bienvenida], {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power1.in",
      });
    }, logoRef);

    // Refresco global de scroll/ScrollTrigger (por si el layout cambió)
    refreshScroll();

    // Cleanup: revertir animaciones y limpiar variable global
    return () => {
      ctx.revert();
      window.heroEnd = null;
    };
  }, [refreshScroll]);

  // ==========================================================================
  // useEffect: mostrar / ocultar icono de “scroll down”
  // ==========================================================================
  useEffect(() => {
    const handleScroll = () => {
      const icon = document.querySelector(".scroll-down");
      if (!icon) return;
      // Si el usuario ya se desplazó un poco, ocultamos el icono
      icon.style.opacity = window.scrollY > 20 ? "0" : "1";
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ==========================================================================
  // RENDER DEL COMPONENTE
  // ==========================================================================

  return (
    <section id="inicio" className={styles.heroSection} ref={logoRef}>
      {/* Wrapper principal del logo */}
      <div className={`${styles.logoWrapper} logoWrapper`}>
        {/* Contenedor del SVG del logo (cada letra tiene clase .logo-letra) */}
        <div className={`logo-container ${styles.logoContainer}`}>
          <LogoNombre
            fillColor="#a26bf0"
            strokeColor="#a26bf0"
            classPerLetter="logo-letra"
          />
        </div>

        {/* Halo brillante detrás del logo */}
        <div className={`${styles.logoHalo} logo-halo`}></div>
      </div>

      {/* Bloque de texto de bienvenida (título, tagline y descripción) */}
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

        <p className="text-white font-contenido text-lg md:text-xl leading-relaxed mb-3">
          {t("hero.p1")}
        </p>

        <p className="text-gray-300 font-contenido text-base md:text-lg leading-relaxed">
          {t("hero.p2")}
        </p>
      </div>

      {/* Icono / indicador de scroll hacia abajo */}
      <div className={`${styles.scrollDown} scroll-down`}>
        <span className={styles.arrow}></span>
      </div>
    </section>
  );
}
