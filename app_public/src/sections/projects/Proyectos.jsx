// src/components/Proyectos.jsx
import { useEffect, useState, useRef, useCallback } from "react";
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
  const [hasEntered, setHasEntered] = useState(false);


  const sectionRef = useRef(null);
  const canvasWrapperRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [externalHoverIndex, setExternalHoverIndex] = useState(null);
  const [showList, setShowList] = useState(false);

  const [is3DReady, setIs3DReady] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // -------------------------
  // Control limpio del Navbar
  // -------------------------
  const setNavbarVisible = useCallback((visible) => {
    window.dispatchEvent(
      new CustomEvent("navbar-visibility", { detail: { visible } })
    );
  }, []);

  // -------------------------
  // Carga inicial de proyectos
  // -------------------------
  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      setIs3DReady(false);

      const data = await getProjects();
      setProjects(data || []);
      setActiveIndex(0);
    } catch (err) {
      console.error(err);
      setError("Error loading projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRetry();
  }, []);

  // -------------------------
  // Ajustar activeIndex si la cantidad cambia
  // -------------------------
  useEffect(() => {
    if (projects.length > 0 && activeIndex >= projects.length) {
      setActiveIndex(0);
    }
  }, [projects, activeIndex]);

  // -------------------------
  // IntersectionObserver para detectar visibilidad real
  // -------------------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setHasEntered(true);   // marcamos como montado PARA SIEMPRE
            setIsVisible(true);    // visible ahora
          } else {
            setIsVisible(false);   // pero no desmontamos
          }
        });
      },
      { threshold: [0.2] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  // -------------------------
  // Hint de drag solo si usa mouse
  // -------------------------
  useEffect(() => {
    if (!hasMouse) return;

    let isDown = false;

    const handlePointerDown = (e) => {
      if (e.pointerType !== "mouse") return;
      if (!canvasWrapperRef.current?.contains(e.target)) return;
      isDown = true;
    };

    const handlePointerMove = (e) => {
      if (isDown && e.pointerType === "mouse") {
        setIsDragging(true);
        isDown = false;
      }
    };

    const endDrag = () => (isDown = false);

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", endDrag);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", endDrag);
    };
  }, [hasMouse]);

  // -------------------------
  // Selección desde el Canvas
  // -------------------------
  const handleSelectSphere = useCallback(
    (index) => {
      setActiveIndex(index);
      const project = projects[index];
      if (project) {
        setNavbarVisible(false);
        setSelectedProject(project);
      }
    },
    [projects, setNavbarVisible]
  );

  // -------------------------
  // Selección desde lista
  // -------------------------
  const handleSelectFromList = (index) => {
    setExternalHoverIndex(null);
    handleSelectSphere(index);
    setShowList(false);
  };

  // -------------------------
  // Toggle de lista
  // -------------------------
  const toggleList = () => {
    if (loading || error || projects.length === 0) return;

    setShowList((prev) => {
      const next = !prev;

      if (next && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (!next) setExternalHoverIndex(null);

      return next;
    });
  };

  const getLocalizedField = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return lang === "es" ? field.es || field.en : field.en || field.es;
  };

  // -------------------------
  // Render
  // -------------------------
  return (
    <section id="proyectos" ref={sectionRef} className={styles.section}>
      {/* Canvas */}
      <div className={`${styles.canvasFull} ${is3DReady ? styles.canvasReady : ""}`} ref={canvasWrapperRef}>
        {loading && !error && (
          <div className={styles.loaderWrapper}>
            <div className={styles.loaderSpinner} />
            <span className={styles.loaderText}>
              {lang === "es" ? "Cargando proyectos..." : "Loading projects..."}
            </span>
          </div>
        )}

        {hasEntered && !loading && !error && projects.length > 0 && (
          <>
            {!is3DReady && (
              <div className={styles.loaderWrapper}>
                <div className={styles.loaderSpinner} />
                <span className={styles.loaderText}>
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
              onDragStart={() => setIsDragging(true)}
              isVisible={isVisible}
            />
          </>
        )}
      </div>

      {/* Título */}
      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <div className={styles.overlayInnerRow}>
            <h1 className={`${styles.mainTitle} font-titulos font-bold text-4xl md:text-5xl sm:text-3xl`}>
              {t("projects.title")}</h1>
            {!loading && !error && projects.length > 0 && (
              <button className={styles.projectListToggleInline} onClick={toggleList}>
                <FaListUl />
              </button>
            )}
          </div>

          {/* Drag Hint */}
          <div
            className={`${styles.dragIndicatorInline} ${
              hasMouse && !isDragging ? "" : styles.dragIndicatorHidden
            }`}
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

      {/* Lista */}
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
            setNavbarVisible(true);
            setSelectedProject(null);
            setExternalHoverIndex(null);
          }}
        />
      )}
    </section>
  );
}
