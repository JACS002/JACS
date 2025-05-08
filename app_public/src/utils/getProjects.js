import axios from 'axios';

const getProjects = async () => {
  // Detecta automáticamente la URL base según entorno
  const serverURL = window.location.origin.includes('localhost')
    ? 'http://localhost:5000'
    : window.location.origin;

  try {
    const res = await axios.get(`${serverURL}/proyectos`);
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener proyectos:', error.response?.data || error.message);
    return [];
  }
};

export default getProjects;
