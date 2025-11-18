import './Library.css'
import Header from '../../Components/Header'
import games from '../../data/games.json'
import { useEffect, useState, useMemo } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom' 


export default function Library() {
  const [owned, setOwned] = useState([])
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  
  // 1) Reset inicial solo una vez por sesion de pestaña
useEffect(() => {
  const alreadyInit = sessionStorage.getItem('mt_library_init_done')

  // Si NO se ha inicializado esta sesion, limpiamos la libreria vieja
  if (!alreadyInit) {
    try {
      localStorage.removeItem('mt_library')
    } catch (e) {
      console.warn(e)
    }
    sessionStorage.setItem('mt_library_init_done', '1')
  }
}, [])

  useEffect(()=>{
  try{
    const raw = localStorage.getItem('mt_library')
    const data = raw ? JSON.parse(raw) : []
    const withData = data.map(d => ({
      ...d,
      ...(games.find(g => g.id === d.id) || {})
    }))
    setOwned(withData)
  }catch(e){
    setOwned([])
  }
}, [])




  const remove = (id) => {
    try {
      const raw = localStorage.getItem('mt_library')
      const data = raw ? JSON.parse(raw) : []
      const filtered = data.filter(d => d.id !== id)
      localStorage.setItem('mt_library', JSON.stringify(filtered))
      setOwned(prev => prev.filter(o => o.id !== id))
    } catch (e) {
      console.warn(e)
    }
  }


  const filtered = useMemo(() => {
    if (!q) return owned
    return owned.filter(g =>
      g.name.toLowerCase().includes(q.toLowerCase()) ||
      (g.developer || '').toLowerCase().includes(q.toLowerCase())
    )
  }, [owned, q])

  const hasGames = owned.length > 0
  const isSearching = q.trim().length > 0

  return (
    <>
      <Header />
      <main className="library-container horizontal-view">
  <div className="library-header">
  <h1>Mi Biblioteca</h1>

  <div className="library-controls">
    <input 
      className="library-search" 
      placeholder="Buscar en la biblioteca" 
      value={q} 
      onChange={(e)=>setQ(e.target.value)} 
    />
  </div>
</div>


  {owned.length === 0 ? (
  <div className="hero-card hero-card-empty">
    <div className="hero-empty-main">
      <h2>Tu biblioteca esta vacia</h2>
      <p>
        Cuando compres o reclames un juego, aparecera aqui en tu lista
        de todos los juegos.
      </p>
        <button
    type="button"
    className="hero-empty-btn"
    onClick={() => navigate('/')}   // ⬅️ te manda al home
    >
    Explorar tienda
    </button>

    </div>
  </div>

    ) : filtered.length === 0 && q.trim().length > 0 ? (
    // ================= SIN RESULTADOS DE BUSQUEDA =================
    <section className="library-empty-steam">
      <header className="section-header">
        <div className="section-title">
          <span>Todos los juegos</span>
          <span className="section-count">({owned.length})</span>
        </div>
      </header>

      <div className="empty-panel">
        <div className="empty-illustration" />
        <div className="empty-text">
          <h2>No se encontraron resultados</h2>
          <p>
            Prueba con otro termino o limpia la busqueda para ver todos los juegos.
          </p>
          <button
            className="empty-secondary-btn"
            type="button"
            onClick={() => setQ('')}
          >
            Limpiar busqueda
          </button>
        </div>
      </div>
    </section>
  ) : (
    // ================= BIBLIOTECA CON JUEGOS =================
    <>
      <section className="hero-row">
        <div className="hero-grid">
          {filtered.slice(0, 2).map((g) => (
            <div
              key={g.id}
              className="hero-card"
              style={{ backgroundImage: `url(/src/assets/games/${g.image})` }}
            >
              <div className="hero-name">{g.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="all-games">
        <div className="section-header">
          <div className="section-title">
            <span>Todos los juegos</span>
            <span className="section-count">({filtered.length})</span>
          </div>
        </div>

        <div className="library-grid">
          {filtered.map((g) => (
            <div key={g.id} className="library-card">
              <div
                className="library-art"
                style={{ backgroundImage: `url(/src/assets/games/${g.image})` }}
              />
              <div className="library-meta">
                <div className="library-title">{g.name}</div>
                <div className="library-dev">{g.developer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )}
</main>
    </>
  )
}
