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
        <div className='container'>
            <h2>Search Movies</h2>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..."/>
            <button onClick={searchMovies}>Search</button>
            <br/>
            <br/>
            <div className="row g-3">
                {movies.map(movie => (
                    <div className='col-6 col-md-4 col-lg-3' key={movie.id}>
                        <MovieCard key={movie.id} movie={movie} onAdd={onAdd}/>
                    </div>
                ))}
            </div>
        </div>
    );
}