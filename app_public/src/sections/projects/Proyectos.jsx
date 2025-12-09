// src/components/Proyectos.jsx
import { useEffect, useState, useRef } from "react";
import styles from "./Proyectos.module.css";
import getProjects from "../../utils/getProjects";
import ProjectModal from "./ProjectModal";
import { useLang } from "../../context/LanguageProvider";
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
  const canvasWrapperRef = useRef(null); // 👈 referencia al wrapper del canvas

  // visibilidad viewport (por ahora no se usa, pero lo dejamos listo)
  const [isVisible, setIsVisible] = useState(false);

  // hover desde lista
  const [externalHoverIndex, setExternalHoverIndex] = useState(null);

  // lista simple
  const [showList, setShowList] = useState(false);

  // saber cuándo el sistema 3D está listo
  const [is3DReady, setIs3DReady] = useState(false);

  // detectar mouse en la escena 3D
  const [hasMouse, setHasMouse] = useState(false);

  // saber si ya hubo un drag real dentro del canvas
  const [isDragging, setIsDragging] = useState(false);

  // --------------------------- lógica drag hint ----------------------------
  useEffect(() => {
    if (!hasMouse) return;

    let isDown = false;

    const handlePointerDown = (e) => {
      if (e.pointerType !== "mouse") return;
      // solo consideramos down si empieza dentro del canvas
      if (!canvasWrapperRef.current?.contains(e.target)) return;
      isDown = true;
    };

    const handlePointerMove = (e) => {
      if (!isDown) return;
      if (e.pointerType !== "mouse") return;

      // aquí consideramos que ya hubo un drag real en el canvas
      setIsDragging(true);
      isDown = false;
    };

    const handlePointerUp = () => {
      isDown = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [hasMouse]);
  // ------------------------------------------------------------------------

  const getLocalizedField = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return lang === "es" ? field.es || field.en : field.en || field.es;
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      setIs3DReady(false);

      const data = await getProjects();
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

  // IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 1] }
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
    setExternalHoverIndex(null);
    handleSelectSphere(index);
    setShowList(false);
  };

  const toggleList = () => {
    if (loading || error || projects.length === 0) return;
    setShowList((prev) => {
      const next = !prev;

      if (next && sectionRef.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      if (!next) setExternalHoverIndex(null);

      return next;
    });
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className={styles.section}
    >
      {/* Canvas */}
      <div className={styles.canvasFull} ref={canvasWrapperRef}>
        {/* Loader */}
        {loading && !error && (
          <div className={styles.loaderWrapper}>
            <div className={styles.loaderSpinner} />
            <span
              className={`${styles.loaderText} font-titulos font-bold text-white text-xl sm:text-2xl md:text-3xl`}
            >
              {lang === "es" ? "Cargando proyectos..." : "Loading projects..."}
            </span>
          </div>
        )}

        {/* Canvas 3D */}
        {!loading && !error && projects.length > 0 && (
          <>
            {!is3DReady && (
              <div className={styles.loaderWrapper}>
                <div className={styles.loaderSpinner} />
                <span
                  className={`${styles.loaderText} font-titulos font-bold text-white text-lg sm:text-xl md:text-2xl`}
                >
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
              onAssetsLoaded={() => setIs3DReady(true)}
              onDetectMouse={() => setHasMouse(true)}
            />
          </>
        )}
      </div>

      {/* Título + icono */}
      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <div className={styles.overlayInnerRow}>
            <h1
              className={`${styles.mainTitle} font-titulos font-bold text-4xl md:text-5xl sm:text-3xl`}
            >
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

          {/* 👇 Indicador debajo del título */}
          <div
            className={`
              ${styles.dragIndicatorInline}
              ${
                hasMouse && !isDragging
                  ? ""
                  : styles.dragIndicatorHidden
              }
            `}
          >
            <div className={styles.dragMouse}>
              <div className={styles.dragDot}></div>
            </div>
            <p className={styles.dragHintText}>
              {lang === "es" ? "Arrastra para explorar" : "Drag to explore"}
            </p>
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
            <button
              className={styles.projectListClose}
              onClick={() => {
                setShowList(false);
                setExternalHoverIndex(null);
              }}
            >
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
                  <span className={styles.projectName}>
                    {getLocalizedField(project.title)}
                  </span>
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
            setExternalHoverIndex(null);
          }}
        />
      )}
    </section>
  );
}
