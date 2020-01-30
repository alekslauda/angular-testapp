import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MovieListFilter} from '../models/filters/MovieListFilter';

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    MOVIES_URL = `${environment.tmdb.API_URL}/discover/movie?api_key=${environment.tmdb.API_KEY}`;
    MOVIE_DETAILS_URL = `${environment.tmdb.API_URL}/movie/:id?api_key=${environment.tmdb.API_KEY}`;

    TV_SHOWS_URL = `${environment.tmdb.API_URL}/discover/tv?api_key=${environment.tmdb.API_KEY}`;

    PEOPLE_URL = `${environment.tmdb.API_URL}/person/popular?api_key=${environment.tmdb.API_KEY}&language=en&page=1`;
    PERSON_URL = `${environment.tmdb.API_URL}/person/:id?api_key=${environment.tmdb.API_KEY}`;
    PERSON_MOVIES_URL = `${environment.tmdb.API_URL}/person/:id/movie_credits?api_key=${environment.tmdb.API_KEY}`;

    getMovies(filter: MovieListFilter) {
        return this.httpClient.get(this.MOVIES_URL, {params: this.filterParams(filter)});
    }

    constructor(private httpClient: HttpClient) {
    }

    getMovieDetails(id: string) {
        const endpoint = this.MOVIE_DETAILS_URL.replace(':id', id);
        return this.httpClient.get(endpoint);
    }

    getPeople() {
        return this.httpClient.get(this.PEOPLE_URL);
    }

    getPerson(id: string) {
        const endpoint = this.PERSON_URL.replace(':id', id);
        return this.httpClient.get(endpoint);
    }

    getPersonMovies(personId: string) {
        const endpoint = this.PERSON_MOVIES_URL.replace(':id', personId);
        return this.httpClient.get(endpoint);
    }

    getTvShows() {
        return this.httpClient.get(this.TV_SHOWS_URL);
    }

    filterParams(filter) {
        Object.keys(filter).forEach((key) => {
            if (filter[key] == null) {
                delete filter[key];
            }
            return filter;
        });
        return filter;
    }
}
