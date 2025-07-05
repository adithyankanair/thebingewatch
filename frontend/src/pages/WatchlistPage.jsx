import MovieCard from "../components/MovieCard";

export default function WatchlistPage({ watchlist, onRemove }) {
    return (
        <div>
            <h2>🎞️ My Watchlist</h2>
            {watchlist.length === 0 && <p>No movies added yet.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {watchlist.map(movie => (
                <MovieCard
                key={movie.id || movie.movie_id} 
                movie={movie}
                onRemove= {() => onRemove(movie.movie_id || movie.id)}
                showRemove={true} 
                />
            ))}
            </div>
        </div>
    );
}