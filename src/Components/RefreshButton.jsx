import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";

function RefreshButton() {
  const navigate = useNavigate();
  const { setSearchTerm, setFinalSearch } = useContext(SearchContext);

  const resetApp = () => {
    setSearchTerm("");
    setFinalSearch("");
    navigate("/"); // volver al home
  };

  return (
    <button onClick={resetApp} className="logo-button">
      <img src="/Logo_ManiaTico.png" alt="Reset" className="logo-refresh" />
    </button>
  );
}

export default RefreshButton;
