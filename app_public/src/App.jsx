// src/App.jsx
import { useState } from "react";
import LogoIntro from "./pages/LogoIntro";
import Home from "./pages/Home";
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark">
      {/* Fondo de partículas en toda la app */}
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
