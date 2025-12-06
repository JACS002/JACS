// ============================================================================
// src/components/Navbar.jsx
// -----------------------------------------------------------------------------
// BARRA DE NAVEGACIÓN PRINCIPAL DEL PORTAFOLIO
//
// FUNCIONALIDADES PRINCIPALES
// -----------------------------------------------------------------------------
// ✔ Oculta/abre el menú móvil mediante un ícono hamburguesa
// ✔ Detecta el scroll para ocultar la navbar al bajar y mostrarla al subir
// ✔ Detecta automáticamente la sección activa (Inicio, Proyectos, Quién Soy, Contacto)
// ✔ Se integra con las animaciones GSAP de Hero y Proyectos usando marcadores globales
// ✔ Permite cambiar el idioma sin mover el scroll actual
// ✔ Desaparece automáticamente cuando un modal está abierto (forceHideNavbar)
// ✔ Animación suave de scroll usando GSAP ScrollToPlugin
// ============================================================================

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/icons/logo.svg";
import styles from "../components/styles/Navbar.module.css";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollToPlugin);

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function Navbar() {
  const { lang, toggleLang } = useLang();

  // Estados locales
  const [menuOpen, setMenuOpen] = useState(false); // menú móvil abierto/cerrado
  const [showNavbar, setShowNavbar] = useState(true); // visibilidad por scroll
  const [lastScrollY, setLastScrollY] = useState(0); // posición previa de scroll
  const [activeSection, setActiveSection] = useState(""); // sección activa actual
  const [isScrolling, setIsScrolling] = useState(false); // bloquea eventos mientras GSAP hace scroll

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Links multilenguaje
  const navLinks = [
    { name: lang === "es" ? "Inicio" : "Home", href: "#inicio" },
    { name: lang === "es" ? "Proyectos" : "Projects", href: "#proyectos" },
    { name: lang === "es" ? "Quién soy" : "About me", href: "#quien-soy" },
    { name: lang === "es" ? "Contacto" : "Contact", href: "#contacto" },
  ];

  // ============================================================================
  // CAMBIO DE IDIOMA SIN MOVER EL SCROLL
  // ============================================================================
  const handleLangToggle = () => {
    const currentY = window.scrollY;
    toggleLang();

    // React renderiza nuevo texto → luego restauramos posición
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentY, behavior: "auto" });
    });
  };

  // ============================================================================
  // OCULTAR NAVBAR SI EL MODAL YA ESTÁ ABIERTO AL ENTRAR
  // ============================================================================
  useEffect(() => {
    if (window.forceHideNavbar) {
      setShowNavbar(false);
    }
  }, []);

  // ============================================================================
  // OCULTAR NAVBAR AL BAJAR Y MOSTRAR AL SUBIR
  // ============================================================================
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return; // evitar interferir con animaciones GSAP

      // Cuando un modal está abierto, la navbar debe permanecer oculta
      if (window.forceHideNavbar) {
        setShowNavbar(false);
        return;
      }

      const currentScrollY = window.scrollY;

      // Mostrar si sube, ocultar si baja
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY <= 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isScrolling]);

  // ============================================================================
  // DETECTAR SECCIÓN ACTIVA SEGÚN EL SCROLL
  // Se integra con Hero y Proyectos mediante window.heroEnd y window.proyectosStart/End
  // ============================================================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // --- REGIÓN HERO ---
      if (window.heroEnd && scrollTop < window.heroEnd) {
        setActiveSection("inicio");
        return;
      }

      // --- REGIÓN PROYECTOS (pin + scroll largo) ---
      if (
        window.proyectosStart !== null &&
        window.proyectosEnd !== null &&
        scrollTop >= window.proyectosStart &&
        scrollTop < window.proyectosEnd
      ) {
        setActiveSection("proyectos");
        return;
      }

      // --- OTRAS SECCIONES ---
      const sections = ["quien-soy", "contacto"];
      for (const id of sections) {
        const section = document.getElementById(id);
        if (!section) continue;
        const { offsetTop, offsetHeight } = section;

        // pequeña zona buffer (30% de la pantalla)
        if (
          scrollTop >= offsetTop - window.innerHeight * 0.3 &&
          scrollTop < offsetTop + offsetHeight - window.innerHeight * 0.3
        ) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // establecer valor inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================================================
  // SCROLL ANIMADO CON GSAP A UNA SECCIÓN
  // Respeta los offsets de Hero y Proyectos
  // ============================================================================
  const handleScrollTo = (targetId) => {
    let target;

    // Ajuste especial para Hero (debido al largo pin de animación)
    if (targetId === "#inicio" && window.heroEnd) {
      target = window.heroEnd - 1000;
    }
    // Ajuste para Proyectos (inicio exacto de la animación GSAP)
    else if (targetId === "#proyectos" && window.proyectosStart !== undefined) {
      target = window.proyectosStart;
    }
    // Scroll normal a sección
    else {
      target = targetId;
    }

    setIsScrolling(true);
    setShowNavbar(false);

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power2.inOut",

      onComplete: () => {
        // retraso para permitir estabilización del scroll
        setTimeout(() => {
          if (!window.forceHideNavbar) {
            setShowNavbar(true);
          }
          setIsScrolling(false);
        }, 200);
      },
    });
  };

  // ============================================================================
  // MONITOREAR forceHideNavbar PARA OCULTAR LA NAVBAR DURANTE LOS MODALES
  // ============================================================================
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.forceHideNavbar) setShowNavbar(false);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <nav
      className={`w-full fixed z-50 shadow-md ${
        styles.glass
      } ${showNavbar ? styles["navbar-visible"] : styles["navbar-hidden"]}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* ------------------------------------------------------------ */}
        {/* LOGO (click = volver al inicio con animación GSAP)          */}
        {/* ------------------------------------------------------------ */}
        <div className="md:mr-auto w-full md:w-auto text-center md:text-left">
          <button onClick={() => handleScrollTo("#inicio")} className="block">
            <img
              src={logo}
              alt="Logo"
              className="h-12 mx-auto md:ml-6 cursor-pointer"
            />
          </button>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* LINKS + SWITCH DE IDIOMA — DESKTOP                          */}
        {/* ------------------------------------------------------------ */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-8 font-titulos text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleScrollTo(link.href)}
                  className={`md:mr-6 font-medium ${
                    activeSection === link.href.substring(1)
                      ? styles["neon-underline"] // sección activa
                      : styles["neon-hover"] // hover glow
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* SWITCH DE IDIOMA (desktop) */}
          <button
            onClick={handleLangToggle}
            className={styles.langSwitch}
            aria-label="Toggle language"
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

        {/* ------------------------------------------------------------ */}
        {/* MOBILE: SWITCH IDIOMA + MENÚ HAMBURGUESA                    */}
        {/* ------------------------------------------------------------ */}
        <div className="flex items-center gap-3 md:hidden">
          {/* switch idioma móvil */}
          <button
            onClick={handleLangToggle}
            className={styles.langSwitch}
            aria-label="Toggle language"
          >
            <span
              className={`${styles.langLabelXs} ${
                lang === "en" ? styles.langActive : ""
              }`}
            >
              EN
            </span>
            <div className={styles.langTrackXs}>
              <div
                className={`${styles.langThumbXs} ${
                  lang === "es" ? styles.thumbRight : styles.thumbLeft
                }`}
              />
            </div>
            <span
              className={`${styles.langLabelXs} ${
                lang === "es" ? styles.langActive : ""
              }`}
            >
              ES
            </span>
          </button>

          {/* ícono hamburguesa */}
          <button
            className="text-2xl text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* MENÚ MOBILE (usando los mismos navLinks)                    */}
      {/* ------------------------------------------------------------ */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-6 py-4 text-white font-titulos text-xl my-3">
          {navLinks.map((link) => (
            <li key={link.href} className="my-2">
              <button
                onClick={() => {
                  handleScrollTo(link.href);
                  setMenuOpen(false);
                }}
                className={`md:mr-6 font-medium ${
                  activeSection === link.href.substring(1)
                    ? styles["neon-underline"]
                    : styles["neon-hover"]
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
