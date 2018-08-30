<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" :key="movie.movie.id" class="movie" :movie="movie.movie"></movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            No results for {{genre}}
        </div>
        <div v-else class="no-results">
          Loading...
        </div>
    </div>
</template>

<script>
import genres from '../util/genres'
import MovieItem from './MovieItem.vue'

export default {
    components: {
        MovieItem
    },
    props: ["genre", "time", "movies"],
    data() {
        return {};
    },
    methods: {
        moviePassesGenreFilter(movie) {
            if (!this.genre.length) {
                return true;
            } else {
                let movieGenres = movie.movie.Genre.split(", ")
                let matched = true
                this.genre.forEach(genre => {
                    if (movieGenres.indexOf(genre) === -1) {
                        matched = false;
                    }
                })
                return matched;
            }
        }
    },
    computed: {
        filteredMovies() {
            return this.movies.filter(this.moviePassesGenreFilter);
        }
    }
};
</script>

