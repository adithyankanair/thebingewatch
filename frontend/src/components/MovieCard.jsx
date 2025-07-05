import { Link } from 'react-router-dom';

export default function MovieCard({movie, onAdd, onRemove, showRemove}) {
    const posterUrl = movie.poster_path ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/150x225?text=No+Image';

    return (
        <div className="card h-100 border-0 shadow" style={{ backgroundColor: "#31363F", color: "#EEEEEE" }}>
            <img className="card-img-top" src={posterUrl} alt={movie.title} width="150" style={{ height: '220px', objectFit: 'cover' }}/>
            <div className="card-body d-flex flex-column">
                <h6 className="card-title mb-2">{movie.title}</h6>
                <p className="text-white-50 mb-2" style={{ fontsize: "0.8rem"}}>{movie.release_date}</p>
                
                <div className="mt-auto d-flex justify-content-between flex-wrap gap-2">
                    {onAdd && <button className="btn btn-sm" style={{ backgroundColor: "#76ABAE", color: "#222831" }} onClick={() => onAdd(movie)}>➕ Add to Watchlist</button>}
                    {showRemove && <button className="btn btn-sm btn-danger" onClick={() => onRemove(movie.id || movie.movie_id)}>❌ Remove</button>}
                    <br/>
                    <Link to={`/movie/${movie.id}`} className="btn btn-sm btn-outline-light ms-auto" style={{
                    backgroundColor: "transparent",
                    border: "1px solid #76ABAE",
                    color: "#76ABAE"}}>
                    🎬 View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}