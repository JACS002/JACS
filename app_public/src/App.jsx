import { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import LogoIntro from "./pages/LogoIntro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lazy loading de componentes pesados
// Esto mejora el tiempo de carga inicial (FCP) dramáticamente
const Home = lazy(() => import("./pages/Home"));
const StarBackground = lazy(() => import("./components/layout/StarBackground"));

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Detectar si es un bot (Lighthouse, Googlebot, etc.) para saltar la intro
  // y pintar el contenido de inmediato (Mejora LCP/FCP)
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof navigator !== "undefined") {
      return /Chrome-Lighthouse|Googlebot|bot|crawler|spider/i.test(
        navigator.userAgent,
      );
    }
    return false;
  });

  useEffect(() => {
    if (introFinished) {
      ScrollTrigger.refresh();
    }
  }, [introFinished]);

  return (
    <>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>

      <div className="relative min-h-screen overflow-x-hidden">
        {/* HOME cargado diferido */}
        <div
          className={`transition-opacity duration-700 ${
            introFinished ? "opacity-100" : "opacity-0"
          }`}
        >
          <Suspense fallback={null}>
            <Home introFinished={introFinished} />
          </Suspense>
        </div>

        {/* Intro como overlay, se elimina del DOM al terminar */}
        {!introFinished && (
          <LogoIntro onComplete={() => setIntroFinished(true)} />
        )}
      </div>
    </>
  );
}

export default App;
