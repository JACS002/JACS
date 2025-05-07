import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/icons/logo.svg";
import styles from "../components/styles/Navbar.module.css";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolling, setIsScrolling] = useState(false); // ← evita conflicto de scroll animado

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Quién Soy", href: "#quien-soy" },
    { name: "Contactemos", href: "#contacto" },
  ];

  // Ocultar al bajar, mostrar al subir (si no estamos en scroll animado)
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

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

      // Si aún está en el hero (ScrollTrigger pin activo)
      if (window.heroEnd && scrollTop < window.heroEnd) {
        setActiveSection("inicio");
        return;
      }

      const sections = ["proyectos", "quien-soy", "contacto"];
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
    const target =
      targetId === "#inicio" && window.heroEnd
        ? window.heroEnd - 1000 // ← antes del final de animación Hero
        : targetId;

    setIsScrolling(true);
    setShowNavbar(false); // ocultar durante scroll

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          setShowNavbar(true);   // volver a mostrar
          setIsScrolling(false);
        }, 200);
      },
    });
  };

  return (
    <nav
      className={`w-full fixed z-50 shadow-md ${styles.glass} ${
        showNavbar ? styles["navbar-visible"] : styles["navbar-hidden"]
      }`}
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

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-titulos text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
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

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-6 py-4 text-white font-titulos text-xl my-3">
          {navLinks.map((link) => (
            <li key={link.name} className="my-2">
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
