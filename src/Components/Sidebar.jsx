import React from "react";
import "./Sidebar.css";
import useTranslate from "../Context/useTranslate";

function Sidebar() {
  const { t } = useTranslate();

  return (
    <aside className="sidebar">
      <h2>{t("categories")}</h2>
      <ul>
        <li className="category">{t("action")}</li>
        <li className="subcategory">{t("shooter")}</li>
        <li className="subcategory">{t("beat")}</li>
        <li className="subcategory">{t("survival")}</li>
        <li className="subcategory">{t("hack")}</li>

        <li className="category">{t("adventure")}</li>
        <li className="subcategory">{t("graphic")}</li>
        <li className="subcategory">{t("openworld")}</li>
        <li className="subcategory">{t("interactive")}</li>

        <li className="category">{t("sports")}</li>
        <li className="subcategory">{t("football")}</li>
        <li className="subcategory">{t("basketball")}</li>
        <li className="subcategory">{t("racing")}</li>
        <li className="subcategory">{t("skate")}</li>

        <li className="category">{t("rpg")}</li>
        <li className="subcategory">{t("actionrpg")}</li>
        <li className="subcategory">{t("jrpg")}</li>
        <li className="subcategory">{t("mmorpg")}</li>
        <li className="subcategory">{t("strategyrpg")}</li>

        <li className="category">{t("simulation")}</li>
        <li className="subcategory">{t("life")}</li>
        <li className="subcategory">{t("business")}</li>
        <li className="subcategory">{t("flight")}</li>
        <li className="subcategory">{t("builder")}</li>

        <li className="category">{t("strategy")}</li>
        <li className="subcategory">{t("rts")}</li>
        <li className="subcategory">{t("turns")}</li>
        <li className="subcategory">{t("cards")}</li>
        <li className="subcategory">{t("tactical")}</li>

        <li className="category">{t("arcade")}</li>
        <li className="category">{t("platforms")}</li>
        <li className="category">{t("music")}</li>
        <li className="category">{t("puzzles")}</li>
        <li className="category">{t("dlc")}</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
