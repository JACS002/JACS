import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/icons/logo.svg";
import styles from "../components/styles/Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Quién Soy", href: "#quien-soy" },
    { name: "Contactemos", href: "#contacto" },
  ];

  // Ocultar al bajar, mostrar al subir
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY <= 10);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Detectar sección activa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "proyectos", "quien-soy", "contacto"];
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
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

  return (
    <nav
      className={`w-full fixed z-50 shadow-md ${styles.glass} ${
        showNavbar ? styles["navbar-visible"] : styles["navbar-hidden"]
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="md:mr-auto w-full md:w-auto text-center md:text-left">
        <a href="#inicio" className="block">
            <img src={logo} alt="Logo" className="h-12 mx-auto md:ml-6 cursor-pointer" />
        </a>

        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-titulos text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`md:mr-6 font-medium ${
                    activeSection === link.href.substring(1)
                      ? styles["neon-underline"]
                      : styles["neon-hover"]
                  }`}                  
              >
                {link.name}
              </a>
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
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`md:mr-6 font-medium ${
                    activeSection === link.href.substring(1)
                      ? styles["neon-underline"]
                      : styles["neon-hover"]
                  }`}     
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
