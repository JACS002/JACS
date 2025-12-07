// src/components/Proyectos.jsx
import { useEffect, useState, useRef } from "react";
import styles from "./styles/Proyectos.module.css";
import getProjects from "../utils/getProjects";
import ProjectModal from "./ProjectModal";
import { useLang } from "../context/LanguageProvider";
import ProjectOrbitsCanvas from "./ProjectOrbitsCanvas";
import { FaListUl } from "react-icons/fa";

export default function Proyectos() {
  const { lang, t } = useLang();

  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // hover desde lista
  const [externalHoverIndex, setExternalHoverIndex] = useState(null);

  // lista simple
  const [showList, setShowList] = useState(false);

  // ✅ nuevo: saber cuándo el sistema 3D (texturas) ya está listo
  const [is3DReady, setIs3DReady] = useState(false);

  const getLocalizedField = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return lang === "es" ? field.es || field.en : field.en || field.es;
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      setIs3DReady(false); // cuando vuelvas a pedir del backend, resetea el 3D

      const data = await getProjects();
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      setProjects(data || []);
      setActiveIndex(0);
    } catch (e) {
      console.error(e);
      setError("Error loading projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRetry();
  }, []);

  useEffect(() => {
    if (projects.length > 0 && activeIndex >= projects.length) {
      setActiveIndex(0);
    }
  }, [projects, activeIndex]);

  // Fade-in section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25);
        });
      },
      { threshold: [0, 0.25, 0.5, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSelectSphere = (index) => {
    setActiveIndex(index);
    const project = projects[index];
    if (project) {
      window.forceHideNavbar = true;
      setSelectedProject(project);
    }
  };

  const handleSelectFromList = (index) => {
    handleSelectSphere(index);
    setShowList(false);
  };

  const toggleList = () => {
    if (loading || error || projects.length === 0) return;
    setShowList((prev) => !prev);
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className={`${styles.section}`}
    >
      {/* Canvas */}
      <div className={styles.canvasFull}>
        {/* 🔹 Loader mientras esperamos al backend */}
        {loading && !error && (
          <div className={styles.loaderWrapper}>
            <div className={styles.loaderSpinner} />
            <span className={`${styles.loaderText} font-titulos font-bold text-3xl text-white`}>
              {lang === "es" ? "Cargando proyectos..." : "Loading projects..."}
            </span>
          </div>
        )}

        {/* 🔹 Canvas 3D, se monta cuando ya hay proyectos */}
        {!loading && !error && projects.length > 0 && (
          <>
            {/* Overlay extra mientras el 3D/texturas se preparan */}
            {!is3DReady && (
              <div className={styles.loaderWrapper}>
                <div className={styles.loaderSpinner} />
                <span className={`${styles.loaderText} font-titulos font-bold text-2xl text-white`}>
                  {lang === "es"
                    ? "Preparando sistema planetario..."
                    : "Preparing 3D system..."}
                </span>
              </div>
            )}

            <ProjectOrbitsCanvas
              projects={projects}
              activeIndex={activeIndex}
              onSelect={handleSelectSphere}
              lang={lang}
              externalHoverIndex={externalHoverIndex}
              // 👇 callback: el canvas avisa cuando las texturas ya están listas
              onAssetsLoaded={() => setIs3DReady(true)}
            />
          </>
        )}
      </div>

      {/* Título + icono */}
      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <div className={styles.overlayInnerRow}>
            <h1 className={`${styles.mainTitle} font-titulos font-bold text-6xl`}>
              {t("projects.title")}
            </h1>

            {!loading && !error && projects.length > 0 && (
              <button
                type="button"
                className={styles.projectListToggleInline}
                onClick={toggleList}
              >
                <FaListUl />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Panel de lista */}
      {showList && (
        <div className={styles.projectListPanel}>
          <div className={styles.projectListHeader}>
            <span className={styles.projectListTitle}>
              {lang === "es" ? "Proyectos" : "Projects"}
            </span>
            <button className={styles.projectListClose} onClick={() => setShowList(false)}>
              ×
            </button>
          </div>

          <ul className={styles.projectListItems}>
            {projects.map((project, index) => (
              <li key={index}>
                <button
                  className={`${styles.projectListItem} ${
                    index === activeIndex ? styles.projectListItemActive : ""
                  }`}
                  onMouseEnter={() => setExternalHoverIndex(index)}
                  onMouseLeave={() => setExternalHoverIndex(null)}
                  onClick={() => handleSelectFromList(index)}
                >
                  <span className={styles.projectBullet}>{index + 1}</span>
                  <span className={styles.projectName}>{getLocalizedField(project.title)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          lang={lang}
          onClose={() => {
            window.forceHideNavbar = false;
            setSelectedProject(null);
          }}
        />
      )}
    </section>
  );
}
