// ============================================================================
// src/components/ProjectModal.jsx
// -----------------------------------------------------------------------------
// Modal de detalles de proyecto usado en la sección "Proyectos".
// Se muestra cuando el usuario hace clic en una Card.
//
// FUNCIONALIDADES:
//  - Deshabilita el scroll del body mientras el modal está abierto
//  - Cierra al hacer clic fuera del contenido
//  - Cierra con la tecla Escape
//  - Soporta transiciones de entrada/salida
//  - Presenta información bilingüe (EN/ES)
//  - Colorea las tecnologías mediante techColors
//  - Incluye botones dinámicos para GitHub y Demo
//
// Este componente se desmonta completamente cuando no hay proyecto seleccionado.
// ============================================================================

import styles from "./styles/Proyectos.module.css";
import techColors from "../utils/techColors";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

// -----------------------------------------------------------------------------
// Helper para campos bilingües (title, description)
// Soporta tanto objetos {es, en} como strings simples por compatibilidad.
// -----------------------------------------------------------------------------
const getLocalizedField = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field; // si ya viene como texto directo
  if (lang === "es") return field.es || field.en || "";
  return field.en || field.es || "";
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function ProjectModal({ project, onClose, lang = "en" }) {
  const [closing, setClosing] = useState(false);

  // Si no hay proyecto seleccionado, no renderizar el modal
  if (!project) return null;

  // Campos traducidos
  const localizedTitle = getLocalizedField(project.title, lang);
  const localizedDescription = getLocalizedField(project.description, lang);

  // ---------------------------------------------------------------------------
  // EFECTO: Bloquear scroll del body y añadir listener para ESC
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // bloquear scroll del body
    document.body.style.overflow = "hidden";

    // permitir cerrar con tecla Escape
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // cleanup
    return () => {
      document.body.style.overflow = ""; // restaurar scroll
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // FUNCIÓN: cierre con animación
  // ---------------------------------------------------------------------------
  const handleClose = () => {
    setClosing(true); // activa clase fadeOut
    setTimeout(() => {
      onClose(); // desmonta el modal después de la animación
    }, 300); // duración de fadeOut en CSS
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    // Fondo semitransparente del modal (clic para cerrar)
    <div
      className={`${styles.modalBackdrop} ${
        closing ? styles.fadeOut : styles.fadeIn
      }`}
      onClick={handleClose}
    >
      {/* Contenedor principal del modal (evita cerrar cuando se hace clic dentro) */}
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón X para cerrar */}
        <button
          className={styles.modalClose}
          onClick={handleClose}
          aria-label={lang === "es" ? "Cerrar" : "Close"}
        >
          <span aria-hidden="true">×</span>
        </button>

        {/* Grid responsivo del modal */}
        <div className={styles.modalGrid}>
          
          {/* ------------------------------------------------------------------- */}
          {/* LADO IZQUIERDO — IMAGEN, TECH STACK, BOTONES                       */}
          {/* ------------------------------------------------------------------- */}
          <div className={styles.modalLeft}>
            {/* Imagen del proyecto */}
            <div className={styles.modalImageWrapper}>
              <img
                src={project.image}
                alt={localizedTitle}
                className={styles.modalImage}
              />
            </div>

            {/* Lista de tecnologías (colores dinámicos) */}
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

            {/* Botones de GitHub y Demo (solo si existen) */}
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

          {/* ------------------------------------------------------------------- */}
          {/* LADO DERECHO — TÍTULO + DESCRIPCIÓN                                */}
          {/* ------------------------------------------------------------------- */}
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
