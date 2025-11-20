import React, { useState, useEffect } from 'react'
import './CartSummary.css'

const fmt = (v) => `₡${(v || 0).toLocaleString()}`

export default function CartSummary({ itemsWithData, onClear }){
  const [showToast, setShowToast] = useState(false)
  const subtotal = itemsWithData.reduce((s,i)=>s + (i.price||0) * i.qty, 0)

  
  const handleCheckout = () => {
    setShowToast(true)
    try {
      // Guardar en biblioteca local: mt_library
      const raw = localStorage.getItem('mt_library')
      const existing = raw ? JSON.parse(raw) : []

      
      const merged = [...existing]
      itemsWithData.forEach((it) => {
        const found = merged.find((m) => m.id === it.id)
        if (found) found.qty = (found.qty || 0) + (it.qty || 1)
        else merged.push({ id: it.id, qty: it.qty || 1 })
      })

      localStorage.setItem('mt_library', JSON.stringify(merged))
      try{ window.dispatchEvent(new CustomEvent('mt_library_updated', { detail: merged })) }catch(e){}
    } catch (err) {
      console.warn('No se pudo guardar la biblioteca:', err)
    }

        // Emitir notificación por cada juego comprado
    itemsWithData.forEach((it) => {
      window.dispatchEvent(
        new CustomEvent("mt_new_notification", {
          detail: {
            title: "Compra realizada",
            message: `${it.name} fue comprado exitosamente`,
            gameId: it.id,
            timestamp: Date.now()
          }
        })
      );
    });


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
            <img src={i.image ? `/assets/games/${i.image}` : ''} alt='' />
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
