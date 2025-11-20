// src/Context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lista de usuarios predefinidos para el chat
  const [users] = useState([
    { id: "1", username: "Ana", email: "ana@ejemplo.com" },
    { id: "2", username: "Carlos", email: "carlos@ejemplo.com" },
    { id: "3", username: "María", email: "maria@ejemplo.com" },
    { id: "4", username: "Soporte ManiaTico", email: "soporte@maniatrico.com" }
  ]);

  // Cargar sesión al montar
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
    // Asegurar que el usuario tenga un ID
    const userWithId = {
      id: userData.id || `user_${Date.now()}`,
      username: userData.name || userData.email.split('@')[0],
      ...userData
    };
    setUser(userWithId);
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
        users, // 👈 agregar lista de usuarios
        loading,
        login,
        logout,
        isLoggedIn,
        isClient,
        isDeveloper,
        // Aliases para compatibilidad
        currentUser: user,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}