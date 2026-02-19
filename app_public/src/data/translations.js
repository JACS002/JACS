const translations = {
  en: {
    // NAVBAR
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About me",
    "nav.contact": "Contact",
    "nav.langLabel": "Change language",

    // HERO
    "hero.status": "System Online",
    "hero.scrollHint": "Scroll down",
    "hero.title.p1": "Architecting",
    "hero.title.p2": "Scalable Systems",
    "hero.p1":
      "I craft modern web experiences, build scalable backends, and turn data into actionable insights through clean engineering and thoughtful design.",
    "hero.p2":
      "Focused on building intuitive interfaces, efficient systems and solutions that connect ideas with real impact.",
    // ─────────────────────────────────────────────

    //PORYECTOS
    "projects.dragHint": "Drag to explore",

    // ABOUT (BENTO GRID)
    "about.role": "Full-Stack Engineer",
    "about.subrole": "Specializing in Scalable B2B Platforms & AI",
    "about.available": "Available for Remote Work",
    "about.location": "Quito, Ecuador (GMT-5)",

    "about.card.stack": "Tech Arsenal",
    "about.card.focus": "Core Focus",
    "about.focus.1": "Cloud-Native Arch",
    "about.focus.2": "Generative AI",
    "about.focus.3": "Performance",

    "about.exp.title": "Recent Deployments",
    "about.exp.boman":
      "Architected a hybrid Next.js/NestJS B2B platform with 90% load reduction.",
    "about.exp.cenespe":
      "Digitized a multi-category catalog with SSR & automated SEO.",

    "about.bio":
      "I architect secure, production-grade systems. From optimizing SQL queries to fine-tuning LLM prompts, I bridge the gap between complex data engineering and intuitive user experiences.",

    // ABOUT V2 (Deep Space Bento)
    "about.v2.title": "Mission Profile",
    "about.v2.subtitle": "Designing the invisible engines of the web.",
    "about.v2.role": "Full Stack Engineer",
    "about.v2.available": "AVAILABLE FOR HIRE",
    "about.v2.remote": "Remote Ready",
    "about.v2.reloc": "Quito, EC",
    "about.v2.summary":
      "I specialize in building scalable B2B platforms and integrating Generative AI into real-world applications.",

    "about.v2.stack.title": "Tech Arsenal",
    "about.v2.stack.arch": "Architecture:",
    "about.v2.stack.micro": "Microservices Ready",

    "about.v2.deploy.title": "Latest Deployment",
    "about.v2.deploy.role": "Full-Stack Engineer (Freelance)",
    "about.v2.deploy.quote":
      '"Architected a B2B platform... reducing backend load by ~90%."',

    "about.v2.phil.title": "Engineering Philosophy",
    "about.v2.phil.1.title": "Cloud Native",
    "about.v2.phil.1.desc": "Scalable infrastructure on AWS & Docker.",
    "about.v2.phil.2.title": "Secure Architecture",
    "about.v2.phil.2.desc": "JWT, CSRF protection & hardened APIs.",
    "about.v2.phil.3.title": "AI Integrated",
    "about.v2.phil.3.desc": "LLMs & Agents in production.",

    // PROJECTS SECTION
    "projects.sectionTitle": "Deployments",
    "projects.missionLog": "MISSION LOG",
    "projects.scrollHint":
      "Scrolling through the log of scalable architectures and AI solutions deployed in production.",
    "projects.scrollCta": "SCROLL DOWN TO EXPLORE",
    "projects.outroTitle": "Ready to launch a new mission?",
    "projects.contactBtn": "Initialize Contact",
    "projects.codebase": "Codebase",
    "projects.live": "Live Mission",

    // Project: Boman Electric
    "projects.boman.title": "Boman Electric",
    "projects.boman.type": "Enterprise B2B Platform",
    "projects.boman.role": "Full Stack Architect",
    "projects.boman.desc":
      "Architected a B2B digital platform with custom CMS. Implemented hybrid caching strategies reducing backend load by ~90%.",
    "projects.boman.stack": "Next.js 16, NestJS, Railway",
    "projects.boman.m1": "Load Reduction",
    "projects.boman.m2": "Rendering",

    // Project: AI Blog Generator
    "projects.aiblog.title": "AI Blog Generator",
    "projects.aiblog.type": "SaaS Platform",
    "projects.aiblog.role": "SaaS Engineer",
    "projects.aiblog.desc":
      "Production-ready SaaS generating SEO content using Llama 3 (70B). Engineered a scalable Clean Architecture separating Core AI logic.",
    "projects.aiblog.stack": "React, Django, Docker, Groq",
    "projects.aiblog.m1": "Inference Latency",
    "projects.aiblog.m2": "Model",

    // Project: TradingML
    "projects.trade.title": "TradingML System",
    "projects.trade.type": "FinTech Algorithm",
    "projects.trade.role": "Data Engineer",
    "projects.trade.desc":
      "Deployed a low-latency inference API for real-time market predictions using serialized XGBoost models and time-series validation.",
    "projects.trade.stack": "Python, FastAPI, Scikit-Learn",
    "projects.trade.m1": "API Latency",
    "projects.trade.m2": "Pipeline",

    // Project: Cenespe
    "projects.cenespe.title": "Cenespe Industries",
    "projects.cenespe.type": "E-commerce Ecosystem",
    "projects.cenespe.role": "Full Stack Engineer",
    "projects.cenespe.desc":
      "Digitized a multi-category catalog with automated SEO indexing. Engineered high-performance APIs for complex product lookups.",
    "projects.cenespe.stack": "Node.js, MongoDB, Pug, AWS",
    "projects.cenespe.m1": "Search",
    "projects.cenespe.m2": "Uptime",

    // Project: CarConnect
    "projects.car.title": "CarConnect System",
    "projects.car.type": "Microservices System",
    "projects.car.role": "Microservices Architect",
    "projects.car.desc":
      "Dealership management with decoupled inventory/user systems and IBM Watson NLU for sentiment analysis.",
    "projects.car.stack": "React, Django, Node.js, IBM Cloud",
    "projects.car.m1": "Architecture",
    "projects.car.m2": "AI Analysis",
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
    "hero.status": "Sistema en Línea",
    "hero.scrollHint": "Desliza para explorar",
    "hero.title.p1": "Diseñando",
    "hero.title.p2": "Sistemas Escalables",
    "hero.p1":
      "Creo experiencias web modernas, desarrollo backends escalables y transformo datos en información útil mediante ingeniería limpia y diseño bien pensado.",
    "hero.p2":
      "Enfocado en crear interfaces intuitivas, sistemas eficientes y soluciones que conectan ideas con impacto real.",

    //PORYECTOS
    "projects.dragHint": "Arrastra para navegar",

    // ABOUT (BENTO GRID)
    "about.role": "Full-Stack Engineer",
    "about.subrole": "Especialista en Plataformas B2B y AI",
    "about.available": "Disponible Remoto Global",
    "about.location": "Quito, Ecuador (GMT-5)",

    "about.card.stack": "Arsenal Técnico",
    "about.card.focus": "Enfoque Principal",
    "about.focus.1": "Arq. Cloud-Native",
    "about.focus.2": "Inteligencia Artificial",
    "about.focus.3": "Rendimiento",

    "about.exp.title": "Despliegues Recientes",
    "about.exp.boman":
      "Arquitectura híbrida Next.js/NestJS con reducción del 90% de carga.",
    "about.exp.cenespe":
      "Digitalización de catálogo con SSR y SEO automatizado.",

    "about.bio":
      "Arquitecto sistemas seguros y listos para producción. Desde optimizar queries SQL hasta ajustar prompts de LLMs, conecto ingeniería de datos compleja con experiencias de usuario intuitivas.",
    // PROJECTS SECTION (New Horizontal Scroll)
    "projects.sectionTitle": "Despliegues",
    "projects.missionLog": "Bitácora de Misión",
    "projects.scrollHint":
      "Explorando historial de arquitecturas escalables y soluciones de IA en producción.",
    "projects.scrollCta": "DESLIZA PARA EXPLORAR",
    "projects.outroTitle": "¿Listo para una nueva misión?",
    "projects.contactBtn": "Iniciar Contacto",
    "projects.codebase": "Código Fuente",
    "projects.live": "Ver en Vivo",

    // Project: Boman Electric
    "projects.boman.title": "Boman Electric",
    "projects.boman.type": "Plataforma B2B",
    "projects.boman.role": "Arquitecto Full Stack",
    "projects.boman.desc":
      "Plataforma digital con CMS personalizado. Estrategias de caché híbridas que redujeron la carga del backend en un ~90%.",
    "projects.boman.stack": "Next.js 16, NestJS, Railway",
    "projects.boman.m1": "Carga Reducida",
    "projects.boman.m2": "Renderizado",

    // Project: AI Blog Generator
    "projects.aiblog.title": "Generador Blog IA",
    "projects.aiblog.type": "Plataforma SaaS",
    "projects.aiblog.role": "Ingeniero SaaS",
    "projects.aiblog.desc":
      "SaaS de producción generando contenido SEO con Llama 3 (70B). Arquitectura limpia separando lógica IA de API REST.",
    "projects.aiblog.stack": "React, Django, Docker, Groq",
    "projects.aiblog.m1": "Latencia Inferencia",
    "projects.aiblog.m2": "Modelo",

    // Project: TradingML
    "projects.trade.title": "Sistema TradingML",
    "projects.trade.type": "Algoritmo FinTech",
    "projects.trade.role": "Ingeniero de Datos",
    "projects.trade.desc":
      "API de inferencia de baja latencia para predicciones de mercado en tiempo real usando modelos XGBoost serializados.",
    "projects.trade.stack": "Python, FastAPI, Scikit-Learn",
    "projects.trade.m1": "Latencia API",
    "projects.trade.m2": "Pipeline",

    // Project: Cenespe
    "projects.cenespe.title": "Cenespe Industrias",
    "projects.cenespe.type": "Ecosistema E-commerce",
    "projects.cenespe.role": "Ingeniero Full Stack",
    "projects.cenespe.desc":
      "Digitalización de catálogo multicategoría con indexación SEO automática. APIs de alto rendimiento para búsquedas complejas.",
    "projects.cenespe.stack": "Node.js, MongoDB, Pug, AWS",
    "projects.cenespe.m1": "Búsqueda",
    "projects.cenespe.m2": "Uptime",

    // Project: CarConnect
    "projects.car.title": "Sistema CarConnect",
    "projects.car.type": "Sistema Microservicios",
    "projects.car.role": "Arquitecto Microservicios",
    "projects.car.desc":
      "Gestión de concesionarios con sistemas de inventario y usuarios desacoplados, integrando IBM Watson NLU para análisis de sentimiento.",
    "projects.car.stack": "React, Django, Node.js, IBM Cloud",
    "projects.car.m1": "Arquitectura",
    "projects.car.m2": "Análisis IA",

    // ABOUT V2 (Deep Space Bento)
    "about.v2.title": "Perfil de Misión",
    "about.v2.subtitle": "Diseñando los motores invisibles de la web.",
    "about.v2.role": "Ingeniero Full Stack",
    "about.v2.available": "DISPONIBLE PARA PROYECTOS",
    "about.v2.remote": "Listo para Remoto",
    "about.v2.reloc": "Quito, EC",
    "about.v2.summary":
      "Me especializo en construir plataformas B2B escalables e integrar Inteligencia Artificial, asegurando código robusto y seguro.",

    "about.v2.stack.title": "Arsenal Técnico",
    "about.v2.stack.arch": "Arquitectura:",
    "about.v2.stack.micro": "Lista para Microservicios",

    "about.v2.deploy.title": "Último Despliegue",
    "about.v2.deploy.role": "Ingeniero Full-Stack (Freelance)",
    "about.v2.deploy.quote":
      '"Arquitectura de plataforma B2B... reduciendo la carga del backend en ~90%."',

    "about.v2.phil.title": "Filosofía de Ingeniería",
    "about.v2.phil.1.title": "Nativo en Nube",
    "about.v2.phil.1.desc": "Infraestructura escalable en AWS y Docker.",
    "about.v2.phil.2.title": "Arquitectura Segura",
    "about.v2.phil.2.desc": "Protección JWT, CSRF y APIs blindadas.",
    "about.v2.phil.3.title": "IA Integrada",
    "about.v2.phil.3.desc": "LLMs y Agentes en producción.",

    // PROJECTS OLD (Legacy)
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

export default translations;
