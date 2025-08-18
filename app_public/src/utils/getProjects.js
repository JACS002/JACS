import axios from 'axios';

const getProjects = async () => {
  const serverURL = import.meta.env.VITE_API_URL; // Vite
  // Para CRA sería: process.env.REACT_APP_API_URL

  try {
    const res = await axios.get(`${serverURL}/proyectos`);
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener proyectos:', error.response?.data || error.message);
    return [];
  }
};

export default getProjects;
