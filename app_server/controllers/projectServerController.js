const apiRequest = require('../utils/apiRequest');

// GET /proyectos
const getAllProjects = async (req, res) => {
  try {
    const response = await apiRequest({
      method: 'get',
      url: '/api/proyectos'
    });
    // console.log('Respuesta de la API:', response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyectos desde API' });
  }
};

// POST /proyectos
const createProject = async (req, res) => {
  try {
    const response = await apiRequest({
      method: 'post',
      url: '/api/proyectos',
      data: req.body
    });
    // console.log('Proyecto creado:', response.data);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear proyecto desde API' });
  }
};

module.exports = {
  getAllProjects,
  createProject
};
