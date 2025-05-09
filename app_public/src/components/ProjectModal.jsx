import styles from "./styles/Proyectos.module.css";
import techColors from "../utils/techColors";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <div className={styles.modalGrid}>
          {/* LADO IZQUIERDO */}
          <div className={styles.modalLeft}>
            <div className={styles.modalImageWrapper}>
              <img src={project.image} alt={project.title} className={styles.modalImage} />
            </div>

            <div className={styles.modalTechList}>
              {project.technologies.map((tech, i) => {
                const color = techColors[tech] || "#ccc";
                return (
                  <span
                    key={i}
                    className={styles.techTag}
                    style={{
                      color,
                      borderColor: `${color}40`,
                      backgroundColor: `${color}1A`,
                    }}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>

            <div className={styles.modalButtons}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className={styles.buttonGithub}>
                  <FaGithub /> GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className={styles.buttonDemo}>
                  Ver Sitio
                </a>
              )}
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className={styles.modalRight}>
            <h2 className="text-3xl font-titulos text-white mb-3">{project.title}</h2>
            <p className="text-white font-contenido leading-relaxed">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
