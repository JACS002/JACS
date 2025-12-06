import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/icons/logo.svg";
import styles from "../components/styles/Navbar.module.css";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const { lang, toggleLang } = useLang();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: lang === "es" ? "Inicio" : "Home", href: "#inicio" },
    { name: lang === "es" ? "Proyectos" : "Projects", href: "#proyectos" },
    { name: lang === "es" ? "Quién soy" : "About me", href: "#quien-soy" },
    { name: lang === "es" ? "Contacto" : "Contact", href: "#contacto" },
  ];

  // NUEVO: handler para cambiar idioma sin mover el scroll
  const handleLangToggle = () => {
    const currentY = window.scrollY;
    toggleLang();

    // Esperamos al siguiente frame para que React pinte el nuevo texto
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentY,
        behavior: "auto",
      });
    });
  };

  // Si al montar el navbar el modal ya está abierto, ocultarlo
  useEffect(() => {
    if (window.forceHideNavbar) {
      setShowNavbar(false);
    }
  }, []);

  // Manejar scroll: ocultar al bajar, mostrar al subir (si no hay modal)
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      if (window.forceHideNavbar) {
        setShowNavbar(false);
        return;
      }

      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY <= 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isScrolling]);

  // Detectar sección activa
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (window.heroEnd && scrollTop < window.heroEnd) {
        setActiveSection("inicio");
        return;
      }

      if (
        window.proyectosStart !== null &&
        window.proyectosEnd !== null &&
        scrollTop >= window.proyectosStart &&
        scrollTop < window.proyectosEnd
      ) {
        setActiveSection("proyectos");
        return;
      }

      const sections = ["quien-soy", "contacto"];
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollTop >= offsetTop - window.innerHeight * 0.3 &&
            scrollTop < offsetTop + offsetHeight - window.innerHeight * 0.3
          ) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll animado con ocultación de navbar
  const handleScrollTo = (targetId) => {
    let target;

    if (targetId === "#inicio" && window.heroEnd) {
      target = window.heroEnd - 1000;
    } else if (targetId === "#proyectos" && window.proyectosStart !== undefined) {
      target = window.proyectosStart;
    } else {
      target = targetId;
    }

    setIsScrolling(true);
    setShowNavbar(false);

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          if (!window.forceHideNavbar) {
            setShowNavbar(true);
          }
          setIsScrolling(false);
        }, 200);
      },
    });
  };

  // Vigilar window.forceHideNavbar constantemente
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.forceHideNavbar) {
        setShowNavbar(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`w-full fixed z-50 shadow-md ${
        styles.glass
      } ${showNavbar ? styles["navbar-visible"] : styles["navbar-hidden"]}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="md:mr-auto w-full md:w-auto text-center md:text-left">
          <button onClick={() => handleScrollTo("#inicio")} className="block">
            <img
              src={logo}
              alt="Logo"
              className="h-12 mx-auto md:ml-6 cursor-pointer"
            />
          </button>
        </div>

        {/* Links + switch en desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-8 font-titulos text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleScrollTo(link.href)}
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

          {/* Switch idioma desktop */}
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

        {/* Switch + hamburguesa en mobile */}
        <div className="flex items-center gap-3 md:hidden">
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

          <button
            className="text-2xl text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú mobile (lo dejas igual, solo usando navLinks) */}
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
