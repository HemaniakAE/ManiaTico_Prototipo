import './GameView.css'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'

function GameView() {
  return (
    <>
      <Header />
      <div className='game-view-layout'>
        <Sidebar />
        <div className="game-view-content">
         <h2>DETALLES DE JUEGO</h2>
        </div>
      </div>  
    </>
  )
}

export default GameView;