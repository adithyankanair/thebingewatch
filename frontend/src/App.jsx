import { useEffect, useState } from 'react';
import axios from "axios";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from './pages/WatchlistPage';
import MovieDetailPage from './pages/MovieDetailPage';
// import './styles.css';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchwatchlist();
  },[]);

  const fetchwatchlist = async () => {
    const res = await axios.get("http://localhost:5000/api/watchlist");
    setWatchlist(res.data);
  };

  const handleAddToWatchlist = async (movie) => {
    const exists =watchlist.find(m => m.movie_id === movie.id);
    if(exists) return;

    await axios.post("http://localhost:5000/api/watchlist", {
      id: movie.id,
      title:movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date
    });

    fetchwatchlist();
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    console.log("Removing movie with id:", movieId);
    try {
      await axios.delete(`http://localhost:5000/api/watchlist/${movieId}`);
      fetchwatchlist();
    } catch (err) {
      console.error("Delete failed: ", err.message);
    }
      
  };
    
    //not in use ,switched to db 
  // const handleAddToWatchlist = (movie) => {
  //   const exists  = watchlist.find(m => m.id === movie.id);
  //   if (!exists) setWatchlist([...watchlist,movie]);
  // };

  // const handleRemoveFromWatchlist = (id) => {
  //   const updated = watchlist.filter(m => m.id !== id);
  //   setWatchlist(updated);
  // };

  return (
      <div style={{ backgroundColor: "#222831",color: "#EEEEEE", minHeight: "100vh", padding: "2rem" }}>
      <Router>
        <nav style={{marginBottom: 20}}>
          <Link to="/">🔍 Search</Link> |<Link to="/watchlist">📺 Watchlist ({watchlist.length})</Link>
        </nav>
        <Routes>
          <Route path='/' element={<SearchPage onAdd={handleAddToWatchlist}/>}
          />
          <Route path='/watchlist' element={<WatchlistPage watchlist={watchlist} onRemove={handleRemoveFromWatchlist}/>}
          />
          <Route path="/movie/:id" element={<MovieDetailPage/>}
          /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
