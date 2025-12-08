// ============================================================================
// Navbar tipo "casco / visor"
// - Logo fijo centro superior
// - Botón VISOR_002 a la derecha
// - Al abrir visor: overlay HUD con secciones + cambio de idioma
// ============================================================================

import { useState, useEffect } from "react";
import logo from "../assets/icons/logo.svg";
import styles from "../components/styles/Navbar.module.css";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();

  // Estados
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  // Links usando sistema de traducciones
  const navLinks = [
    { name: t("nav.home"), href: "#inicio" },
    { name: t("nav.projects"), href: "#proyectos" },
    { name: t("nav.about"), href: "#quien-soy" },
    { name: t("nav.contact"), href: "#contacto" },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // ========================================================================
  // Cambio de idioma sin mover el scroll
  // ========================================================================
  const handleLangToggle = () => {
    const currentY = window.scrollY;
    toggleLang();
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentY, behavior: "auto" });
    });
  };

  // ========================================================================
  // Cerrar visor con tecla ESC
  // ========================================================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  // ========================================================================
  // Bloquear scroll del body cuando el visor está abierto
  // ========================================================================
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ========================================================================
  // Ocultar navbar si ya hay un modal abierto al entrar
  // ========================================================================
  useEffect(() => {
    if (window.forceHideNavbar) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, []);

  // ========================================================================
  // Detectar sección activa según el scroll
  // ========================================================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const heroEnd = window.heroEnd || 0;
      if (scrollTop < heroEnd - window.innerHeight * 0.3) {
        setActiveSection("inicio");
        return;
      }

      const sectionIds = ["proyectos", "quien-soy", "contacto"];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const { offsetTop, offsetHeight } = section;

        if (
          scrollTop >= offsetTop - window.innerHeight * 0.3 &&
          scrollTop < offsetTop + offsetHeight - window.innerHeight * 0.3
        ) {
          setActiveSection(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ========================================================================
  // Scroll animado con GSAP
  // ========================================================================
  const handleScrollTo = (targetId) => {
    let target;

    if (targetId === "#inicio" && window.heroEnd) {
      target = window.heroEnd - 1000;
    } else if (
      targetId === "#proyectos" &&
      window.proyectosStart !== undefined
    ) {
      target = window.proyectosStart;
    } else {
      target = targetId;
    }

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power2.inOut",
    });
  };

  // ========================================================================
  // Monitorear forceHideNavbar para ocultar durante modales
  // ========================================================================
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.forceHideNavbar) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Click en opción de menú dentro del visor
  const handleVisorNavClick = (href) => {
    setMenuOpen(false);
    handleScrollTo(href);
  };

  // ========================================================================
  // Render
  // ========================================================================
  return (
    <>
      {/* HEADER FIJO: Logo centro + botón VISOR derecha */}
      <header
        className={`${styles.fixedHeader} ${
          showNavbar ? styles["navbar-visible"] : styles["navbar-hidden"]
        }`}
      >
        <div className={styles.headerInner}>
          {/* Columna izquierda (HUD pequeño) */}
          <div className={styles.headerLeft}>
            <span className={styles.headerMetaSmall}>JACS VISOR</span>
          </div>

          {/* Logo centrado */}
          <button
            type="button"
            onClick={() => handleScrollTo("#inicio")}
            className={styles.headerLogoButton}
          >
            <img src={logo} alt="JACS Logo" className={styles.headerLogo} />
          </button>

          {/* Botón VISOR_002 derecha */}
          <div className={styles.headerRight}>
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="helmetVisor"
              className={`${styles.visorToggle} ${
                menuOpen ? styles.visorToggleOpen : ""
              }`}
            >
              <span className={styles.visorToggleLabel}>
                {menuOpen ? "EXIT_MENU" : "MENU"}
              </span>
              <span className={styles.visorToggleDot} />
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY DEL CASCO / VISOR */}
      <div
        id="helmetVisor"
        className={`${styles.visorOverlay} ${
          menuOpen ? styles.visorOverlayOpen : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.visorBackdrop} />

        <div className={styles.visorFrame}>
          {/* HUD superior dentro del visor (vacío, solo mantiene algo de espacio si quieres) */}
          <div className={styles.visorHudTop} />

          {/* Centro del visor: POV + navegación */}
          <div className={styles.visorCenter}>
            <button
              type="button"
              onClick={handleLangToggle}
              className={styles.langSwitchCenter}
              aria-label={t("nav.langLabel")}
            >
              <span className={`${styles.langLabel} ${lang === "en" ? styles.langActive : ""}`}>
                EN
              </span>
              <div className={styles.langTrack}>
                <div
                  className={`${styles.langThumb} ${
                    lang === "es" ? styles.thumbRight : styles.thumbLeft
                  }`}
                />
              </div>
              <span className={`${styles.langLabel} ${lang === "es" ? styles.langActive : ""}`}>
                ES
              </span>
            </button>

            <p className={styles.visorTitle}>
              {lang === "es" ? "Sistema de navegación" : "Navigation system"}
            </p>
            <p className={styles.visorSubtitle}>
              {lang === "es"
                ? "Selecciona un destino dentro del casco."
                : "Select a destination inside the helmet."}
            </p>

            <ul className={styles.visorNavList}>
              {navLinks.map((link) => {
                const id = link.href.substring(1);
                const isActive = activeSection === id;

                return (
                  <li key={link.href} className={styles.visorNavItem}>
                    <button
                      type="button"
                      className={`${styles.visorNavButton} ${
                        isActive ? styles.visorNavActive : ""
                      }`}
                      onClick={() => handleVisorNavClick(link.href)}
                    >
                      <span className={styles.visorNavLabel}>{link.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Meta del casco al final de las secciones */}
          <div className={styles.visorHelmetMeta}>
            <span className={styles.hudLabel}>JACS VISOR</span>
            <span className={styles.hudSubLabel}>ORBIT • SECTOR-03 • MK-II</span>
            {/* cambia "MK-II" por la versión que tú quieras */}
          </div>

          {/* Pie del visor: pista visual */}
          <div className={styles.visorFooter}>
            <span className={styles.visorHint}>
              {lang === "es"
                ? "Pulsa EXIT_MENU o presiona ESC para cerrar."
                : "Tap EXIT_MENU or press ESC to close."}
            </span>
          </div>
        </div>

      </div>
    </>
  );
}
