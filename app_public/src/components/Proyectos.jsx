// src/components/Proyectos.jsx
import { useEffect, useRef, useState } from "react";
import styles from "./styles/Proyectos.module.css";
import Card from "./Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import getProjects from "../utils/getProjects";
import ProjectModal from "./ProjectModal";
import { useLang } from "../context/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Proyectos() {
  const { lang, t } = useLang(); // lang: 'en' | 'es'

  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const subtitleRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const previousTitle = useRef("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // helper para leer title/description bilingües
  const getLocalizedField = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;

    // asumimos { en, es }
    if (lang === "es") return field.es || field.en || "";
    return field.en || field.es || "";
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProjects();
      setProjects(data || []);

      if (data?.[0]?.title) {
        const firstTitle = getLocalizedField(data[0].title);
        setSubtitle(firstTitle);
        previousTitle.current = firstTitle;
      } else {
        setSubtitle("");
        previousTitle.current = "";
      }
    } catch (e) {
      console.error(e);
      setError(
        lang === "es"
          ? "No se pudieron cargar los proyectos. Intenta nuevamente."
          : "Projects could not be loaded. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // primer fetch
  useEffect(() => {
    handleRetry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cuando cambie el idioma y ya tengamos proyectos, actualizamos subtítulo base
  useEffect(() => {
    if (projects.length === 0) return;
    const firstTitle = getLocalizedField(projects[0].title);
    setSubtitle(firstTitle);
    previousTitle.current = firstTitle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      const radius =
        window.innerWidth < 900
          ? window.innerWidth * 7.5
          : window.innerWidth * 2.5;
      const arcAngle = Math.PI * 0.4;
      const startAngle = Math.PI / 2 - arcAngle / 2;
      const totalCards = projects.length;
      const totalTravel = 1 + totalCards / 7.5;

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
            y: -y + radius,
            rotation: -rotation,
            transformOrigin: "center center",
            zIndex: totalCards - i,
          });

          const distanceToCenter = Math.abs(x);
          if (distanceToCenter < closestDistance) {
            closestDistance = distanceToCenter;
            closestCardIndex = i;
          }
        });

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

      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (projects.length + 1)}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          positionCards(self.progress);
          if (self.progress > 0.01) {
            gsap.to(arrowRef.current, { opacity: 0, duration: 0.5 });
          } else {
            gsap.to(arrowRef.current, { opacity: 1, duration: 0.5 });
          }
          window.proyectosStart = self.start;
          window.proyectosEnd = self.end;
        },
      });

      window.proyectosStart = scrollTrigger.start;
      window.proyectosEnd = scrollTrigger.end;

      positionCards(0);

      gsap.to(arrowRef.current, {
        y: 15,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.2,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      window.proyectosStart = null;
      window.proyectosEnd = null;
    };
  }, [projects, lang]);

  return (
    <section id="proyectos" className={styles.steps} ref={sectionRef}>
      <div className={styles.cardTitleDynamic}>
        <h1 className={`${styles.mainTitle} font-titulos text-4xl md:text-5xl font-bold mb-7 mt-3`}>
          {t("projects.title")}
        </h1>
        <h2
          className={`${styles.subtitle} font-contenido font-semibold text-2xl`}
          ref={subtitleRef}
        >
          {subtitle}
        </h2>
      </div>

      {(loading || error) && (
        <div
          className={styles.loaderWrap}
          role="status"
          aria-live="polite"
          aria-busy={loading ? "true" : "false"}
        >
          {loading && (
            <>
              <span className={styles.spinner} aria-hidden="true"></span>
              <p className={styles.loaderText}>{t("projects.loading")}</p>
            </>
          )}
          {error && !loading && (
            <>
              <p className={styles.errorText}>{error}</p>
              <button className={styles.retryBtn} onClick={handleRetry}>
                {t("common.retry")}
              </button>
            </>
          )}
        </div>
      )}

      <div
        className={`${styles.scrollDown} scroll-down`}
        ref={arrowRef}
        style={{ opacity: loading || error ? 0 : 1 }}
      >
        <span className={styles.arrow}></span>
      </div>

      <div className={styles.cards} aria-hidden={loading || !!error}>
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
                window.forceHideNavbar = true;
                setSelectedProject(project);
              }}
            />
          ))}
        {!loading && !error && (
          <div className={`${styles.card} ${styles.empty}`}></div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            window.forceHideNavbar = false;
            setSelectedProject(null);
          }}
          lang={lang}
        />
      )}
    </section>
  );
}
