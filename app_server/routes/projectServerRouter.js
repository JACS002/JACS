// app_server/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const {getAllProjects, createProject} = require('../controllers/projectServerController');

// Listar proyectos
router.get('/', getAllProjects);

// Crear proyecto
router.post('/', createProject);

module.exports = router;
