import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import RefreshButton from "./RefreshButton";
import { FaRegUserCircle, FaBook } from "react-icons/fa";
import SearchBar from "./Searchbar";
import CartButton from "./CartButton";
import useTranslate from "../Context/useTranslate";

function Header() {
  const { t } = useTranslate();

  return (
    <header className="header">
      {/* IZQUIERDA — LOGO */}
      <div className="header-left">
        <RefreshButton />
      </div>

      {/* CENTRO — SEARCHBAR */}
      <div className="header-center">
        <SearchBar />
      </div>

      {/* DERECHA — BOTONES */}
      <div className="header-right">

        <Link to="/library" className="library-link">
          <FaBook className="library-icon" />
          <span>{t("library")}</span>
        </Link>

        <CartButton />

        <Link to="/auth" className="auth-button">
          <FaRegUserCircle className="auth-icon" />
          <span>{t("login_btn")}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
