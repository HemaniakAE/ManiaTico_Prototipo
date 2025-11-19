import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gamesData from "../data/games.json";
import { SearchContext } from "../Context/SearchContext";
import useTranslate from "../Context/useTranslate";  // <--- IMPORTANTE
import "./Searchbar.css";

export default function SearchBar() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, setFinalSearch } =
    useContext(SearchContext);

  const { t } = useTranslate();   // <--- AQUI SE USA

  const [suggestions, setSuggestions] = useState([]);

  const normalize = (str = "") =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const matchesByTokens = (name, term) => {
    const nName = normalize(name);
    const nTerm = normalize(term);
    if (!nTerm) return false;

    const nameWords = nName.split(/\s+/);
    const tokens = nTerm.split(/\s+/);

    return tokens.every((token) =>
      nameWords.some((word) => word.startsWith(token))
    );
  };

  const updateSuggestions = (value) => {
    const v = normalize(value);
    if (!v) {
      setSuggestions([]);
      return;
    }

    const results = gamesData.filter((g) => matchesByTokens(g.name, v));
    setSuggestions(results.slice(0, 5));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSuggestions(value);
  };

  const confirmSearch = (value) => {
    const cleaned = normalize(value);
    if (!cleaned) return;

    setFinalSearch(cleaned);
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
        placeholder={t("search.placeholder")}   // <--- AQUI SE TRADUCE
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
          {suggestions.map((s) => (
            <li key={s.id} onClick={() => handleSelectSuggestion(s.name)}>
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
