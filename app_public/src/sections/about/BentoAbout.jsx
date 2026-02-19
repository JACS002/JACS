import { useRef, useState } from "react";
import { useLang } from "../../context/LanguageProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  User,
  Cpu,
  Server,
  ShieldCheck,
  Zap,
  Briefcase,
  Terminal,
  Code2,
  Database,
  Globe,
  Layers,
  Send,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTE ELECTRIC CARD CON TILT 3D ---
const ElectricCard = ({
  children,
  className = "",
  glowColor = "from-primary",
}) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calcular rotación (Limitada para que no sea mareante)
    const rotateX = ((y - centerY) / centerY) * -3; // Max 3 grados
    const rotateY = ((x - centerX) / centerX) * 3;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      className={`group relative overflow-hidden rounded-[2rem] bg-[#030712]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-200 ease-out shadow-2xl ${className}`}
    >
      {/* Borde Superior Eléctrico */}
      <div
        className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${glowColor.replace("from-", "")} to-transparent opacity-50 group-hover:opacity-100 group-hover:h-[2px] transition-all duration-500`}
      />

      {/* Fondo Ambiental Sutil */}
      <div
        className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${glowColor} to-transparent blur-[120px] opacity-[0.15] group-hover:opacity-30 transition-opacity duration-700`}
      />

      {/* Ruido */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      <div className="relative z-10 h-full p-8 flex flex-col">{children}</div>
    </div>
  );
};

// --- WIDGET STACK ---
const TechPill = ({ icon: Icon, name, color }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/pill">
    <div className={`p-2 rounded-lg bg-black/40 ${color}`}>
      <Icon size={16} />
    </div>
    <span className="text-sm text-slate-300 font-medium group-hover/pill:text-white transition-colors">
      {name}
    </span>
  </div>
);

export default function BentoAboutV2() {
  const { t } = useLang();
  const containerRef = useRef();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".bento-item");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative z-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Unificado */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="w-16 h-[2px] bg-primary/50 rounded-full" />
              <span className="text-xs font-mono uppercase tracking-widest text-primary">
                System Profile
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight mb-4">
              {t("about.v2.title")}
            </h2>
          </div>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light leading-relaxed text-center md:text-right border-l-2 md:border-l-0 md:border-r-2 border-primary/20 pl-6 md:pl-0 md:pr-6">
            {t("about.v2.subtitle")}
          </p>
        </div>

        {/* BENTO GRID (Electric Layout + 3D Tilt) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto md:auto-rows-[340px]">
          {/* 1. PERFIL (Horizontal Grande) */}
          <ElectricCard
            className="bento-item md:col-span-3"
            glowColor="from-primary"
          >
            <div className="flex flex-col md:flex-row justify-between h-full gap-8">
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4 backdrop-blur-md">
                    <User size={14} className="text-primary" />
                    <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Full Stack Lead
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                    Joel Cuascota
                  </h3>
                  <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary opacity-90">
                    {t("about.v2.role")}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg max-w-2xl font-light">
                    {t("about.v2.summary")}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 font-mono pt-4 border-t border-white/5">
                    <span className="flex items-center gap-2">
                      <Globe size={14} className="text-green-400" /> Remote
                      Ready
                    </span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    <span>Quito, EC (GMT-5)</span>
                  </div>

                  {/* Botón de Contacto */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("contact-cta")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                    }
                    className="mt-4 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_16px_rgba(56,189,248,0.3)] transition-all duration-300 group/contact"
                  >
                    <Send
                      size={12}
                      className="group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5 transition-transform duration-300"
                    />
                    {"Contact me"}
                  </button>
                </div>
              </div>

              {/* Avatar / Visual Reactor (CENTRED FIX) */}
              <div className="w-full md:w-1/3 min-h-[200px] relative flex items-center justify-center bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60" />
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-dashed animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border-2 border-white/10 animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Core Brillo (Absolute para no empujar) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  </div>

                  {/* Icono (Z-10 para estar encima) */}
                  <Code2 size={40} className="text-white relative z-10" />
                </div>
              </div>
            </div>
          </ElectricCard>

          {/* 2. STACK VERTICAL */}
          <ElectricCard
            className="bento-item md:col-span-1 md:row-span-2"
            glowColor="from-secondary"
          >
            <div className="flex flex-col h-full">
              <div className="mb-6 pb-4 border-b border-white/5">
                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                  <Terminal size={18} className="text-secondary" />
                  Stack
                </h4>
              </div>

              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <TechPill
                  icon={Code2}
                  name="React / Next.js"
                  color="text-blue-400"
                />
                <TechPill
                  icon={Server}
                  name="Node.js / NestJS"
                  color="text-green-400"
                />
                <TechPill
                  icon={Database}
                  name="Python / Django"
                  color="text-yellow-400"
                />
                <TechPill
                  icon={Cpu}
                  name="Gen AI / LLMs"
                  color="text-purple-400"
                />
                <TechPill
                  icon={Globe}
                  name="AWS / Cloud"
                  color="text-orange-400"
                />
                <TechPill
                  icon={Layers}
                  name="PostgreSQL"
                  color="text-cyan-400"
                />
              </div>
            </div>
          </ElectricCard>

          {/* 3. LATEST DEPLOYMENT */}
          <ElectricCard
            className="bento-item md:col-span-2"
            glowColor="from-green-500"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold text-lg flex items-center gap-2">
                    <Briefcase size={18} className="text-green-400" />
                    Last Mission
                  </h4>
                  <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
                    COMPLETED
                  </span>
                </div>
                <p className="text-xl md:text-2xl text-slate-200 font-light italic leading-relaxed">
                  "{t("about.v2.deploy.quote")}"
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                  <Zap size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    Performance Reduction
                  </p>
                  <p className="text-slate-400 text-xs uppercase tracking-wide">
                    90% Backend Load
                  </p>
                </div>
              </div>
            </div>
          </ElectricCard>

          {/* 4. CORE PHILOSOPHY */}
          <ElectricCard
            className="bento-item md:col-span-1"
            glowColor="from-cyan-500"
          >
            <div className="h-full flex flex-col">
              <h4 className="text-white font-bold text-lg flex items-center gap-2 mb-4">
                <ShieldCheck size={18} className="text-cyan-400" />
                Core Specs
              </h4>
              <div className="space-y-3 flex-1">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <p className="text-slate-300 text-sm leading-snug">
                      {t(`about.v2.phil.${n}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ElectricCard>
        </div>
      </div>
    </section>
  );
}
