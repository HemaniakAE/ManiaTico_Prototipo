import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gamesData from "../data/games.json";
import { SearchContext } from "../Context/SearchContext";
import "./SearchBar.css";

export default function SearchBar() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, setFinalSearch } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState([]);

  const updateSuggestions = (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const results = gamesData.filter(g =>
      g.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(results.slice(0, 5));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSuggestions(value);
  };

  const confirmSearch = (value) => {
    if (!value.trim()) return;
    setFinalSearch(value);
    navigate("/search");
    setSuggestions([]);
  };

  const handleSelectSuggestion = (value) => {
    setSearchTerm(value);
    confirmSearch(value);
  };

  const handleSubmit = () => {
    confirmSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Buscar en ManiaTico"
        className="search-bar"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button className="search-button" onClick={handleSubmit}>
        <FaSearch className="search-icon" />
      </button>

      {suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map(s => (
            <li key={s.id} onClick={() => handleSelectSuggestion(s.name)}>
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
