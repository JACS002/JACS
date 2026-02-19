import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../context/LanguageProvider";
import imgBloggenAI from "../../assets/icons/bloggen-ai.webp";
import imgCenespe from "../../assets/icons/cenespe-industrias.png";
import imgTradingML from "../../assets/icons/tradingml-pipeline.webp";
import {
  Github,
  ExternalLink,
  Server,
  Database,
  Cpu,
  Zap,
  Search,
  Layers,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SpaceGallery() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  // --- DATOS DINÁMICOS CON TRADUCCIONES ---
  const projectsData = useMemo(
    () => [
      {
        id: "boman",
        title: t("projects.boman.title"),
        type: t("projects.boman.type"),
        role: t("projects.boman.role"),
        stack: ["Next.js 16", "NestJS", "PostgreSQL"],
        metrics: [
          {
            label: t("projects.boman.m1"),
            value: "90%",
            icon: <Server size={14} />,
          },
          {
            label: t("projects.boman.m2"),
            value: "SSG + ISR",
            icon: <Zap size={14} />,
          },
        ],
        desc: t("projects.boman.desc"),
        links: { live: null, github: null },
        color: "from-primary/20 to-primary/5",
        status: "dev",
      },
      {
        id: "ai-blog",
        title: t("projects.aiblog.title"),
        type: t("projects.aiblog.type"),
        role: t("projects.aiblog.role"),
        stack: ["React", "Django", "Llama 3 (70B)"],
        metrics: [
          {
            label: t("projects.aiblog.m1"),
            value: "<1.5s",
            icon: <Cpu size={14} />,
          },
          {
            label: t("projects.aiblog.m2"),
            value: "Llama 3",
            icon: <Database size={14} />,
          },
        ],
        desc: t("projects.aiblog.desc"),
        links: { live: null, github: "https://github.com/JACS002/BlogGen-ai" },
        color: "from-primary/20 to-primary/5",
        image: imgBloggenAI,
      },
      {
        id: "trading-ml",
        title: t("projects.trade.title"),
        type: t("projects.trade.type"),
        role: t("projects.trade.role"),
        stack: ["Python", "XGBoost", "Docker"],
        metrics: [
          {
            label: t("projects.trade.m1"),
            value: "<100ms",
            icon: <Zap size={14} />,
          },
          {
            label: t("projects.trade.m2"),
            value: "End-to-End",
            icon: <Layers size={14} />,
          },
        ],
        desc: t("projects.trade.desc"),
        links: { live: null, github: "https://github.com/JACS002/TradingML" },
        color: "from-primary/20 to-primary/5",
        image: imgTradingML,
      },
      {
        id: "cenespe",
        title: t("projects.cenespe.title"),
        type: t("projects.cenespe.type"),
        role: t("projects.cenespe.role"),
        stack: ["Node.js", "MongoDB", "Express"],
        metrics: [
          {
            label: t("projects.cenespe.m1"),
            value: "Search",
            icon: <Search size={14} />,
          },
          {
            label: t("projects.cenespe.m2"),
            value: "99.9%",
            icon: <Server size={14} />,
          },
        ],
        desc: t("projects.cenespe.desc"),
        links: { live: "https://www.cenespeindustrias.com/", github: null },
        color: "from-primary/20 to-primary/5",
        image: imgCenespe,
      },
      {
        id: "car",
        title: t("projects.car.title"),
        type: t("projects.car.type"),
        role: t("projects.car.role"),
        stack: ["React", "Django", "IBM Cloud"],
        metrics: [
          {
            label: t("projects.car.m1"),
            value: "Microsvcs",
            icon: <Layers size={14} />,
          },
          {
            label: t("projects.car.m2"),
            value: "Watson NLU",
            icon: <Cpu size={14} />,
          },
        ],
        desc: t("projects.car.desc"),
        links: {
          live: null,
          github: "https://github.com/JACS002/IBM-fullstack_developer_capstone",
        },
        color: "from-primary/20 to-primary/5",
      },
    ],
    [t],
  );

  // --- GSAP HORIZONTAL SCROLL LOGIC ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const getScrollAmount = () =>
        -(container.scrollWidth - window.innerWidth);

      const tween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projectsData]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Fondo Decorativo Estático */}
      <div className="absolute top-8 left-8 md:top-12 md:left-20 z-20 pointer-events-none mix-blend-difference">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_15px_#38bdf8]"></span>
          <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
            {t("projects.missionLog")}
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight pb-2">
          {t("projects.sectionTitle")}
        </h2>
      </div>

      {/* Contenedor Horizontal Largo */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex items-center px-10 md:px-32 gap-10 md:gap-24 w-max"
      >
        {/* Intro Card */}
        <div className="w-[80vw] md:w-[400px] shrink-0 text-slate-400 font-light text-xl md:text-2xl flex flex-col justify-center h-[60vh] backdrop-blur-md rounded-3xl p-8 border border-white/10 bg-white/[0.02] shadow-xl">
          <p className="leading-relaxed border-l-2 border-white/20 pl-6 drop-shadow-md">
            {t("projects.scrollHint")}
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm font-mono text-slate-500 animate-pulse">
            <span className="text-2xl">→</span> {t("projects.scrollCta")}
          </div>
        </div>

        {/* MAPEO DE PROYECTOS */}
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} t={t} />
        ))}

        {/* Outro / Call to Action */}
        <div className="w-[80vw] md:w-[500px] shrink-0 flex flex-col justify-center items-start pl-10 md:pl-20 border-l border-white/5 h-[60vh] backdrop-blur-md rounded-r-3xl bg-gradient-to-l from-black/40 to-transparent gap-8">
          {/* Título */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary/50" />
              {t("projects.outroLabel") || "Next Step"}
            </p>
            <h3 className="text-4xl md:text-5xl text-white font-bold max-w-sm leading-tight tracking-tight text-balance pb-1">
              {t("projects.outroTitle")}
            </h3>
          </div>

          {/* Botón CTA → lleva a #contact */}
          <button
            onClick={() =>
              document
                .getElementById("contact-cta")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-primary hover:text-white hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:scale-105 active:scale-95"
          >
            {t("projects.contactBtn")}
            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

// --- CARD CON DISEÑO "CYBER-HUD" (Alta Ingeniería - High Contrast) ---
function ProjectCard({ project, index, t }) {
  return (
    <div className="group relative w-[85vw] md:w-[900px] h-[65vh] md:h-[600px] shrink-0 rounded-[2rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] border border-white/15 hover:border-primary/50 bg-[#020617]/90 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_0_50px_rgba(56,189,248,0.2)]">
      {/* 1. LAYER: FONDO & AMBIENTE TÉCNICO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradiente base sutil */}
        <div
          className={`absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-bl ${project.color} opacity-10 group-hover:opacity-20 blur-[120px] transition-all duration-1000`}
        />

        {/* Grid Pattern (Solo visible en hover) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 mask-image-gradient-b" />

        {/* Ruido Pixelado */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* 2. LAYER: MARCADORES HUD (Esquinas) */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/30 opacity-50 group-hover:border-primary transition-colors duration-500" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/30 opacity-50 group-hover:border-primary transition-colors duration-500" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/30 opacity-50 group-hover:border-primary transition-colors duration-500" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/30 opacity-50 group-hover:border-primary transition-colors duration-500" />

      {/* 3. LAYER: CONTENIDO */}
      <div className="absolute inset-0 flex flex-col md:flex-row relative z-10 p-2">
        {/* LEFT COLUMN: INFO TÉCNICA */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          <div>
            {/* Header: ID & Status */}
            <div className="flex items-center gap-3 mb-6 opacity-80">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm transition-colors ${
                  project.status === "dev"
                    ? "bg-amber-500/10 border-amber-500/30 group-hover:border-amber-400/50"
                    : "bg-white/5 border-white/10 group-hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full animate-pulse shadow ${
                    project.status === "dev"
                      ? "bg-amber-400 shadow-amber-400/50"
                      : "bg-primary shadow-[0_0_10px_#38bdf8]"
                  }`}
                />
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest ${
                    project.status === "dev"
                      ? "text-amber-400/90"
                      : "text-primary/80"
                  }`}
                >
                  {project.status === "dev" ? "In Development" : project.type}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 tracking-widest ml-auto">
                SYS-ID: 0{index + 1}
              </span>
            </div>

            {/* Título Responsive con Efecto Hover */}
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-snug tracking-tight pb-1 text-balance group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80 transition-all duration-500">
              {project.title}
            </h3>

            {/* Descripción */}
            <p className="text-slate-300 text-sm md:text-lg leading-relaxed font-light border-l border-white/10 pl-5 mb-8 max-w-md group-hover:border-primary/50 transition-colors duration-500 line-clamp-4 md:line-clamp-none">
              {project.desc}
            </p>

            {/* Data Modules (Metrics) */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="relative group/metric p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-primary/20 transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-primary/0 group-hover/metric:bg-primary transition-colors duration-300" />

                  <div className="flex items-center gap-2 text-slate-400 mb-1 group-hover/metric:text-primary transition-colors">
                    {metric.icon}
                    <span className="text-[9px] font-mono uppercase tracking-wider truncate">
                      {metric.label}
                    </span>
                  </div>
                  <span className="text-lg md:text-xl font-bold text-white tracking-tight truncate">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer: Stack Chips */}
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-xs md:text-sm font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: IMAGEN O VISUAL ABSTRACTO */}
        <div className="w-full md:w-1/2 relative hidden md:flex items-center justify-center border-l border-white/5 overflow-hidden">
          {project.image ? (
            /* --- IMAGEN DEL PROYECTO --- */
            <>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              {/* Vignette para que se integre suavemente */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent pointer-events-none" />
            </>
          ) : (
            /* --- FALLBACK: VISUAL ABSTRACTO --- */
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />
              <div className="w-[90%] h-[90%] border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="w-[70%] h-[70%] border border-white/5 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>
          )}

          {/* Hover Actions Overlay (siempre encima) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-primary text-black font-bold hover:scale-110 hover:shadow-[0_0_30px_#38bdf8] transition-all flex items-center gap-2"
              >
                <ExternalLink size={18} /> {t("projects.live")}
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border border-white/50 text-white hover:bg-white/10 flex items-center gap-2 backdrop-blur-md"
              >
                <Github size={18} /> {t("projects.codebase")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
