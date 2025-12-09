// app_api/controllers/projectController.js
const Project = require('../models/Project');

// GET /api/proyectos
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().lean();

    // Si quieres, puedes mapear solo para quitar campos internos de Mongoose
    const mapped = projects.map((p) => ({
      _id: p._id,
      title: p.title,             // { en: "...", es: "..." }
      shortLabel: p.shortLabel,
      description: p.description, // { en: "...", es: "..." }
      image: p.image,
      github: p.github,
      demo: p.demo,
      technologies: p.technologies,
      createdAt: p.createdAt,
    }));

    res.json(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los proyectos backend" });
  }
};

// POST /api/proyectos
const createProject = async (req, res) => {
  try {
    // Espera body con title.{es,en}, description.{es,en}, etc.
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Error al guardar el proyecto",
      details: error.message,
    });
  }
};

module.exports = {
  getAllProjects,
  createProject,
};
