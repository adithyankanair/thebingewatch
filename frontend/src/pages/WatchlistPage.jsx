import MovieCard from "../components/MovieCard";

export default function WatchlistPage({ watchlist, onRemove }) {
    return (
        <div className='container'>
            <h2>🎞️ My Watchlist</h2>
            {watchlist.length === 0 && <p>No movies added yet.</p>}
            <div className="row g-3">

            {watchlist.map(movie => (
                <div className='col-6 col-md-4 col-lg-3' key={movie.id}>
                    <MovieCard
                    key={movie.id || movie.movie_id} 
                    movie={movie}
                    onRemove= {() => onRemove(movie.movie_id || movie.id)}
                    showRemove={true} 
                    />
                </div>
            ))}
            </div>
        </div>
    );
}