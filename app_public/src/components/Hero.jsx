import { useState } from "react";
import styles from "../components/styles/Hero.module.css";
import LogoNombre from "../assets/icons/LogoNombre";

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="inicio" className={styles.heroSection}>
      <div
        className={styles.logoWrapper}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`${styles.logoContainer} ${hovered ? styles.glow : ""}`}>
          <LogoNombre
            fillColor={hovered ? "#ffffff" : "#a26bf0"} // morado tenue apagado
            strokeColor={hovered ? "#ffffff" : "#a26bf0"}
          />
        </div>

        {/* El reflejo solo se activa con hover */}
        <div className={`${styles.logoReflection} ${hovered ? styles.visible : ""}`}>
          <LogoNombre
            fillColor={hovered ? "#ffffff" : "#a26bf0"}
            strokeColor={hovered ? "#ffffff" : "#a26bf0"}
          />
        </div>
      </div>
    </section>
  );
}
