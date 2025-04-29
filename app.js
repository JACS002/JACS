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
app.use(cors());
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
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
