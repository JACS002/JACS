import { useEffect, useRef, useState } from "react";
import styles from "./styles/Proyectos.module.css";
import Card from "./Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import getProjects from "../utils/getProjects";
import ProjectModal from "./ProjectModal"; // <- modal con blur

gsap.registerPlugin(ScrollTrigger);

export default function Proyectos() {
  const [modalOpen, setModalOpen] = useState(false);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const subtitleRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const previousTitle = useRef("");

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
      if (data.length > 0) {
        setSubtitle(data[0].title);
        previousTitle.current = data[0].title;
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      const radius = window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 2.5;
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
          textShadow: "0 0 6px #ff00c8, 0 0 12px #00f0ff, 2px 2px 2px #00f0ff",
          duration: 0.04,
        });
        tl.to(el, {
          x: 4,
          skewX: -12,
          scale: 0.98,
          color: "#00f0ff",
          textShadow: "0 0 4px #00f0ff, 0 0 8px #ff00c8, -2px -2px 2px #ff00c8",
          duration: 0.04,
        });
        tl.to(el, {
          x: -2,
          skewX: 5,
          duration: 0.03,
        });
        tl.to(el, {
          x: 0,
          skewX: 0,
          scale: 1,
          duration: 0.08,
        });
        tl.to(el, {
          color: "#d7c1ff",
          textShadow: "0 0 2px #864cef, 0 0 6px #864cef, 0 0 36px #864cefbf",
          duration: 0.05,
        });
      }

      function positionCards(progress = 0) {
        const adjustedProgress = (progress * totalTravel - 0.80) * 0.75;
        let closestCardIndex = 0;
        let closestDistance = Infinity;

        cardsRef.current.forEach((card, i) => {
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

        if (closestDistance < 300) {
          const currentTitle = projects[closestCardIndex].title;
          if (currentTitle !== previousTitle.current) {
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

          // Actualizar durante el scroll
          window.proyectosStart = self.start;
          window.proyectosEnd = self.end;
        },
      });

      // Inicializar inmediatamente para el Navbar
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
  }, [projects]);

  return (
    <section id="proyectos" className={styles.steps} ref={sectionRef}>
      <div className={styles.cardTitleDynamic}>
        <h1 className={`${styles.mainTitle} text-white font-titulos font-bold text-5xl mb-7 mt-3`}>
          Proyectos
        </h1>
        <h2
          className={`${styles.subtitle} font-contenido font-semibold text-2xl`}
          ref={subtitleRef}
        >
          {subtitle}
        </h2>
      </div>

      <div className={`${styles.scrollDown} scroll-down`} ref={arrowRef}>
        <span className={styles.arrow}></span>
      </div>

      <div className={styles.cards}>
        {projects.map((project, i) => (
          <Card
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            title={project.title}
            imageSrc={project.image}
            technologies={project.technologies}
            onClick={() => {
              window.forceHideNavbar = true;
              setSelectedProject(project);
            }}
          />
        ))}
        <div className={`${styles.card} ${styles.empty}`}></div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            window.forceHideNavbar = false;
            setSelectedProject(null);
          }}
        />
      )}
    </section>
  );
}
