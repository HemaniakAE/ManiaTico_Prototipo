import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import RefreshButton from "./RefreshButton";
import { FaBook, FaSearch, FaRegUserCircle } from "react-icons/fa";
import SearchBar from "./Searchbar";
import CartButton from "./CartButton";
import useTranslate from "../Context/useTranslate";

function Header() {
  const { t } = useTranslate();

  return (
    <header className="header">

      <div className="header-left">
        <RefreshButton />
      </div>

      <div className="header-center">

        {/* BOTÓN BIBLIOTECA – REGRESADO A SU LUGAR ORIGINAL */}
        <Link to="/library" className="library-link">
          <FaBook className="library-icon" />
          <span>{t("library")}</span>
        </Link>

        <SearchBar />
      </div>

      <div className="header-right">

        <CartButton />

        <Link to="/auth" className="auth-button">
          <FaRegUserCircle className="auth-icon" />
          <span>{t("login")}</span>
        </Link>

      </div>

    </header>
  );
}

export default Header;
