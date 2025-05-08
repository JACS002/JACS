// components/ProjectModal.jsx
import styles from "./styles/Proyectos.module.css";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <img src={project.image} alt={project.title} className={styles.modalImage} />
        <h2 className="text-3xl font-titulos text-white mb-2">{project.title}</h2>
        <p className="text-white font-contenido mb-4">{project.description}</p>
        <div className={styles.modalTechList}>
          {project.technologies.map((tech, i) => (
            <span key={i} className={styles.techTag}>{tech}</span>
          ))}
        </div>
        <div className={styles.modalLinks}>
          {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>}
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Demo</a>}
        </div>
      </div>
    </div>
  );
}
