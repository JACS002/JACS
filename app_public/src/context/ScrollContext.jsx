// src/context/ScrollContext.jsx
import React, { createContext, useContext, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  
  // Esta es la función maestra. Cualquier componente puede llamarla
  // para pedir que se recalcule el scroll.
  const refreshScroll = useCallback(() => {
    // Usamos un pequeño timeout para asegurar que el DOM ya pintó los cambios
    // antes de que GSAP mida las alturas.
    setTimeout(() => {
      console.log("🔄 Global ScrollTrigger Refreshing...");
      ScrollTrigger.refresh();
    }, 100); 
  }, []);

  return (
    <ScrollContext.Provider value={{ refreshScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};