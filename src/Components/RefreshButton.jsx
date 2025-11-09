import { Link } from "react-router-dom";


function RefreshButton() {
  return (
    <Link to="/" className="logo-button">
      <img src="/Logo_ManiaTico.png" alt="Reset" className="logo-refresh" />
    </Link>
  );
}

export default RefreshButton;
