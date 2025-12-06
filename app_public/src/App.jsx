// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import LogoIntro from "./pages/LogoIntro";
import Home from "./pages/Home";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBackground from "./components/ParticlesBackground";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Recalcula todos los ScrollTrigger cuando cambie el tamaño
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark">
      <ParticlesBackground />

      {showIntro ? (
        <LogoIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
