// Home.jsx
import { useLayoutEffect } from "react"; // Importar useLayoutEffect
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Proyectos from "../components/Proyectos";
import QuienSoy from "../components/QuienSoy";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-transparent w-full relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Proyectos />
      <QuienSoy />
      <Contacto />
      <Footer />
    </main>
  );
}
