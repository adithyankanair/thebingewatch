export default function MovieCard({movie, onAdd, onRemove, showRemove}) {
    return (
        <div style={{border: '1px solid #ccc',padding: 10,margin: 10}}>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>

            {onAdd && <button onClick={() => onAdd(movie)}>➕ Add to Watchlist</button>}
            {showRemove && <button onClick={() => onRemove(movie.id)}>❌ Remove</button>}
        </div>
    );
}