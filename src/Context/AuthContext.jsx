// src/Context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al montar (ya estará limpia gracias a App.jsx)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mt_session");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading session:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar sesión cuando cambia el user
  useEffect(() => {
    if (user) {
      localStorage.setItem("mt_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("mt_session");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mt_session");
  };

  const isLoggedIn = () => !!user;
  const isClient = () => user?.role === "cliente";
  const isDeveloper = () => user?.role === "dev";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn,
        isClient,
        isDeveloper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}