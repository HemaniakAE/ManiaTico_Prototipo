import React, { useState, useEffect } from 'react'
import './CartSummary.css'
import useTranslate from '../Context/useTranslate'

const fmt = (v) => `₡${(v || 0).toLocaleString()}`

export default function CartSummary({ itemsWithData, onClear }){
  const [showToast, setShowToast] = useState(false)
  const subtotal = itemsWithData.reduce((s,i)=>s + (i.price||0) * i.qty, 0)
  const { t } = useTranslate()

  const handleCheckout = () => {
    setShowToast(true)
    try {
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
    if (onClear) onClear()
  }

  return (
    <aside className="cart-summary">
      <h3>{t('cart.confirmPurchase')}</h3>
      <div className="cart-summary-row"><span>{t('cart.subtotal')}</span><strong>{fmt(subtotal)}</strong></div>
      <div className="cart-summary-row muted"><span>{t('cart.discount')}</span><span>—</span></div>
      <div className="cart-summary-row total"><span>{t('cart.total')} ({itemsWithData.length} {t('cart.items')})</span><strong>{fmt(subtotal)}</strong></div>

      <div className="cart-code">
        <label>{t('cart.redeemCode')}</label>
        <input placeholder={t('cart.enterCode')} />
      </div>

      <button className="cart-checkout" onClick={handleCheckout}>{t('cart.checkout')}</button>

      {showToast && (
        <div className="toast toast-success">{t('cart.purchaseSuccess')}</div>
      )}

      <div className="cart-summary-footer">
        <h4>{t('cart.summary')}</h4>
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

      <button className="cart-clear" onClick={onClear}>{t('cart.clearCart')}</button>
    </aside>
  )
}