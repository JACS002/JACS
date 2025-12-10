import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useLang } from "../../context/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear(); // evita recalcular en cada render

  // estilos base compartidos
  const iconBase =
    "text-gray-300 hover:text-accent transition duration-200 text-2xl focus:outline-none focus:text-accent";

  return (
    <footer className="mt-20 pb-10 pt-14 text-center text-white font-contenido relative select-none">

      {/* Divider luminoso */}
      <div className="w-full h-[1px] bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 mb-8" />

      {/* Frase temática */}
      <p className="font-contenido text-gray-300 mb-6 text-sm md:text-base tracking-wide">
        {t("footer.tagline")}
      </p>

      {/* ICONOS */}
      <div className="flex justify-center gap-8 mb-6">

        {/* GitHub */}
        <a
          href="https://github.com/JACS002"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className={iconBase}
        >
          <FaGithub className="hover:drop-shadow-[0_0_8px_#864cef]" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/joel-cuascota-b49284308"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className={iconBase}
        >
          <FaLinkedin className="hover:drop-shadow-[0_0_8px_#864cef]" />
        </a>

        {/* Email */}
        <a
          href="mailto:joel.cuascota@hotmail.com"
          aria-label="Email"
          className={iconBase}
        >
          <HiOutlineMail className="hover:drop-shadow-[0_0_8px_#864cef]" />
        </a>
      </div>

      {/* Nota final */}
      <p className="font-contenido text-gray-500 text-xs md:text-sm">
        © {year} JACS — {t("footer.credit")}
      </p>
    </footer>
  );
}
