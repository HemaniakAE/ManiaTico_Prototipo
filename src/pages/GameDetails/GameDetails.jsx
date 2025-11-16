import './GameDetails.css'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'

function GameDetails() {
  return (
    <>
      <Header />
      <div className='game-details-layout'>
        <Sidebar />
        <div className="game-details-content">
         <h2>DETALLES DE JUEGOS</h2>
        </div>
      </div>  
    </>
  )
}

export default GameDetails