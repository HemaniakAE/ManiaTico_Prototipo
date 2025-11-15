import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import RefreshButton from "./RefreshButton";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import gamesData from "../data/games.json";
import { SearchContext } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";



function Header() {
  const navigate = useNavigate(); // ← Mover aquí

  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const results = gamesData.filter((g) =>
      g.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(results.slice(0, 5));
  };

  const handleSelect = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
    navigate("/search"); // ya funciona
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      navigate("/search");
      setSuggestions([]);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <RefreshButton />
      </div>

      <div className="header-center"><div/>
        <SearchBar />
      </div>

      <div className="header-right">
        <Link to="/auth" className="auth-button">
          <FaRegUserCircle className="auth-icon" />
          <span>Ingresar</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
