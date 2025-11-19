import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import RefreshButton from "./RefreshButton";
import { FaSearch, FaRegUserCircle, FaBook } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import SearchBar from "./Searchbar";
import CartButton from "./CartButton";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <RefreshButton />
        <Link to="/library" className="library-link">
          <BiLibrary className="library-icon" size={32} />
          <span>Biblioteca</span>
        </Link>
      </div>

      <div className="header-center"><div/>
        <SearchBar />
      </div>

      <div className="header-right">
        
        <CartButton />
        <Link to="/auth" className="auth-button">
          <FaRegUserCircle className="auth-icon" />
          <span>Ingresar</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
