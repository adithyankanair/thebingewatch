from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

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


if __name__ == '__main__':
    app.run(debug=True)

    