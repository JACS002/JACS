// src/context/ScrollContext.jsx
import { createContext, useContext, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const scrollY = useRef(0);

  // Actualizar scrollY continuamente
  useEffect(() => {
    const updateScroll = () => {
      scrollY.current = window.scrollY || 0;
    };

    updateScroll(); // inicial
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Función pública (tu función original)
  const refreshScroll = useCallback(() => {
    setTimeout(() => {
      console.log("Global ScrollTrigger Refreshing...");
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY, refreshScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};
