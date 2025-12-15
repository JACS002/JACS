// import axios from 'axios';

// const getProjects = async () => {
//   // Usa variable de entorno en Vercel VITE_API_URL
//   const serverURL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5000"
//     : import.meta.env.VITE_API_URL;


//   try {
//     const res = await axios.get(`${serverURL}/proyectos?t=${Date.now()}`, {
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.error('❌ Error al obtener proyectos:', error.response?.data || error.message);
//     return [];
//   }
// };

// export default getProjects;

// import axios from 'axios';
import { projectsData } from "../data/projectsData.js";

const getProjects = async () => {
  // Retorna directamente los datos estáticos para carga rápida
  // sin esperar al backend
  return projectsData;

  /* CÓDIGO ORIGINAL COMENTADO - Backend API
  const serverURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL;

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
  */
};

export default getProjects;
