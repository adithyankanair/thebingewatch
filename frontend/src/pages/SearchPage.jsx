import { useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default function SearchPage({onAdd}) {
    const [query, setQuery] = useState('');
    const[movies,setMovies] = useState([]);

    const searchMovies = async () => {
        const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
        setMovies(res.data.results);
    };

    return (
        <div>
            <h2>Search Movies</h2>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..."/>
            <button onClick={searchMovies}>Search</button>

            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onAdd={onAdd}/>
            ))}
        </div>
    );
}