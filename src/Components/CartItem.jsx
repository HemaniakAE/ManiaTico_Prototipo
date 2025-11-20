import React from 'react'
import './CartItem.css'

const fmt = (v) => `₡${(v || 0).toLocaleString()}`

export default function CartItem({ index, product, qty, onRemove, onChangeQty }) {
  return (
    <div className="cart-item">
      <div className="cart-item-index">{index}</div>
      <img
        className="cart-item-thumb"
        src={product?.image ? `/assets/games/${product.image}` : ''}
        alt={product?.name}
      />
      <div className="cart-item-main">
        <div className="cart-item-title">{product?.name}</div>
        <div className="cart-item-dev">{product?.developer}</div>
        <div className="cart-item-actions">
          <div className="cart-item-qty">
            <button onClick={() => onChangeQty(Math.max(0, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => onChangeQty(qty + 1)}>+</button>
          </div>
          <button className="cart-item-remove" onClick={onRemove}>&times; Quitar</button>
        </div>
      </div>
      <div className="cart-item-price">{fmt(product?.price)}</div>
    </div>
  )
}
