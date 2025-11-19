import React from "react";
import "./Sidebar.css";
import useTranslate from "../Context/useTranslate";

function Sidebar() {
  const { t } = useTranslate();

  return (
    <aside className="sidebar">
      <h2>{t("categories")}</h2>

      <ul>
        {/* ACCIÓN */}
        <li className="category">{t("cat_action")}</li>
        <li className="subcategory">{t("sub_shooter")}</li>
        <li className="subcategory">{t("sub_beat")}</li>
        <li className="subcategory">{t("sub_survival")}</li>
        <li className="subcategory">{t("sub_hackslash")}</li>

        {/* AVENTURA */}
        <li className="category">{t("cat_adventure")}</li>
        <li className="subcategory">{t("sub_graphic")}</li>
        <li className="subcategory">{t("sub_openworld")}</li>
        <li className="subcategory">{t("sub_interactive")}</li>

        {/* DEPORTES */}
        <li className="category">{t("cat_sports")}</li>
        <li className="subcategory">{t("sub_soccer")}</li>
        <li className="subcategory">{t("sub_basket")}</li>
        <li className="subcategory">{t("sub_racing")}</li>
        <li className="subcategory">{t("sub_skate")}</li>

        {/* RPG */}
        <li className="category">{t("cat_rpg")}</li>
        <li className="subcategory">{t("sub_actionrpg")}</li>
        <li className="subcategory">{t("sub_jrpg")}</li>
        <li className="subcategory">{t("sub_mmorpg")}</li>
        <li className="subcategory">{t("sub_strategyrpg")}</li>

        {/* SIMULACIÓN */}
        <li className="category">{t("cat_simulation")}</li>
        <li className="subcategory">{t("sub_life")}</li>
        <li className="subcategory">{t("sub_business")}</li>
        <li className="subcategory">{t("sub_flight")}</li>
        <li className="subcategory">{t("sub_building")}</li>

        {/* ESTRATEGIA */}
        <li className="category">{t("cat_strategy")}</li>
        <li className="subcategory">{t("sub_rts")}</li>
        <li className="subcategory">{t("sub_turns")}</li>
        <li className="subcategory">{t("sub_cards")}</li>
        <li className="subcategory">{t("sub_tactical")}</li>

        {/* OTRAS */}
        <li className="category">{t("cat_arcade")}</li>
        <li className="category">{t("cat_platform")}</li>
        <li className="category">{t("cat_music")}</li>
        <li className="category">{t("cat_puzzle")}</li>
        <li className="category">{t("cat_dlc")}</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
