// src/components/Proyectos.jsx
// -----------------------------------------------------------------------------
// Sección "Proyectos"
// -----------------------------------------------------------------------------
// Esta sección implementa un carrusel NO convencional creado desde cero:
//   • Las tarjetas se distribuyen a lo largo de un arco circular dinámico.
//   • El usuario controla la posición del arco haciendo scroll.
//   • ScrollTrigger fija (pin) la sección en pantalla mientras ocurre la animación.
//   • El título se actualiza dinámicamente según la tarjeta más centrada.
//   • El subtítulo usa un efecto “glitch” al cambiar.
//   • Incluye modal para ver más detalles del proyecto.
//
// Es una de las partes más técnicas del portfolio y demuestra:
//   – Manipulación avanzada de GSAP + ScrollTrigger
//   – Geometría aplicada (posición angular + rotación por arco)
//   – Estados complejos en React
//   – Animación declarativa sincronizada con scroll
// -----------------------------------------------------------------------------

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles/Proyectos.module.css";
import Card from "./Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import getProjects from "../utils/getProjects";
import ProjectModal from "./ProjectModal";
import { useLang } from "../context/LanguageProvider";
import { useScroll } from "../context/ScrollContext";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function Proyectos() {
  const { lang, t } = useLang();       // idioma actual + traducciones
  const { refreshScroll } = useScroll(); // contexto global para refrescar ScrollTrigger

  // --- Referencias DOM para animación
  const cardsRef = useRef([]);             // referencias a cada tarjeta
  const sectionRef = useRef(null);          // sección completa
  const arrowRef = useRef(null);            // flecha inferior
  const subtitleRef = useRef(null);         // texto dinámico del subtítulo
  const titleContainerRef = useRef(null);   // contenedor del título
  const cardsContainerRef = useRef(null);   // contenedor de las tarjetas

  // --- Estados
  const [projects, setProjects] = useState([]);          // lista de proyectos
  const [subtitle, setSubtitle] = useState("");          // título dinámico según tarjeta más cercana
  const [selectedProject, setSelectedProject] = useState(null); // para el modal
  const previousTitle = useRef("");

  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // UTILIDAD: Obtiene un campo multilenguaje {es, en}
  // ---------------------------------------------------------------------------
  const getLocalizedField = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return lang === "es" ? field.es || field.en : field.en || field.es;
  };

  // ---------------------------------------------------------------------------
  // Cargar proyectos desde backend (primera carga)
  // ---------------------------------------------------------------------------
  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProjects();

      setProjects(data || []);

      // Ajustar subtítulo inicial
      if (data?.[0]?.title) {
        const firstTitle = getLocalizedField(data[0].title);
        setSubtitle(firstTitle);
        previousTitle.current = firstTitle;
      }
    } catch (e) {
      console.error(e);
      setError("Error loading projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { handleRetry(); }, []);

  // ---------------------------------------------------------------------------
  // Actualizar subtítulo si cambia el idioma
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (projects.length === 0) return;
    const firstTitle = getLocalizedField(projects[0].title);
    setSubtitle(firstTitle);
    previousTitle.current = firstTitle;
  }, [lang, projects]);

  // ============================================================================
  // ANIMACIÓN PRINCIPAL CONTROLADA POR SCROLL
  // ============================================================================
  useLayoutEffect(() => {
    // Si no hay datos todavía → salimos
    if (loading || projects.length === 0) return;

    let ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // 1. Cálculos geométricos del arco (responsivo)
      // -----------------------------------------------------------------------
      const radius =
        window.innerWidth < 900
          ? window.innerWidth * 7.5
          : window.innerWidth * 2.5;

      const arcAngle = Math.PI * 0.4;      // longitud del arco visible
      const startAngle = Math.PI / 2 - arcAngle / 2;
      const totalCards = projects.length;
      const totalTravel = 1 + totalCards / 7.5; // progreso real

      // -----------------------------------------------------------------------
      // 2. Animación glitch para el subtítulo dinámico
      // -----------------------------------------------------------------------
      function glitchAnimation() {
        const el = subtitleRef.current;
        if (!el) return;

        const tl = gsap.timeline();
        tl.to(el, {
          x: -4,
          skewX: 15,
          scale: 1.05,
          color: "#ff00c8",
          textShadow:
            "0 0 6px #ff00c8, 0 0 12px #00f0ff, 2px 2px 2px #00f0ff",
          duration: 0.04,
        });
        tl.to(el, {
          x: 4,
          skewX: -12,
          scale: 0.98,
          color: "#00f0ff",
          textShadow:
            "0 0 4px #00f0ff, 0 0 8px #ff00c8, -2px -2px 2px #ff00c8",
          duration: 0.04,
        });
        tl.to(el, { x: -2, skewX: 5, duration: 0.03 });
        tl.to(el, { x: 0, skewX: 0, scale: 1, duration: 0.08 });
        tl.to(el, {
          color: "#d7c1ff",
          textShadow:
            "0 0 2px #864cef, 0 0 6px #864cef, 0 0 36px #864cefbf",
          duration: 0.05,
        });
      }

      // -----------------------------------------------------------------------
      // 3. Posicionamiento dinámico de todas las tarjetas a lo largo del arco
      // -----------------------------------------------------------------------
      function positionCards(progress = 0) {
        const adjustedProgress = (progress * totalTravel - 0.8) * 0.75;

        let closestCardIndex = 0;
        let closestDistance = Infinity;

        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          const normalizedProgress = (totalCards - 1 - i) / totalCards;
          const cardProgress = normalizedProgress + adjustedProgress;

          const angle = startAngle + arcAngle * cardProgress;

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

          gsap.set(card, {
            x,
            y: -y + radius, // ajustamos porque queremos el arco hacia abajo
            rotation: -rotation,
            transformOrigin: "center center",
            zIndex: totalCards - i,
          });

          // Detectar tarjeta más centrada
          const distanceToCenter = Math.abs(x);
          if (distanceToCenter < closestDistance) {
            closestDistance = distanceToCenter;
            closestCardIndex = i;
          }
        });

        // Actualizar subtítulo si cambia tarjeta centrada
        if (closestDistance < 300 && projects[closestCardIndex]) {
          const currentTitle = getLocalizedField(
            projects[closestCardIndex].title
          );

          if (currentTitle && currentTitle !== previousTitle.current) {
            previousTitle.current = currentTitle;
            setSubtitle(currentTitle);
            glitchAnimation();
          }
        }
      }

      // -----------------------------------------------------------------------
      // No queremos fade-in: mantenemos ambos contenedores visibles siempre
      // -----------------------------------------------------------------------
      const animTargets = [
        titleContainerRef.current,
        cardsContainerRef.current,
      ];

      gsap.set(animTargets, { opacity: 1, y: 0 });
      gsap.set(arrowRef.current, { opacity: 1 });

      // =========================================================================
      // 4. TIMELINE PRINCIPAL (ScrollTrigger)
      // =========================================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (projects.length + 1)}`,
          pin: true,
          scrub: true,
          refreshPriority: 5,
          invalidateOnRefresh: true,

          // Cada vez que el usuario hace scroll → recalculamos posiciones
          onUpdate: (self) => {
            positionCards(self.progress);
            window.proyectosStart = self.start;
            window.proyectosEnd = self.end;

            // Mostrar u ocultar la flecha
            if (self.progress > 0.01) {
              gsap.to(arrowRef.current, {
                opacity: 0,
                duration: 0.3,
                overwrite: true,
              });
            } else {
              gsap.to(arrowRef.current, {
                opacity: 1,
                duration: 0.3,
                overwrite: true,
              });
            }
          },
        },
      });

      // A. Espacio de scroll → determina cuánto dura el movimiento del arco
      tl.to({}, { duration: projects.length });

      // B. Fade-out final para transición suave a la siguiente sección
      tl.to(animTargets, {
        opacity: 0,
        y: -100,
        duration: 1,
        ease: "power2.in",
      });

      // Inicializamos la posición de las tarjetas
      positionCards(0);

      // -----------------------------------------------------------------------
      // Flecha animada (rebote continuo)
      // -----------------------------------------------------------------------
      gsap.to(arrowRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.2,
      });
    }, sectionRef);

    // Refresco global de seguridad
    const timer = setTimeout(() => refreshScroll(), 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      window.proyectosStart = null;
      window.proyectosEnd = null;
    };
  }, [projects, lang, loading, refreshScroll]);

  // ============================================================================
  // RENDER DEL COMPONENTE
  // ============================================================================
  return (
    <section id="proyectos" className={styles.steps} ref={sectionRef}>
      
      {/* --------------------------- TÍTULO + SUBTÍTULO --------------------------- */}
      <div ref={titleContainerRef} className={styles.cardTitleDynamic}>
        <h1 className={`${styles.mainTitle} font-titulos text-4xl md:text-5xl font-bold mb-7 mt-3`}>
          {t("projects.title")}
        </h1>

        <h2
          ref={subtitleRef}
          className={`${styles.subtitle} font-contenido font-semibold text-2xl`}
        >
          {subtitle}
        </h2>
      </div>

      {/* --------------------------- LOADING / ERROR ------------------------------ */}
      {(loading || error) && (
        <div className={styles.loaderWrap}>
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      )}

      {/* --------------------------- FLECHA DE SCROLL ----------------------------- */}
      <div
        ref={arrowRef}
        className={`${styles.scrollDown} scroll-down`}
        style={{ opacity: loading || error ? 0 : 1 }}
      >
        <span className={styles.arrow}></span>
      </div>

      {/* --------------------------- TARJETAS DE PROYECTOS ------------------------ */}
      <div ref={cardsContainerRef} className={styles.cards}>
        {!loading &&
          !error &&
          projects.map((project, i) => (
            <Card
              key={project._id || i}
              ref={(el) => (cardsRef.current[i] = el)}
              title={getLocalizedField(project.title)}
              imageSrc={project.image}
              technologies={project.technologies}
              onClick={() => {
                window.forceHideNavbar = true; // oculta navbar mientras modal está abierto
                setSelectedProject(project);
              }}
            />
          ))}
      </div>

      {/* --------------------------- MODAL DE PROYECTO --------------------------- */}
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
