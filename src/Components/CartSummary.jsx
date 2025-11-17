import React, { useState, useEffect } from 'react'
import './CartSummary.css'

const fmt = (v) => `₡${(v || 0).toLocaleString()}`

export default function CartSummary({ itemsWithData, onClear }){
  const [showToast, setShowToast] = useState(false)
  const subtotal = itemsWithData.reduce((s,i)=>s + (i.price||0) * i.qty, 0)

  // Mostrar toast y vaciar carrito. El toast permanecerá hasta que el
  // usuario cambie de página (el componente se desmonta) o recargue.
  const handleCheckout = () => {
    setShowToast(true)
    // vaciar carrito inmediatamente después de la compra
    if (onClear) onClear()
  }

  return (
    <aside className="cart-summary">
      <h3>Confirmar Compra</h3>
      <div className="cart-summary-row"><span>Subtotal</span><strong>{fmt(subtotal)}</strong></div>
      <div className="cart-summary-row muted"><span>Descuento</span><span>—</span></div>
      <div className="cart-summary-row total"><span>Total ({itemsWithData.length} artículos)</span><strong>{fmt(subtotal)}</strong></div>

      <div className="cart-code">
        <label>Canjear Código</label>
        <input placeholder="Introducir código de descuento" />
      </div>

      <button className="cart-checkout" onClick={handleCheckout}>Confirmar Compra</button>

      {showToast && (
        <div className="toast toast-success">Compra simulada exitosa ✅</div>
      )}

      <div className="cart-summary-footer">
        <h4>Resumen</h4>
        {itemsWithData.slice(0,2).map(i=> (
          <div key={i.id} className="cart-mini">
            <img src={i.image ? `/src/assets/games/${i.image}` : ''} alt='' />
            <div>
              <div className="mini-name">{i.name}</div>
              <div className="mini-price">{fmt(i.price)}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="cart-clear" onClick={onClear}>Vaciar carrito</button>
    </aside>
  )
}
