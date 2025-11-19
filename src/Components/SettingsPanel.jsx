import { FaCog, FaQuestionCircle } from "react-icons/fa";
import "./SettingsPanel.css";

export default function SettingsPanel() {
  return (
    <div className="settings-panel-fixed">
      <button className="settings-btn">
        <FaCog />
      </button>

      <button className="settings-btn">
        <FaQuestionCircle />
      </button>
    </div>
  );
}
