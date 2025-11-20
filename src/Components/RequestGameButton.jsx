import { MdLibraryAdd } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";
import './RequestGameButton.css'
import { useNavigate } from "react-router-dom";

export default function RequestGameButton() {

    const navigate = useNavigate();
    const topRequestGame = () => {
        navigate("/requestgame"); //Ir al centro de compras
    };

    return (
        <button className="request-game-button" onClick={topRequestGame}>
            <div className="request-game-logo">
                <MdLibraryAdd size={30} />
            </div>
        </button>
    );
}
