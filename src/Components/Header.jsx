import "./Header.css";
import RefreshButton from "./RefreshButton";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";
import CartButton from "./CartButton";
import { FaBook, FaRegUserCircle } from "react-icons/fa";
import useTranslate from "../Context/useTranslate";

export default function Header() {
  const { t } = useTranslate();

  return (
    <header className="header">
      <div className="header-left">
        <RefreshButton />
      </div>

      <div className="header-center">
        <SearchBar />
      </div>

      <div className="header-right">
        <Link to="/library" className="auth-button">
          <FaBook className="library-icon" />
          <span>{t("library")}</span>
        </Link>

        <CartButton />

        <Link to="/auth" className="auth-button">
          <FaRegUserCircle className="auth-icon" />
          <span>{t("login")}</span>
        </Link>
      </div>
    </header>
  );
}
