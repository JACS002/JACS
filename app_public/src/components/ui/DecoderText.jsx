import { useEffect, useState } from "react";

const CHARS = "-_~*[]{}!@#%^&<>";

const DecoderText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    // Iniciar con un pequeño delay
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2; // velocidad de decodificación
      }, 30);
    }, 500);

    return () => {
      if (interval) clearInterval(interval);
      clearTimeout(startDelay);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

export default DecoderText;
