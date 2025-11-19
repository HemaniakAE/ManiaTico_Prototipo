import { useEffect, useRef, useContext } from "react";
import "./GameView.css";
import Header from "../../Components/Header";
import GameBanner from "../../Components/GameBanner";
import GameDetails from "../../Components/GameDetails";
import { GameSelectionContext } from "../../Context/GameSelectionContext";
import AddToCartButton from "../../Components/AddToCartButton";
import StarRating from "../../Components/StarRating";

function GameView() {
  const { selectedGame } = useContext(GameSelectionContext);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      // alternativa más compatible:
      contentRef.current.scrollTo &&
        contentRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [selectedGame]);

  return (
    <>
      <Header />
      <div ref={contentRef} className="game-view-layout">
        <div className="game-view-banner">
          <GameBanner />
        </div>

        <div className="game-view-left">
          <GameDetails />
          <AddToCartButton />
        </div>
        <div className="game-view-right">
          {selectedGame && (
            <StarRating
              gameId={selectedGame.id}
              initialRating={selectedGame.rating}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default GameView;
