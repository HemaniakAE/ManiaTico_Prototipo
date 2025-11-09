import React from "react";
import { Link } from "react-router-dom"
import './Header.css'
import RefreshButton from "./RefreshButton";

function Header() {
    return (
      <header className="header">
        <div className="header-left">
          <RefreshButton />
        </div>

        <div className="header-center">
          <input
            type="text"
            placeholder="Buscar en ManiaTico"
            className="search-bar"
          />
        </div>
        
        <div className="header-right"></div>
      </header>
    );
}

export default Header