# 🚀 JACS - Portafolio Personal

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.9.0-green.svg)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF.svg)](https://vitejs.dev/)

Un portafolio web dinámico y moderno con efectos visuales avanzados, soporte multiidioma y arquitectura escalable. Desarrollado con tecnologías de vanguardia para ofrecer una experiencia de usuario excepcional.

## Características Destacadas

- **🎨 Interfaz Moderna**: Diseño glassmorphism con efectos visuales 3D
- **🌍 Multiidioma**: Soporte completo para Español e Inglés
- **⚡ Animaciones Fluidas**: Transiciones GSAP con ScrollTrigger
- **💫 Efectos 3D**: Partículas interactivas y sistema planetario
- **📱 Responsive**: Diseño adaptativo para todos los dispositivos
- **🔒 Seguridad**: Implementación completa de medidas de seguridad
- **🚀 Alto Rendimiento**: Optimizado con Vite y React 18

## 🛠️ Tecnologías y Herramientas

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.2.0 | Biblioteca principal para UI |
| **Vite** | 6.3.1 | Build tool y dev server |
| **TailwindCSS** | 3.4.3 | Framework de CSS utilitario |
| **GSAP** | 3.13.0 | Animaciones y transiciones |
| **Three.js** | 0.152.2 | Gráficos 3D y WebGL |
| **React Three Fiber** | 8.13.6 | React renderer para Three.js |
| **React Three Drei** | 9.56.11 | Utilidades para R3F |

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Node.js** | 22.x | Runtime de JavaScript |
| **Express** | 5.1.0 | Framework web |
| **MongoDB** | 6.9.0 | Base de datos NoSQL |
| **Mongoose** | 8.8.4 | ODM para MongoDB |
| **Axios** | 1.9.0 | Cliente HTTP |

### Seguridad
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Helmet** | 8.1.0 | Headers de seguridad |
| **express-rate-limit** | 8.2.1 | Limitación de peticiones |
| **CORS** | 2.8.5 | Control de acceso |

### Desarrollo
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **ESLint** | 9.22.0 | Linter de código |
| **PostCSS** | 8.5.3 | Procesador CSS |
| **Autoprefixer** | 10.4.21 | Prefijos CSS automáticos |
| **Nodemon** | 3.1.9 | Auto-reload en desarrollo |

### Animaciones y Efectos
| Biblioteca | Propósito |
|-----------|-----------|
| **GSAP ScrollTrigger** | Animaciones basadas en scroll |
| **Three.js BufferGeometry** | Geometrías optimizadas 3D |
| **WebGL Shaders** | Efectos visuales personalizados |
| **CSS Modules** | Estilos encapsulados |

## Arquitectura del Proyecto

```
JACS/
├── app.js                      # Servidor principal Express
├── package.json               # Dependencias del servidor
│
├── app_api/                   # API RESTful
│   ├── config/
│   │   └── db.js             # Configuración MongoDB
│   ├── controllers/
│   │   └── projectApiController.js
│   ├── models/
│   │   └── Project.js        # Schema Mongoose
│   └── routes/
│       └── projectApiRouter.js
│
├── app_server/               # Server-side rendering
│   ├── controllers/
│   │   └── projectServerController.js
│   ├── routes/
│   │   └── projectServerRouter.js
│   └── utils/
│       └── apiRequest.js
│
└── app_public/               # Frontend React
    ├── src/
    │   ├── components/       # Componentes React
    │   ├── pages/           # Páginas principales
    │   ├── utils/           # Utilidades
    │   └── assets/          # Recursos estáticos
    ├── public/              # Assets públicos
    ├── dist/                # Build de producción
    └── package.json         # Dependencias frontend
```

## Instalación y Configuración

### Prerrequisitos
- Node.js 22.x
- npm 8.x
- MongoDB instalado y ejecutándose

### 1. Clonar el Repositorio
```bash
git clone https://github.com/JACS002/JACS
cd JACS
```

### 2. Instalar Dependencias del Servidor
```bash
npm install
```

### 3. Instalar Dependencias del Frontend
```bash
cd app_public
npm install
cd ..
```

### 4. Configurar Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```env
# Base de datos
DB_URI=mongodb://localhost:27017/jacs-portfolio

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro

# Entorno
NODE_ENV=development
PORT=3000

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```
<!-- 
### 5. Iniciar MongoDB
```bash
mongod
```

### 6. Ejecutar en Modo Desarrollo

**Terminal 1 - Servidor Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend React:**
```bash
cd app_public
npm run dev
``` -->

<!-- ## Despliegue

### Frontend (Vercel)
```bash
cd app_public
npm run build
vercel --prod
```

### Backend (Railway/Heroku)
```bash
# Configurar variables de entorno en el panel de control
# Subir código al repositorio
git push origin main
``` -->

## Seguridad Implementada

- **Helmet**: Headers de seguridad HTTP
- **Rate Limiting**: Protección contra ataques DDoS
- **CORS**: Control de orígenes permitidos

## Funcionalidades Principales

### Interfaz Visual
- **Hero Section**: Animación de texto con efectos glitch
- **Partículas 3D**: Sistema de partículas interactivo con Three.js
- **Proyectos Rotativos**: Carrusel con animaciones GSAP en arco
- **Efectos Glassmorphism**: Diseño moderno con transparencias

### Internacionalización
- **Cambio de Idioma**: Toggle español/inglés dinámico
- **Persistencia**: Preferencia guardada en localStorage
- **Context API**: Sistema de traducción centralizado
- **Contenido Dinámico**: Textos y metadatos multiidioma

### Responsive Design
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación a tablets y escritorio
- **Touch Gestures**: Interacciones táctiles optimizadas

<!-- ## Scripts Disponibles

### Servidor
```bash
npm start          # Producción
npm run dev        # Desarrollo con nodemon
```

### Frontend
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Preview del build
npm run lint       # Análisis de código
``` -->

## Rendimiento

- **Vite HMR**: Hot Module Replacement ultrarrápido
- **Code Splitting**: Carga bajo demanda
- **Asset Optimization**: Compresión de imágenes y assets
- **Tree Shaking**: Eliminación de código no utilizado
- **Lazy Loading**: Carga diferida de componentes


## 📝 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**JACS** - Desarrollador Full Stack

- 🌐 [Portfolio](https://jacs-portfolio.vercel.app)
- 📧 [Email](mailto:contact@jacs.dev)
- 💼 [LinkedIn](https://linkedin.com/in/jacs-dev)

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!
