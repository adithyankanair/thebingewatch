import MovieCard from "../components/MovieCard";

export default function WatchlistPage({ watchlist, onRemove }) {
    return (
        <div>
            <h2>🎞️ My Watchlist</h2>
            {watchlist.length === 0 && <p>No movies added yet.</p>}
            {watchlist.map(movie => (
                <MovieCard
                 key={movie.id} 
                 movie={movie}
                 onRemove={onRemove}
                 showRemove={true} 
                />
            ))}
        </div>
    );
}