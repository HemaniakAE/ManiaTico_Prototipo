import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import { SearchProvider } from "./Context/SearchContext";
import { GameSelectionProvider } from "./Context/GameSelectionContext";
import SearchResults from "./pages/Search/SearchResults";
import GameView from "./pages/GameView/GameView";
import ShopCenter from "./pages/ShopCenter/ShopCenter";
import Library from "./pages/Library/Library";

function App() {

  //Limpian los datos persisten para una mejor simulación del sistema
  useEffect(() => {
    localStorage.removeItem("mt_ratings");
  }, []);

  useEffect(() => {
  localStorage.removeItem("mt_library");
  }, []);

  return (
    <GameSelectionProvider>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/library" element={<Library />} />
          <Route path="/gameview" element={<GameView />} />
          <Route path="/shopcenter" element={<ShopCenter />} />
        </Routes>
      </SearchProvider>
    </GameSelectionProvider>
  );
}

export default App;
