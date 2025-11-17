import React from "react";
import "./CartButton.css";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function CartButton() {

    const navigate = useNavigate();
    const toShopCenter = () => {
        navigate("/shopcenter"); //Ir al centro de compras
    };

    return (
        <button className="cart-button" onClick={toShopCenter}>
            <div className="cart-logo">
                <BsCart4 size={30} />
            </div>
        </button>
    );
}