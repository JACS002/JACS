import techColors from "../utils/techColors";
import styles from "./styles/Proyectos.module.css";
import { forwardRef } from "react";

const MAX_TECH_TO_SHOW = 5;

const Card = forwardRef(
  ({ title, imageSrc, technologies = [], onClick }, ref) => {
    const visibleTechs = technologies.slice(0, MAX_TECH_TO_SHOW);
    const hasMore = technologies.length > MAX_TECH_TO_SHOW;

    return (
      <div className={styles.card} ref={ref} onClick={onClick}>
        {/* Imagen del proyecto */}
        <div className={styles.cardImg}>
          <img src={imageSrc} alt={title} />
        </div>

        {/* Contenido inferior: título + tecnologías */}
        <div className={styles.cardContent}>
          <p className="font-contenido text-white text-justify text-2xl font-bold">
            {title}
          </p>

          <div className={styles.cardTech}>
            {visibleTechs.map((tech, i) => {
              const color = techColors[tech] || "#cccccc";

              return (
                <span
                  key={i}
                  className={styles.techTag}
                  style={{
                    // Solo pasamos el color como CSS custom property,
                    // el diseño ya lo maneja .techTag en el CSS
                    "--tech-color": color,
                  }}
                >
                  {tech}
                </span>
              );
            })}

            {/* Si hay más de 5 tecnologías → globo con puntos suspensivos */}
            {hasMore && (
              <span
                className={`${styles.techTag} ${styles.techTagMore}`}
              >
                ...
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
