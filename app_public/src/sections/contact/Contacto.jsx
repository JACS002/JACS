import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../context/LanguageProvider";
import {
  Lightbulb,
  Satellite,
  Rocket,
  Globe,
  Send,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  const steps = [
    {
      id: 1,
      label: "Phase 01",
      icon: <Lightbulb size={24} className="text-secondary" />,
      title: t("contact.s1.title"),
      text: t("contact.s1.text"),
    },
    {
      id: 2,
      label: "Phase 02",
      icon: <Satellite size={24} className="text-primary" />,
      title: t("contact.s2.title"),
      text: t("contact.s2.text"),
    },
    {
      id: 3,
      label: "Phase 03",
      icon: <Rocket size={24} className="text-secondary" />,
      title: t("contact.s3.title"),
      text: t("contact.s3.text"),
    },
    {
      id: 4,
      label: "Phase 04",
      icon: <Globe size={24} className="text-primary" />,
      title: t("contact.s4.title"),
      text: t("contact.s4.text"),
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animar Header
      gsap.from(".contact-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 80%",
        },
      });

      // Animar Pasos del Timeline y Línea
      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });

      // Animar Tarjeta Final
      gsap.from(".contact-card-final", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".contact-card-final",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Glows (Ambiental) */}
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER (Estilo Unificado) */}
      <div className="contact-header max-w-4xl mx-auto text-center mb-24 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#38bdf8]" />
          <span className="text-xs font-mono uppercase tracking-widest text-primary/80">
            {t("contact.tag")}
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight">
          {t("contact.title")}
        </h2>

        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed font-light">
          {t("contact.p1")}
        </p>
      </div>

      {/* TIMELINE GRID */}
      <div className="max-w-6xl mx-auto relative z-10 text-slate-300">
        {/* Línea Central (Solo Desktop) - Haz de luz */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent shadow-[0_0_15px_rgba(56,189,248,0.2)]" />

        <div className="flex flex-col gap-12 md:gap-24">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`timeline-item flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Contenido (Tarjeta Cyber-HUD) */}
              <div className="flex-1 w-full">
                <div className="group p-8 rounded-[2rem] border border-white/10 bg-[#020617]/80 backdrop-blur-xl hover:border-primary/50 hover:bg-[#020617]/90 transition-all duration-500 relative overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(56,189,248,0.1)]">
                  {/* Marcadores HUD */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20 group-hover:border-primary transition-colors" />
                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20 group-hover:border-primary transition-colors" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20 group-hover:border-primary transition-colors" />
                    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20 group-hover:border-primary transition-colors" />
                  </div>

                  {/* Header Card */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white group-hover:scale-110 group-hover:text-primary transition-all duration-300 shadow-inner">
                      {step.icon}
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-black/40">
                      {step.label}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base">
                    {step.text}
                  </p>
                </div>
              </div>

              {/* Conector Central (Solo visual) */}
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-5 h-5 rounded-full bg-[#020617] border-2 border-primary shadow-[0_0_20px_rgba(56,189,248,0.8)] z-10 relative">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                </div>
                <div className="md:hidden absolute top-[-60px] bottom-[-60px] w-[1px] bg-white/10" />
              </div>

              {/* Espacio vacío para equilibrar grid en desktop */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA / CONTACT CARD — Premium */}
      <div
        id="contact-cta"
        className="mt-32 max-w-3xl mx-auto relative z-10 contact-card-final"
      >
        {/* Outer gradient border — cyan→purple sweep */}
        <div className="relative rounded-[2.5rem] p-[1px] bg-gradient-to-br from-primary/50 via-purple-500/20 to-primary/10 overflow-hidden shadow-[0_0_100px_rgba(56,189,248,0.12)]">
          <div className="relative rounded-[calc(2.5rem-1px)] bg-gradient-to-br from-slate-950 via-[#020617] to-indigo-950/60 backdrop-blur-3xl overflow-hidden text-center group px-6 py-14 md:px-16 md:py-20">
            {/* — Aurora top-right (cyan) — */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-[90px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-1000" />
            {/* — Aurora bottom-left (purple) — */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-600/25 transition-colors duration-1000" />
            {/* — Aurora top-left secondary (faint) — */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />

            {/* — Dot grid mesh — */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />

            {/* — Noise grain — */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            {/* — Corner HUD marks — */}
            <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-primary/30" />
            <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-primary/30" />
            <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-primary/30" />
            <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-primary/30" />

            {/* — Content — */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Icon with aurora rings */}
              <div className="relative flex items-center justify-center mb-10">
                {/* Outer ring */}
                <div className="absolute w-32 h-32 rounded-full border border-primary/15 animate-[spin_12s_linear_infinite]" />
                {/* Middle ring dashed */}
                <div className="absolute w-24 h-24 rounded-full border border-dashed border-white/10 animate-[spin_8s_linear_infinite_reverse]" />
                {/* Glow blur */}
                <div className="absolute w-20 h-20 rounded-full bg-primary/15 blur-2xl animate-pulse" />
                {/* Icon circle */}
                <div className="relative w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.2)] group-hover:shadow-[0_0_70px_rgba(56,189,248,0.4)] transition-all duration-700 z-10">
                  <Send
                    size={28}
                    className="text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                  />
                </div>
              </div>

              {/* Transmission label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[1px] bg-primary/40" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/70">
                  Open Channel
                </span>
                <span className="w-8 h-[1px] bg-primary/40" />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-white">
                {t("contact.s5.title")}
              </h2>

              {/* Subtitle */}
              <p className="text-slate-400 text-base md:text-lg mb-10 max-w-md font-light leading-relaxed">
                {t("contact.s5.text")}
              </p>

              {/* Email CTA button */}
              <a
                href="mailto:joel.cuascota@hotmail.com"
                className="group/btn relative w-full md:w-auto overflow-hidden flex items-center justify-center gap-3 px-6 md:px-10 py-4 rounded-full bg-white text-black font-bold text-sm md:text-base shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(56,189,248,0.4)] hover:scale-[1.03] transition-all duration-300"
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                <Mail size={18} className="shrink-0 relative z-10" />
                <span className="truncate relative z-10">
                  joel.cuascota@hotmail.com
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 relative z-10 group-hover/btn:-rotate-45 transition-transform duration-300"
                />
              </a>

              {/* Separator */}
              <div className="flex items-center gap-4 w-full max-w-xs my-7">
                <span className="flex-1 h-[1px] bg-white/8" />
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                  or find me at
                </span>
                <span className="flex-1 h-[1px] bg-white/8" />
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                <a
                  href="https://github.com/JACS002"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="group/g flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
                >
                  <Github size={18} />
                  <span className="text-xs font-medium hidden sm:inline">
                    GitHub
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/joel-cuascota-b49284308"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="group/l flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all duration-300"
                >
                  <Linkedin size={18} />
                  <span className="text-xs font-medium hidden sm:inline">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
