// app_server/controllers/projectServerController.js
const apiRequest = require('../utils/apiRequest');

// GET /proyectos?lang=en|es
const getAllProjects = async (req, res) => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: '/api/proyectos',
      params: { lang: req.query.lang }, // ⬅️ reenviamos el idioma
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Error al obtener proyectos desde API' });
  }
};

// POST /proyectos
const createProject = async (req, res) => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: '/api/proyectos',
      data: req.body,
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: 'Error al crear proyecto desde API' });
  }
};

module.exports = {
  getAllProjects,
  createProject,
};
