import { useState } from "react";
import LogoIntro from "./pages/LogoIntro";
import Home from "./pages/Home";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <LogoIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
