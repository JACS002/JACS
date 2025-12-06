// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./app_api/config/db');
const projectRoutes = require('./app_server/routes/projectServerRouter');
const apiProjectRoutes = require('./app_api/routes/projectApiRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// orígenes permitidos
const allowedOrigins = [
  'http://localhost:5173',      // dev Vite
  'https://jacs.vercel.app',    // frontend en producción
  // 'https://jacs.dev',
];

connectDB();

// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.github.com"],
    },
  },
}));

// Rate limiting para la API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP por ventana
  message: {
    error: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS restringido
app.use(
  cors({
    origin: function (origin, callback) {
      // peticiones tipo curl / server-to-server no traen origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Origen no permitido por CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use('/proyectos', projectRoutes);
app.use('/api', apiLimiter, apiProjectRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend de JACS corriendo perfectamente');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto:${PORT}`);
});
