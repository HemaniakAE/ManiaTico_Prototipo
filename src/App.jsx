import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import { SearchProvider } from "./Context/SearchContext";
import { GameSelectionProvider } from "./Context/GameSelectionContext";
import { AuthProvider } from "./Context/AuthContext";
import { MessageProvider } from "./Context/MessageContext"; // 👈 agregar
import MessagingDock from "./Components/MessagingDock"; // 👈 agregar
import SearchResults from "./pages/Search/SearchResults";
import GameView from "./pages/GameView/GameView";
import ShopCenter from "./pages/ShopCenter/ShopCenter";
import Library from "./pages/Library/Library";
import RequestGame from "./pages/RequestGame/RequestGame";
import { RequestsProvider } from "./Context/RequestsContext";

// Limpiar datos ANTES de que React monte cualquier cosa
localStorage.removeItem("mt_ratings");
localStorage.removeItem("mt_library");
localStorage.removeItem("mt_comments");
localStorage.removeItem("mt_session");

// Notificaciones
localStorage.removeItem("mt_notifications");
localStorage.removeItem("mt_notifications_new");

function App() {
  
  return (
    <AuthProvider>
      <RequestsProvider>
        <GameSelectionProvider>
          <SearchProvider>
            <MessageProvider> {/* 👈 agregar MessageProvider */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/library" element={<Library />} />
                <Route path="/gameview" element={<GameView />} />
                <Route path="/shopcenter" element={<ShopCenter />} />
                <Route path="/requestgame" element={<RequestGame />} />
              </Routes>
              
              <MessagingDock /> {/* 👈 agregar MessagingDock */}
            </MessageProvider>
          </SearchProvider>
        </GameSelectionProvider>
      </RequestsProvider>  
    </AuthProvider>
  );
}

export default App;