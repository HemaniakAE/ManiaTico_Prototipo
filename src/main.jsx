import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./Context/CartContext";
import { LanguageProvider } from "./Context/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CartProvider>
  </BrowserRouter>
);