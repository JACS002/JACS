// Home.jsx
import { useLayoutEffect } from "react"; // Importar useLayoutEffect
import Navbar from "../components/layout/navbar/Navbar";
import Hero from "../sections/hero/Hero";
import Proyectos from "../sections/projects/Proyectos";
import QuienSoy from "../sections/about/QuienSoy";
import Contacto from "../sections/contact/Contacto";
import Footer from "../components/layout/Footer";
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
