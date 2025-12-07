import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import LanguageProvider from "./context/LanguageProvider.jsx";
import { ScrollProvider } from "./context/ScrollContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <ScrollProvider>
        <App />
      </ScrollProvider>
    </LanguageProvider>
  </React.StrictMode>
);
