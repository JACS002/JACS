// src/contexts/LanguageProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // NAVBAR
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About me",
    "nav.contact": "Contact",
    "nav.langLabel": "Change language",

    // HERO
    "hero.title": "Hi, I'm JACS",
    "hero.tagline.fs": "Full stack developer",
    "hero.tagline.dm": "Data mining",
    "hero.p1":
      "I craft modern web experiences, build scalable backends, and turn data into actionable insights through clean engineering and thoughtful design.",
    "hero.p2": "Focused on building intuitive interfaces, efficient systems and solutions that connect ideas with real impact.",
    // ─────────────────────────────────────────────
    // ABOUT / QUIÉN SOY
    "about.title": "About me",

    "about.p1.a": "I’m Joel Cuascota (JACS), a ",
    "about.p1.b": "full stack developer",
    "about.p1.c": " and Computer Science Engineer from the ",
    "about.p1.d": "Universidad San Francisco de Quito (USFQ)",
    "about.p1.e":
      ". I focus on building modern web experiences end to end: from interfaces in React to APIs and backend services with Node.js, Express and MongoDB.",

    "about.p2.a": "Beyond my full stack focus, I also specialize in ",
    "about.p2.b": "data mining",
    "about.p2.c": " and ",
    "about.p2.d": "machine learning",
    "about.p2.e":
      ", applying analysis and modeling to solve problems and design solutions driven by data.",

    "about.p3.a": "Outside the technical world, I enjoy ",
    "about.p3.b": "basketball",
    "about.p3.c": ", ",
    "about.p3.d": "nature",
    "about.p3.e": " and ",
    "about.p3.f": "video games",
    "about.p3.g":
      ". I see myself as a curious and consistent person: I’m always looking to learn new things and improve my skills, whether through personal projects, experimenting with new tools or exploring ideas that push me to grow personally and professionally.",

    "about.p4.a": "Right now I’m expanding my skills in integrating with ",
    "about.p4.b": "APIs",
    "about.p4.c": " and modern architecture patterns. I’m also exploring backend tools like ",
    "about.p4.d": "Spring Boot",
    "about.p4.e": ", and strengthening my background in ",
    "about.p4.f": "data mining and machine learning",
    "about.p4.g":
      ". I work with technologies like ",
    "about.p4.h": "AWS",
    "about.p4.i": " and ",
    "about.p4.j": "Docker",
    "about.p4.k":
      " for deployment, automation and building more scalable and professional systems, always aiming for complete, efficient solutions with a consistent visual identity.",

    // PROJECTS
    "projects.title": "Projects",
    "projects.loading": "Loading projects…",

    // COMMON
    "common.retry": "Retry",

    // CONTACT
    "contact.tag": "Contact",
    "contact.title": "From idea space to something real.",
    "contact.p1":
      "This is the route to work with me: a small space mission from your initial idea to launching something that looks good, works well and is ready to grow.",

    "contact.s1.title": "The idea is born",
    "contact.s1.text":
      "You have a project in mind: a portfolio, a dashboard, an API or something you want to take to the next level.",
    "contact.s2.title": "We define the mission",
    "contact.s2.text":
      "We talk about goals, scope and stack: React, Node.js, Express, MongoDB, data pipelines, ML… whatever it takes.",
    "contact.s3.title": "We launch",
    "contact.s3.text":
      "Design, iterative development and attention to visual details, performance and solution architecture.",
    "contact.s4.title": "We reach orbit",
    "contact.s4.text":
      "Cloud deploy, automation with Docker and AWS, basic monitoring and adjustments based on real feedback.",
    "contact.s5.title": "Send me a signal",
    "contact.s5.text":
      "If you want to work with me or collaborate on an idea, you can email me directly or check out my work.",

    "contact.emailLabel": "Email",
    "contact.socialLabel": "Social",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",

    // FOOTER
    "footer.tagline": "Navigating the digital space, one project at a time.",
    "footer.credit": "Designed and developed by me.",
  },

  es: {
    // NAVBAR
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.about": "Quién soy",
    "nav.contact": "Contacto",
    "nav.langLabel": "Cambiar idioma",

    // HERO
    "hero.title": "Hola, soy JACS",
    "hero.tagline.fs": "Desarrollador full stack",
    "hero.tagline.dm": "Minería de datos",
    "hero.p1":
      "Creo experiencias web modernas, desarrollo backends escalables y transformo datos en información útil mediante ingeniería limpia y diseño bien pensado.",
      "hero.p2": "Enfocado en crear interfaces intuitivas, sistemas eficientes y soluciones que conectan ideas con impacto real.",


    // ─────────────────────────────────────────────
    // ABOUT / QUIÉN SOY
    "about.title": "Quién soy",

    "about.p1.a": "Soy Joel Cuascota (JACS), desarrollador ",
    "about.p1.b": "full stack",
    "about.p1.c": " e Ingeniero en Ciencias de la Computación por la ",
    "about.p1.d": "Universidad San Francisco de Quito (USFQ)",
    "about.p1.e":
      ". Me enfoco en construir experiencias web modernas de principio a fin: desde interfaces en React hasta APIs y servicios backend con Node.js, Express y MongoDB.",

    "about.p2.a": "Además de mi enfoque full stack, también me especializo en ",
    "about.p2.b": "data mining",
    "about.p2.c": " y ",
    "about.p2.d": "machine learning",
    "about.p2.e":
      ", aplicando análisis y modelado de datos para resolver problemas y construir soluciones basadas en información.",

    "about.p3.a": "Fuera del ámbito técnico, disfruto del ",
    "about.p3.b": "básquet",
    "about.p3.c": ", la ",
    "about.p3.d": "naturaleza",
    "about.p3.e": " y los ",
    "about.p3.f": "videojuegos",
    "about.p3.g":
      ". Me considero una persona curiosa y constante: siempre busco aprender cosas nuevas y mejorar mis habilidades, ya sea a través de proyectos personales, experimentando con nuevas herramientas o explorando ideas que me impulsen a crecer personal y profesionalmente.",

    "about.p4.a": "Actualmente sigo ampliando mis habilidades en integración con ",
    "about.p4.b": "APIs",
    "about.p4.c": " y patrones de arquitectura modernos. También estoy explorando herramientas backend como ",
    "about.p4.d": "Spring Boot",
    "about.p4.e": ", y reforzando mis conocimientos en ",
    "about.p4.f": "data mining y machine learning",
    "about.p4.g":
      ". Además, trabajo con tecnologías como ",
    "about.p4.h": "AWS",
    "about.p4.i": " y ",
    "about.p4.j": "Docker",
    "about.p4.k":
      " para el despliegue, automatización y construcción de sistemas más escalables y profesionales, buscando crear soluciones completas, eficientes y con una identidad visual propia.",

    // PROYECTOS
    "projects.title": "Proyectos",
    "projects.loading": "Trayendo proyectos…",

    // Comunes
    "common.retry": "Reintentar",

    // CONTACTO
    "contact.tag": "Contacto",
    "contact.title": "Del espacio de las ideas a algo real.",
    "contact.p1":
      "Esta es la ruta para trabajar conmigo: una pequeña misión espacial desde tu idea inicial hasta lanzar algo que se vea bien, funcione bien y esté lista para crecer.",

    "contact.s1.title": "La idea nace",
    "contact.s1.text":
      "Tienes un proyecto en mente: un portafolio, un dashboard, una API o algo que quieras llevar al siguiente nivel.",
    "contact.s2.title": "Definimos la misión",
    "contact.s2.text":
      "Hablamos de objetivos, alcance y stack: React, Node.js, Express, MongoDB, data pipelines, ML… lo que haga falta.",
    "contact.s3.title": "Lanzamos",
    "contact.s3.text":
      "Diseño, desarrollo iterativo y cuidado por los detalles visuales, rendimiento y arquitectura de la solución.",
    "contact.s4.title": "Entramos en órbita",
    "contact.s4.text":
      "Deploy en la nube, automatización con Docker y AWS, monitoreo básico y ajustes según feedback real.",
    "contact.s5.title": "Envíame una señal",
    "contact.s5.text":
      "Si quieres trabajar conmigo o colaborar en una idea, puedes escribirme directamente o revisar mi trabajo.",

    "contact.emailLabel": "Email",
    "contact.socialLabel": "Redes",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",

    // FOOTER
    "footer.tagline": "Navegando el espacio digital, un proyecto a la vez.",
    "footer.credit": "Diseñado y desarrollado por mí.",
  },
};




const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  // idioma por defecto: inglés
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  };

  const t = (key) => {
    return translations[lang]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
