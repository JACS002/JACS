// Home.jsx
import { useLayoutEffect } from "react"; // Importar useLayoutEffect
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Proyectos from "../components/Proyectos";
import QuienSoy from "../components/QuienSoy";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import { ScrollProvider } from "../context/ScrollContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  
  useLayoutEffect(() => {
    // Un pequeño timeout para asegurar que el DOM de los hijos (Hero, etc) ya existe
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollProvider>
      <main className="bg-transparent w-full relative overflow-x-hidden">
        <Navbar />
        <Hero />
        <Proyectos />
        <QuienSoy />
        <Contacto />
        <Footer />
      </main>
    </ScrollProvider>
  );
}