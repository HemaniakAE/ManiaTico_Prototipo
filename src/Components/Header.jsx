import React from "react";
import './Header.css'

function Header() {
    return (
        <header className="header"> 
            <div className="header-center">
                <input
                    type="text"
                    placeholder="Buscar en ManiaTico"
                    className="search-bar"
                />
            </div>
        </header>
    )
}

export default Header