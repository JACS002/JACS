import techColors from "../utils/techColors";
import styles from "./styles/Proyectos.module.css";
import { forwardRef } from "react";

const Card = forwardRef(({ title, imageSrc, technologies = [], onClick }, ref) => (
  <div className={styles.card} ref={ref} onClick={onClick}>
    <div className={styles.cardImg}>
      <img src={imageSrc} alt={title} />
    </div>
    <div className={styles.cardContent}>
      <p className="font-contenido text-white text-justify text-2xl font-bold">{title}</p>
      <div className={styles.cardTech}>
        {technologies.map((tech, i) => {
          const color = techColors[tech] || "#cccccc";
          return (
            <span
              key={i}
              className={styles.techTag}
              style={{
                color: color,
                borderColor: `${color}40`,
                backgroundColor: `${color}1A`,
              }}
            >
              {tech}
            </span>
          );
        })}
      </div>
    </div>
  </div>
));

export default Card;
