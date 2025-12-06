// src/components/ProjectModal.jsx
import styles from "./styles/Proyectos.module.css";
import techColors from "../utils/techColors";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

// helper local para campos bilingües
const getLocalizedField = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field; // compat
  if (lang === "es") return field.es || field.en || "";
  return field.en || field.es || "";
};

export default function ProjectModal({ project, onClose, lang = "en" }) {
  const [closing, setClosing] = useState(false);

  if (!project) return null;

  const localizedTitle = getLocalizedField(project.title, lang);
  const localizedDescription = getLocalizedField(project.description, lang);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`${styles.modalBackdrop} ${
        closing ? styles.fadeOut : styles.fadeIn
      }`}
      onClick={handleClose}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modalClose}
          onClick={handleClose}
          aria-label={lang === "es" ? "Cerrar" : "Close"}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.modalGrid}>
          {/* LADO IZQUIERDO */}
          <div className={styles.modalLeft}>
            <div className={styles.modalImageWrapper}>
              <img
                src={project.image}
                alt={localizedTitle}
                className={styles.modalImage}
              />
            </div>

            <div className={styles.modalTechList}>
              {project.technologies?.map((tech, i) => {
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
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.buttonGithub}
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.buttonDemo}
                >
                  {lang === "es" ? "Ver sitio" : "View site"}
                </a>
              )}
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className={styles.modalRight}>
            <h2
              className={`${styles.modalTitle} font-titulos text-2xl md:text-3xl mb-4`}
            >
              {localizedTitle}
            </h2>

            <p
              className={`${styles.modalDescription} font-contenido text-base md:text-lg`}
            >
              {localizedDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
