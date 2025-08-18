const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conexión a base de datos (desde app_api)
const connectDB = require('./app_api/config/db');

// Importar rutas que maneja app_server
const projectRoutes = require('./app_server/routes/projectServerRouter');

// Importar rutas que maneja app_api (si es necesario, por ejemplo, para pruebas o desarrollo)
const apiProjectRoutes = require('./app_api/routes/projectApiRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar base de datos
connectDB();

// Middlewares
const allowedOrigins = [
  'http://localhost:5173', // tu frontend local (ajusta el puerto según Vite/CRA)
  'https://jacs.vercel.app' // tu frontend en Vercel
];

app.use(cors({
  origin: function(origin, callback){
    // permitir requests sin origin (como Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)){
      return callback(null, true);
    } else {
      return callback(new Error('❌ No permitido por CORS'));
    }
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Rutas del servidor
app.use('/proyectos', projectRoutes);

// Rutas de la API (opcional, si necesitas exponer la API para pruebas o desarrollo)
app.use('/api', apiProjectRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🚀 Backend de JACS corriendo perfectamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto:${PORT}`);
});
