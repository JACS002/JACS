// ============================================================================
// Navbar tipo "casco / visor" (Diseño Original JACS)
// ============================================================================

import { useState, useEffect } from "react";
import logo from "../../../assets/icons/logo.svg";
import styles from "./Navbar.module.css";
console.log(styles); // Debug para asegurar que carga

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLang } from "../../../context/LanguageProvider";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t("nav.home"), href: "#inicio" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLangToggle = () => {
    const currentY = window.scrollY;
    toggleLang();
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentY, behavior: "auto" });
    });
  };

  // ESC para cerrar visor
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Bloquear scroll cuando el visor está abierto
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

  // escuchar cambios de visibilidad del navbar mediante evento global
  useEffect(() => {
    // estado inicial si alguien seteó window.forceHideNavbar antes
    if (typeof window !== "undefined" && "forceHideNavbar" in window) {
      setShowNavbar(!window.forceHideNavbar);
    }

    const handleVisibilityEvent = (event) => {
      const visible = event?.detail?.visible;
      if (typeof visible === "boolean") {
        setShowNavbar(visible);
      }
    };

    window.addEventListener("navbar-visibility", handleVisibilityEvent);

    return () => {
      window.removeEventListener("navbar-visibility", handleVisibilityEvent);
    };
  }, []);

  // Resaltar sección activa
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);

      const heroEnd = window.heroEnd || 0;
      if (scrollTop < heroEnd - window.innerHeight * 0.3) {
        setActiveSection("inicio");
        return;
      }

      const sectionIds = ["about", "projects", "contact"];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const center = window.innerHeight / 2;

        // Si la sección cruza el centro de la pantalla, es la activa
        if (rect.top <= center && rect.bottom >= center) {
          setActiveSection(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (targetId) => {
    let target;

    if (targetId === "#inicio" && window.heroEnd && window.heroStart != null) {
      const heroStart = window.heroStart;
      const heroEnd = window.heroEnd;
      const length = heroEnd - heroStart;
      const almostEnd = heroStart + length * 0.75; // ~75% de la animación
      target = almostEnd;
    } else if (
      targetId === "#projects" && // Cambiado de #proyectos a #projects para coincidir con ID
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

  const handleVisorNavClick = (href) => {
    setMenuOpen(false);
    handleScrollTo(href);
  };

  return (
    <>
      {/* HEADER FIJO: Logo centro + botón VISOR derecha */}
      <header
        className={`${styles.fixedHeader} ${
          showNavbar ? styles["navbar-visible"] : styles["navbar-hidden"]
        } ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.headerInner}>
          {/* Columna izquierda: solo toggle de idioma */}
          <div className={styles.headerLeft}>
            <button
              type="button"
              onClick={handleLangToggle}
              className={styles.langSwitch}
              aria-label={t("nav.langLabel")}
            >
              <span
                className={`${styles.langLabel} ${
                  lang === "en" ? styles.langActive : ""
                }`}
              >
                EN
              </span>
              <div className={styles.langTrack}>
                <div
                  className={`${styles.langThumb} ${
                    lang === "es" ? styles.thumbRight : styles.thumbLeft
                  }`}
                />
              </div>
              <span
                className={`${styles.langLabel} ${
                  lang === "es" ? styles.langActive : ""
                }`}
              >
                ES
              </span>
            </button>
          </div>

          {/* Logo centrado */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              handleScrollTo("#inicio");
            }}
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

      {/* Marca inferior centrada: JACS VISOR */}
      {!menuOpen && (
        <div className={styles.footerBrand}>
          <span className={styles.headerMetaSmall}>JACS VISOR</span>
        </div>
      )}

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
          <div className={styles.visorHudTop} />

          <div className={styles.visorCenter}>
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
                const linkIdWithoutHash = link.href.substring(1);
                // Si el link href es #projects y activeSection es projects, es match
                const isActive = activeSection === linkIdWithoutHash;

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

          <div className={styles.visorHelmetMeta}>
            <span className={styles.hudLabel}>JACS VISOR</span>
            <span className={styles.hudSubLabel}>
              ORBIT • SECTOR-03 • MK-II
            </span>
          </div>

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
