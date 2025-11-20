import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import RefreshButton from "./RefreshButton";
import { FaRegUserCircle, FaUserCheck } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import SearchBar from "./Searchbar";
import CartButton from "./CartButton";
import { AuthContext } from "../Context/AuthContext";
import useTranslate from '../Context/useTranslate';

function Header() {
  const { isLoggedIn, isClient, user } = useContext(AuthContext);
  const { t } = useTranslate();

  return (
    <header className="header">
      <div className="header-left">
        <RefreshButton />

        {/* Biblioteca solo visible para clientes */}
        {isLoggedIn() && isClient() && (
          <Link to="/library" className="library-link">
            <BiLibrary className="library-icon" size={32} />
            <span>{t('library')}</span>
          </Link>
        )}
      </div>

      <div className="header-center">
        <SearchBar />
      </div>

      <div className="header-right">
        {/* Carrito solo visible para clientes */}
        {isLoggedIn() && isClient() && <CartButton />}

        {/* Botón de autenticación */}
        {isLoggedIn() ? (
          <div
            className="auth-button logged-in"
            title={`Sesión activa: ${user?.name || user?.email}`}
          >
            <FaUserCheck className="auth-icon" />
            <span>{user?.name || "Usuario"}</span>
          </div>
        ) : (
          <Link to="/auth" className="auth-button">
            <FaRegUserCircle className="auth-icon" />
            <span>{t('login')}</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
