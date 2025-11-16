import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import { SearchProvider } from "./Context/SearchContext";
import SearchResults from "./pages/Search/SearchResults";
import GameDetails from "./pages/GameDetails/GameDetails";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/gamedetails" element={<GameDetails />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;
