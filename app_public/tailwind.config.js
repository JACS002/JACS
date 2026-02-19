/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        titulos: ['"Space Grotesk"', "sans-serif"],
        contenido: ['"Inter"', "sans-serif"],
        code: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        // Deep Void Blue palette
        dark: "#030712", // Deep Void Blue (Background)
        primary: "#38BDF8", // Luminous Sky Blue (Much better visibility)
        secondary: "#c084fc", // Bright Purple (Lighter Nebula)

        // Legacy support / variations
        void: "#030712",
        electric: "#38BDF8", // Matching primary
        nebula: "#c084fc", // Matching secondary

        white: "#ffffff",
        gray: {
          100: "#f3f4f6",
          400: "#9ca3af",
          800: "#1f2937",
          900: "#111827",
        },
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("hover-device", "@media (hover: hover)");
    },
  ],
};
