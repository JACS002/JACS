import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useLang } from "../../context/LanguageProvider";

const socialLinks = [
  {
    href: "https://github.com/JACS002",
    label: "GitHub",
    icon: FaGithub,
    glowColor:
      "hover:text-purple-400 hover:drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]",
    hoverBg: "hover:bg-purple-500/10 hover:border-purple-500/30",
  },
  {
    href: "https://www.linkedin.com/in/joel-cuascota-b49284308",
    label: "LinkedIn",
    icon: FaLinkedin,
    glowColor:
      "hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]",
    hoverBg: "hover:bg-blue-500/10 hover:border-blue-500/30",
  },
  {
    href: "mailto:joel.cuascota@hotmail.com",
    label: "Email",
    icon: HiOutlineMail,
    glowColor:
      "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
    hoverBg: "hover:bg-cyan-500/10 hover:border-cyan-500/30",
  },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 select-none overflow-hidden">
      {/* Separador Superior — Gradiente de luz */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" />

      {/* Halo de fondo ambiental */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Fila Principal: Marca + Disponibilidad */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Marca JACS.DEV */}
          <div className="text-center md:text-left">
            <p className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              JACS.DEV
            </p>
            <p className="text-slate-400 text-sm font-light mt-1 font-mono tracking-wider">
              Full Stack Engineer
            </p>
          </div>

          {/* Tagline */}
          <p className="text-slate-400 text-sm md:text-base font-light italic max-w-xs text-center leading-relaxed">
            "{t("footer.tagline")}"
          </p>

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-md">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span className="text-green-400 text-xs font-medium tracking-widest uppercase font-mono">
              {t("about.v2.available")}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Iconos Sociales */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map(
            ({ href, label, icon: Icon, glowColor, hoverBg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`group flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-slate-400 text-sm font-medium transition-all duration-300 ${glowColor} ${hoverBg} hover:scale-105`}
              >
                <Icon size={18} className="transition-all duration-300" />
                <span className="hidden sm:inline tracking-wide">{label}</span>
              </a>
            ),
          )}
        </div>

        {/* Copyright */}
        <p className="text-center text-slate-600 text-xs font-mono tracking-widest">
          <span className="text-slate-500">──</span>
          {"  "}© {year} JACS — {t("footer.credit")}
          {"  "}
          <span className="text-slate-500">──</span>
        </p>
      </div>
    </footer>
  );
}
