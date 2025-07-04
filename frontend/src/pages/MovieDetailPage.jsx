import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            const res = await axios.get(
                `http://localhost:5000/api/movie/${id}`
            );
            setMovie(res.data);
        }
        fetchMovie();
    },[id]);
    if (!movie) return <p>Loading movie...</p>;

    const posterUrl = movie.poster_path ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/150x225?text=No+Image';

    return (
        <div style={{ padding: 20}}>
            <h2>{movie.title}</h2>
            <img src={posterUrl} alt={movie.title} style={{borderRadius: '8px'}}/>
            <p><strong>Release:</strong>{movie.release_date}</p>
            <p><strong>Rating:</strong>{movie.vote_average}</p>
            <p><strong>Genres:</strong>{movie.genres.map(g=>g.name).join(', ')}</p>
            <p><strong>Overview:</strong>{movie.overview}</p>
            
        </div>
    );
}