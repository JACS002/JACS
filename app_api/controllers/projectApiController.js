// app_api/controllers/projectController.js
const Project = require('../models/Project');

// GET /api/proyectos
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos backend' });
  }
};

// POST /api/proyectos
const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: 'Error al guardar el proyecto', details: error.message });
  }
};

module.exports = {
  getAllProjects,
  createProject
};
