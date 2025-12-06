// app_api/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  createProject
} = require('../controllers/projectApiController');

// Ruta para obtener todos los proyectos
router.get('/proyectos', getAllProjects);

// Ruta para crear un nuevo proyecto
// router.post('/proyectos', createProject);

module.exports = router;
