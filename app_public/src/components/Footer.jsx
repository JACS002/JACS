import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useLang } from "../context/LanguageProvider";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-20 pb-10 pt-14 text-center text-white font-contenido relative">

      {/* Divider luminoso */}
      <div className="w-full h-[1px] bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 mb-8"></div>

      {/* Frase temática */}
      <p className="text-gray-300 mb-6 text-sm md:text-base tracking-wide">
        {t("footer.tagline")}
      </p>

      {/* ICONOS */}
      <div className="flex justify-center gap-8 mb-6">

        {/* GitHub */}
        <a
          href="https://github.com/JACS002"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-accent transition duration-200 text-2xl"
        >
          <FaGithub className="hover:drop-shadow-[0_0_8px_#864cef]" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/joel-cuascota-b49284308"
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-accent transition duration-200 text-2xl"
        >
          <FaLinkedin className="hover:drop-shadow-[0_0_8px_#864cef]" />
        </a>

        {/* Email */}
        <a
          href="mailto:joel.cuascota@hotmail.com"
          className="text-gray-300 hover:text-accent transition duration-200 text-2xl"
        >
          <HiOutlineMail className="hover:drop-shadow-[0_0_8px_#864cef]" />
        </a>

      </div>

      {/* Nota final */}
      <p className="text-gray-500 text-xs md:text-sm">
        © {new Date().getFullYear()} JACS — {t("footer.credit")}
      </p>
    </footer>
  );
}
