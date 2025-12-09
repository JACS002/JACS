// src/App.jsx
import { useState } from "react";
import "./App.css";
import LogoIntro from "./pages/LogoIntro";
import Home from "./pages/Home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarBackground from "./components/layout/StarBackground";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <StarBackground />
      <div className="relative min-h-screen overflow-x-hidden">
        {showIntro ? (
          <LogoIntro onComplete={() => setShowIntro(false)} />
        ) : (
          <Home />
        )}
      </div>
    </>
  );
}

export default App;