from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
import sqlite3
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

def init_db():
    conn = sqlite3.connect("watchlist.db")
    cursor = conn.cursor()
    cursor.execute("""
                   CREATE TABLE IF NOT EXISTS watchlist (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                    movie_id INTEGER UNIQUE,
                   title TEXT,
                   poster_path TEXT,
                   release_date TEXT
                   )
        """)
    conn.commit()
    conn.close()
init_db()



@app.route('/api/search')
def search_movies():
    query = request.args.get('q')
    if not query:
        return jsonify({"error": "Query missing"}), 400
    
    url = f'https://api.themoviedb.org/3/search/movie?query={query}&api_key={TMDB_API_KEY}'
    response = requests.get(url)
    return jsonify(response.json())


@app.route('/api/movie/<movie_id>')
def get_movie_details(movie_id):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US'
    response = requests.get(url)
    return jsonify(response.json())

@app.route('/api/watchlist',methods=['GET'])
def get_watchlist():
    conn = sqlite3.connect("watchlist.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM watchlist")
    rows = cursor.fetchall()
    conn.close()

    watchlist = [{
        "id": row[0],
        "movie_id": row[1],
        "title": row[2],
        "poster_path": row[3],
        "release_date": row[4]
    }for row in rows]

    return jsonify(watchlist)

@app.route('/api/watchlist', methods=['POST'])
def add_to_watchlist():
    data = request.json
    conn = sqlite3.connect("watchlist.db")
    cursor = conn.cursor()
    try:
        cursor.execute("""
    INSERT INTO watchlist (movie_id, title, poster_path, release_date) VALUES(?,?,?,?)
""",(data['id'],data['title'],data['poster_path'],data['release_date']))
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({"error": "Movie already in watchlist"}), 409
    finally:
        conn.close()
    
    return jsonify({"message": "Added successfully"}),201


@app.route('/api/watchlist/<int:movie_id>', methods=['DELETE'])
def remove_from_watchlist(movie_id):
    conn = sqlite3.connect("watchlist.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM watchlist WHERE movie_id = ?",(movie_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Removed from watchlist"}),200

if __name__ == '__main__':
    app.run(debug=True)

    