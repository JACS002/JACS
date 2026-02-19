// src/pages/Home.jsx
import { useLayoutEffect } from "react";
import Navbar from "../components/layout/navbar/Navbar";
import Hero from "../sections/hero/Hero";
import Proyectos from "../sections/projects/Proyectos";
import BentoAbout from "../sections/about/BentoAbout";
import Contacto from "../sections/contact/Contacto";
import Footer from "../components/layout/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home({ introFinished }) {
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-transparent w-full relative overflow-x-hidden">
      <Navbar />
      <Hero enableAnimations={introFinished} />

      {/* Nueva Sección Bento Grid (About) */}
      <BentoAbout />

      <Proyectos />
      <Contacto />
      <Footer />
    </main>
  );
}
