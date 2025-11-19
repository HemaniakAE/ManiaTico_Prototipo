// src/Context/GameSelectionContext.jsx
import React, { createContext, useState } from "react";

export const GameSelectionContext = createContext();

export const GameSelectionProvider = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <GameSelectionContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameSelectionContext.Provider>
  );
};
