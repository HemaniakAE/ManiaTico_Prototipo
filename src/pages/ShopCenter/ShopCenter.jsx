import './ShopCenter.css'
import Header from '../../Components/Header'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import games from '../../data/games.json'
import CartItem from '../../Components/CartItem'
import CartSummary from '../../Components/CartSummary'
import useTranslate from '../../Context/useTranslate'

function ShopCenter() {
  const { items, addItem, removeItem, updateQty, clearCart } = useContext(CartContext)
  const { t } = useTranslate()

  const itemsWithData = items.map(i => ({ ...i, ...(games.find(g => g.id === i.id) || {}) }))

  return (
    <>
      <Header />
      <div className="shop-center-container shop-center-grid">
        <div className="shop-center-main">
          <h1>{t('shopCenter.yourCart')}</h1>
          {itemsWithData.length === 0 ? (
            <div className="empty-cart">
              <p>{t('shopCenter.emptyCart')}</p>
              <div className="suggestions">
                {games.slice(0,6).map(g => (
                  <div key={g.id} className="suggestion-card">
                    <img src={`/assets/games/${g.image}`} alt="" />
                    <div className="s-meta">
                      <div className="s-name">{g.name}</div>
                      <div className="s-dev">{g.developer}</div>
                      <button onClick={()=>addItem(g,1)}>{t('shopCenter.add')}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {itemsWithData.map((it, idx) => (
                  <CartItem
                    key={it.id}
                    index={idx + 1}
                    product={it}
                    qty={it.qty}
                    onRemove={() => removeItem(it.id)}
                    onChangeQty={(q) => updateQty(it.id, q)}
                  />
                ))}
              </div>

              <div className="more-suggestions">
                <h3>{t('shopCenter.continueAdding')}</h3>
                <div className="suggestions">
                  {games.slice(0,6).map(g => (
                    <div key={'s-'+g.id} className="suggestion-card">
                      <img src={`/assets/games/${g.image}`} alt="" />
                      <div className="s-meta">
                        <div className="s-name">{g.name}</div>
                        <div className="s-dev">{g.developer}</div>
                        <button onClick={()=>addItem(g,1)}>{t('shopCenter.add')}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="shop-center-side">
          <CartSummary itemsWithData={itemsWithData} onClear={clearCart} />
        </div>
      </div>
    </>
  )
}

export default ShopCenter