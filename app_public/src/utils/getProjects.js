import axios from 'axios';

const getProjects = async () => {
  // Usa variable de entorno en Vercel (NEXT_PUBLIC_API_URL si usas Next,
  // o VITE_API_URL si usas Vite)
  const serverURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  try {
    const res = await axios.get(`${serverURL}/proyectos?t=${Date.now()}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener proyectos:', error.response?.data || error.message);
    return [];
  }
};

export default getProjects;
