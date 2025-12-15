// src/data/projects.js
export const projectsData = [
  {
    _id: "6933ff00c64bd4412f888872",
    title: {
      es: "Portafolio Personal JACS",
      en: "JACS Personal Portfolio"
    },
    shortLabel: "JACS",
    description: {
      es: "Portafolio full-stack desarrollado con React y Vite, respaldado por un backend en Node.js/Express conectado a MongoDB. Incluye animaciones avanzadas con GSAP y ScrollTrigger, efectos 3D con Three.js y React Three Fiber, un sistema dinámico de proyectos, soporte completo para español e inglés y un diseño glassmorphism optimizado para rendimiento y experiencia de usuario.",
      en: "Full-stack portfolio built with React and Vite, powered by a Node.js/Express backend connected to MongoDB. It features advanced GSAP + ScrollTrigger animations, 3D visuals using Three.js and React Three Fiber, a dynamic project system, full Spanish/English localization, and a performance-optimized glassmorphism interface focused on user experience."
    },
    image: "/images/projects/jacs-portfolio.svg",
    github: "https://github.com/JACS002/JACS",
    demo: "https://www.jacs.dev",
    technologies: [
      "React",
      "Vite",
      "TailwindCSS",
      "GSAP",
      "Three.js",
      "React Three Fiber",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose"
    ],
    createdAt: "2025-12-06T00:00:00.000Z"
  },
  {
    _id: "693380a35104c93c052c90f2",
    title: {
      es: "Cenespe Industrias – Plataforma e-commerce",
      en: "Cenespe Industrias – E-commerce platform"
    },
    shortLabel: "Cenespe",
    description: {
      es: "Plataforma e-commerce completa para Cenespe Industrias, con catálogo de productos, carrito persistente y sistema de facturación. Incluye integración con PayPhone, pagos por transferencia, gestión de usuarios con perfiles y bloqueo por intentos fallidos, chatbot para atención al cliente y envío automático de comprobantes por email. Construida con Node.js, Express y MongoDB siguiendo patrón MVC, con validación de datos, rate limiting y SEO optimizado.",
      en: "Full e-commerce platform for Cenespe Industrias, with product catalog, persistent cart and invoicing system. Includes PayPhone integration and bank transfer payments, user management with profiles and lockout on failed attempts, a customer-support chatbot and automatic email receipts. Built with Node.js, Express and MongoDB using an MVC architecture, data validation, rate limiting and SEO-oriented server-side rendering."
    },
    image: "/images/projects/cenespe-industrias.png",
    github: "",
    demo: "https://www.cenespeindustrias.com/",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Pug",
      "Bootstrap",
      "JWT",
      "PayPhone",
      "Nodemailer"
    ],
    createdAt: "2025-12-06T01:02:27.602Z"
  },
  {
    _id: "693382ae5104c93c052c90f5",
    title: {
      es: "Global Print - Sitio corporativo",
      en: "Global Print - Corporate website"
    },
    shortLabel: "GlobalPrint",
    description: {
      es: "Sitio web corporativo para Global Print, diseñado desde cero en Figma en coordinación con el cliente para alinear la estructura visual con su identidad de marca. A partir del diseño se implementó un frontend estático con HTML, CSS y JavaScript, priorizando una navegación clara, una presentación limpia de servicios y un layout totalmente responsive para escritorio y dispositivos móviles. Finalmente se configuró el dominio del cliente y se dejó el sitio listo para funcionar en producción.",
      en: "Corporate website for Global Print, designed from scratch in Figma in close collaboration with the client to match the visual identity of the brand. Based on the approved design, I implemented a static frontend using HTML, CSS and JavaScript, focusing on clear navigation, a clean services layout and a fully responsive experience for desktop and mobile. I also handled the domain configuration and deployment so the site could run smoothly in production."
    },
    image: "/images/projects/global-print.png",
    github: "",
    demo: "https://globalprint.ec/",
    technologies: [
      "Figma",
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    createdAt: "2025-12-06T01:11:10.169Z"
  },
  {
    _id: "693386635104c93c052c90f9",
    title: {
      es: "NYC Taxi Analytics – Pipeline de datos",
      en: "NYC Taxi Analytics – Data pipeline"
    },
    shortLabel: "NYC Analytics",
    description: {
      es: "Pipeline completo de ingeniería de datos y analítica sobre el dataset de taxis de Nueva York (NYC TLC, yellow y green, 2015–2025). El proyecto levanta un entorno de trabajo con Docker Compose y un contenedor Jupyter con Spark, ingesta archivos Parquet a una capa RAW en Snowflake y construye una tabla analítica One Big Table (`analytics.obt_trips`) con variables derivadas como duración del viaje, velocidad promedio y porcentaje de propina. Incluye notebooks con Snowpark / PySpark para ingesta, enriquecimiento, construcción del modelo analítico, controles de calidad de datos, procesos idempotentes y respuestas a más de 20 preguntas de negocio, dejando toda la infraestructura documentada y reproducible.",
      en: "End-to-end data engineering and analytics pipeline built on the NYC TLC taxi trips dataset (yellow and green, 2015–2025). The project uses Docker Compose to spin up a Jupyter + Spark environment, ingests Parquet files into a RAW layer in Snowflake and builds an analytical One Big Table (`analytics.obt_trips`) with derived metrics such as trip duration, average speed and tip percentage. The notebook workflow (Snowpark / PySpark) covers ingestion, enrichment, OBT construction, data quality checks, idempotent loads and answers to 20+ business questions, with a fully documented and reproducible setup."
    },
    image: "/images/projects/nyc-taxi-analytics.webp",
    github: "https://github.com/JACS002/nyc-taxi-analytics-pipeline",
    demo: "",
    technologies: [
      "Python",
      "Docker",
      "Docker Compose",
      "Apache Spark",
      "PySpark",
      "Snowflake"
    ],
    createdAt: "2025-12-06T01:26:59.814Z"
  },
  {
    _id: "693388445104c93c052c90fb",
    title: {
      es: "TaxiFare – Pipeline de ML para tarifas de taxi",
      en: "TaxiFare – ML pipeline for NYC taxi fares"
    },
    shortLabel: "TaxiFare",
    description: {
      es: "Pipeline completo de ciencia de datos para predecir el `total_amount` de viajes de taxi en Nueva York usando el dataset NYC TLC (yellow y green, 2015–2025). El proyecto orquesta Spark para la ingesta masiva, PostgreSQL como capa estructurada con esquemas `raw` y `analytics`, y una One Big Table lista para modelado. Encima de esa OBT se construyen modelos de regresión lineal regularizada (Ridge, Lasso, ElasticNet, SGD) tanto from-scratch con NumPy como con scikit-learn, cuidando el split temporal para evitar data leakage y evaluando el rendimiento con métricas como RMSE, MAE y R².",
      en: "End-to-end machine learning pipeline to predict `total_amount` for NYC taxi trips using the NYC TLC dataset (yellow and green, 2015–2025). The project uses Spark for large-scale ingestion, PostgreSQL as the structured storage layer with `raw` and `analytics` schemas, and a clean One Big Table ready for modeling. On top of that OBT it trains regularized linear models (Ridge, Lasso, ElasticNet, SGD), implemented both from scratch with NumPy and with scikit-learn, enforcing a temporal split to avoid data leakage and evaluating performance with metrics such as RMSE, MAE and R²."
    },
    image: "/images/projects/taxifare-ml-pipeline.webp",
    github: "https://github.com/JACS002/taxifare-ML-pipeline",
    demo: "",
    technologies: [
      "Python",
      "SQL",
      "Apache Spark",
      "PySpark",
      "PostgreSQL",
      "Docker",
      "Docker Compose",
      "Jupyter"
    ],
    createdAt: "2025-12-06T01:35:00.741Z"
  },
  {
    _id: "69338c895104c93c052c90fd",
    title: {
      es: "TradingML – Pipeline de ML para predicción de mercados",
      en: "TradingML – End-to-end ML pipeline for market prediction"
    },
    shortLabel: "TradingML",
    description: {
      es: "Sistema completo de machine learning para trading algorítmico que predice la dirección diaria del mercado a partir de datos OHLCV descargados desde Yahoo Finance. El pipeline integra ingesta automatizada a PostgreSQL (`raw` y `analytics`), construcción de una One Big Table con features técnicas y temporales, entrenamiento y comparación de 7 modelos de clasificación (Logistic Regression, árboles, ensembles, XGBoost, LightGBM) con validación temporal, backtesting de una estrategia con capital simulado y despliegue de una API REST de inferencia en producción usando FastAPI y Docker.",
      en: "End-to-end machine learning system for algorithmic trading that predicts daily market direction from OHLCV data downloaded via Yahoo Finance. The pipeline ingests data into PostgreSQL (`raw` and `analytics` schemas), builds a One Big Table with technical and temporal features, trains and compares 7 classification models (Logistic Regression, tree-based models, ensembles, XGBoost, LightGBM) with time-based validation, runs a backtest with simulated capital, and exposes the final model through a production-ready FastAPI REST API containerized with Docker."
    },
    image: "/images/projects/tradingml-pipeline.webp",
    github: "https://github.com/JACS002/TradingML",
    demo: "",
    technologies: [
      "Python",
      "SQL",
      "PostgreSQL",
      "FastAPI",
      "Docker",
      "Docker Compose",
      "Jupyter"
    ],
    createdAt: "2025-12-06T01:53:13.509Z"
  }
];