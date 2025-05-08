// components/Card.jsx
import { forwardRef } from "react";
import styles from "./styles/Proyectos.module.css";

const Card = forwardRef(({ title, imageSrc, technologies = [], onClick }, ref) => (
  <div className={styles.card} ref={ref} onClick={onClick}>
    <div className={styles.cardImg}>
      <img src={imageSrc} alt={title} />
    </div>
    <div className={styles.cardContent}>
      <p className="font-contenido text-white">{title}</p>
      <div className={styles.techIcons}>
        {technologies.map((tech, i) => (
          <span key={i} className={styles.techTag}>{tech}</span>
        ))}
      </div>
    </div>
  </div>
));

export default Card;
