import { useState } from 'react'
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    setMovies(res.data.results);
  };

  return (
    <div>
      <h1>The Binge Shelf</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder='Search...'/>
      <button onClick={searchMovies}>Search</button>
    
      {movies.map(movie => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
