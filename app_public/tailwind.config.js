/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        titulos: ['Manrope', 'sans-serif'],
        contenido: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: '#0e0e2c',        // fondo oscuro
        primary: '#a64bfd',     // morado eléctrico del logo
        accent: '#00f0ff',      // cian neón para botones/detalles
        neon: '#ff00c8',        // rosa neón opcional
      },
    },
  },
  plugins: [],
}
