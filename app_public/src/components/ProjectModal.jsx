// src/components/ProjectModal.jsx
import styles from "./styles/Proyectos.module.css";
import techColors from "../utils/techColors";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

const getLocalizedField = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return lang === "es" ? field.es || field.en || "" : field.en || field.es || "";
};

export default function ProjectModal({ project, onClose, lang = "en" }) {
  const [closing, setClosing] = useState(false);

  // Si no hay proyecto seleccionado, no renderizar el modal
  if (!project) return null;

  const localizedTitle = getLocalizedField(project.title, lang);
  const localizedDescription = getLocalizedField(project.description, lang);

  // ---------------------------------------------------------------------------
  // EFECTO: Bloquear scroll del body y añadir listener para ESC
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 250); // debe coincidir con la animación de CSS
  };

  return (
    <div
      className={`${styles.modalOverlay} ${
        closing ? styles.modalOverlayClosing : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón X */}
        <button
          className={styles.modalCloseButton}
          onClick={handleClose}
          aria-label={lang === "es" ? "Cerrar" : "Close"}
        >
          <span aria-hidden="true">×</span>
        </button>

        {/* Layout principal */}
        <div className={styles.modalLayout}>
          {/* Lado izquierdo: imagen + tech + botones */}
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
                const color = techColors[tech] || "#a26bf0";
                return (
                  <span
                    key={i}
                    className={styles.techTag}
                    style={{ "--tech-color": color }}
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

          {/* Lado derecho: título + descripción */}
          <div className={styles.modalRight}>
            <p className={styles.modalEyebrow}>
              {lang === "es" ? "Detalle de proyecto" : "Project detail"}
            </p>

            <h2
              className={`${styles.modalTitle} font-titulos`}
            >
              {localizedTitle}
            </h2>

            <p
              className={`${styles.modalDescription} font-contenido`}
            >
              {localizedDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
