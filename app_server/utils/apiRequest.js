const axios = require('axios');

const apiRequest = async ({
  method = 'get',
  url,
  data = {},
  params = {},
  jwt = '',
  useSessionToken = false
}) => {
  const tokenApp = process.env.TOKEN_APP_SERVER;
  const server = process.env.API_URL || 'http://localhost:5000'; // sin /api al final

  const headers = {
    Authorization: `Bearer ${tokenApp}`
  };

  // Si deseas enviar también un token de sesión (por ejemplo, de usuario logueado)
  if (useSessionToken && jwt) {
    headers['x-user-token'] = `Bearer ${jwt}`;
  }

  try {
    const response = await axios({
      method,
      url: `${server}${url}`,
      data,
      params,
      headers
    });

    return response;
  } catch (error) {
    console.error('❌ apiRequest error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

module.exports = apiRequest;
