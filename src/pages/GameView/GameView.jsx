import { useEffect, useRef, useContext } from "react";
import './GameView.css'
import Header from '../../Components/Header'
import GameBanner from '../../Components/GameBanner';
import GameDetails from '../../Components/GameDetails';
import { GameSelectionContext } from "../../Context/GameSelectionContext";

function GameView() {
  const { selectedGame } = useContext(GameSelectionContext);
  const contentRef = useRef(null);

  useEffect(() => {
    // Si el scroll está en el window (document), forzamos el top allí
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Si tu contenedor es scrollable, también reseteamos su scroll
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      // alternativa más compatible:
      contentRef.current.scrollTo && contentRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [selectedGame]);

  return (
    <>
      <Header />
      <div ref={contentRef} className='game-view-layout'>
        <div className='game-view-banner'>
          <GameBanner />
        </div>

        <div className="game-view-content">
          <GameDetails />
        </div>
      </div>
    </>
  )
}

export default GameView;
