import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [finalSearch, setFinalSearch] = useState(""); // 👈 búsqueda confirmada

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, finalSearch, setFinalSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
