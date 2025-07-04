import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from './pages/WatchlistPage';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleAddToWatchlist = (movie) => {
    const exists  = watchlist.find(m => m.id === movie.id);
    if (!exists) setWatchlist([...watchlist,movie]);
  };

  const handleRemoveFromWatchlist = (id) => {
    const updated = watchlist.filter(m => m.id !== id);
    setWatchlist(updated);
  };

  return (
    <Router>
      <div>
        <nav style={{marginBottom: 20}}>
          <Link to="/">🔍 Search</Link> |<Link to="/watchlist">📺 Watchlist ({watchlist.length})</Link>
        </nav>
        <Routes>
          <Route path='/' element={<SearchPage onAdd={handleAddToWatchlist}/>}
          />
          <Route path='/watchlist' element={<WatchlistPage watchlist={watchlist} onRemove={handleRemoveFromWatchlist}/>}
          /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
