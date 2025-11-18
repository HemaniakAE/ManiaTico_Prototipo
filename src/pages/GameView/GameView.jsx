import './GameView.css'
import Header from '../../Components/Header'
import GameBanner from '../../Components/GameBanner';

function GameView() {
  return (
    <>
      <Header />
      <div className='game-view-layout'>
        <div className='game-view-banner'>
          <GameBanner />
        </div>

        <div className="game-view-content">
          <h2>DETALLES DE JUEGO</h2>
        </div>
      </div>
    </>
  )
}

export default GameView;
