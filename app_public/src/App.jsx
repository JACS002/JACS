// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import LogoIntro from "./pages/LogoIntro";
import Home from "./pages/Home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarBackground from "./components/layout/StarBackground";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    if (introFinished) {
      ScrollTrigger.refresh();
    }
  }, [introFinished]);

  return (
    <>
      <StarBackground />

      <div className="relative min-h-screen overflow-x-hidden">
        {/* HOME siempre montado, pero recibe introFinished */}
        <div
          className={`transition-opacity duration-700 ${
            introFinished ? "opacity-100" : "opacity-0"
          }`}
        >
          <Home introFinished={introFinished} />
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
