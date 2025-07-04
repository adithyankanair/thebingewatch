import { Link } from 'react-router-dom';

export default function MovieCard({movie, onAdd, onRemove, showRemove}) {
    const posterUrl = movie.poster_path ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/150x225?text=No+Image';

    return (
        <div style={{border: '1px solid #ccc',
        padding: 10,
        margin: 10,
        display: 'flex',
        gap: 20
        }}>
            <img src={posterUrl} alt={movie.title} width="150" style={{ borderRadius: '8px'}}/>
            <div>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>

                {onAdd && <button onClick={() => onAdd(movie)}>➕ Add to Watchlist</button>}
                {showRemove && <button onClick={() => onRemove(movie.id)}>❌ Remove</button>}
                <br/>
                <Link to={`/movie/${movie.id}`} style={{textDecoration: 'underline', color: 'blue',}}>
                    🎬 View Details
                </Link>
            </div>
        </div>
    );
}