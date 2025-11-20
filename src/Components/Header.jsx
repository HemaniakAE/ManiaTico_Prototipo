import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import RefreshButton from "./RefreshButton";
import { FaRegUserCircle, FaUserCheck } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import SearchBar from "./Searchbar";
import CartButton from "./CartButton";
import NotificationsButton from "./NotificationsButton";
import { AuthContext } from "../Context/AuthContext";

function Header() {
  const { isLoggedIn, isClient, user } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-left">
        <RefreshButton />
        
        {/* Solo clientes pueden ver la biblioteca */}
        {isLoggedIn() && isClient() && (
          <Link to="/library" className="library-link">
            <BiLibrary className="library-icon" size={32} />
            <span>Biblioteca</span>
          </Link>
        )}
      </div>

      <div className="header-center">
        <SearchBar />
      </div>

      <div className="header-right">

        {isLoggedIn() && <NotificationsButton />}

        {/* Solo clientes pueden ver el carrito */}
        {isLoggedIn() && isClient() && <CartButton />}
        
        {/* Botón de autenticación */}
        {isLoggedIn() ? (
          <div className="auth-button logged-in" title={`Sesión activa: ${user?.name || user?.email}`}>
            <FaUserCheck className="auth-icon" />
            <span>{user?.name || "Usuario"}</span>
          </div>
        ) : (
          <Link to="/auth" className="auth-button">
            <FaRegUserCircle className="auth-icon" />
            <span>Ingresar</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;