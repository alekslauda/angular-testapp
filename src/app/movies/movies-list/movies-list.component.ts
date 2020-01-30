import {TmdbService} from './../../services/tmdb.service';
import {Component, OnInit} from '@angular/core';
import {Movie} from 'src/app/models/movie';
import {MovieListFilter} from '../../models/filters/MovieListFilter';
import {TMDB_FILTERS} from '../../services/tmdb.filters';
import {timestamp} from 'rxjs/internal/operators';
import {AuthService} from '../../services/auth.service';
import {FirestoreUser} from '../../models/user';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
    movies: Movie[];

    user: FirestoreUser;

    movieListFilter: MovieListFilter;

    constructor(private tmdbService: TmdbService, private authService: AuthService, private loadingService: LoadingService) {
        this.movieListFilter = new MovieListFilter(1, 'en');
        this.authService.user.subscribe(user => this.user = user);
    }

    ngOnInit() {

        this.loadingService.show();
        this.tmdbService
            .getMovies(this.movieListFilter)
            .subscribe((response: { results: Movie[], total_results: number }) => {
                this.movies = response.results;
                this.movieListFilter.total_results = response.total_results;
                this.loadingService.hide();
            });
    }

    pageChanged(event) {
        this.movieListFilter.page = event.page;
        this.loadingService.show();

        this.tmdbService
            .getMovies(this.movieListFilter)
            .subscribe((response: { results: Movie[], total_results: number }) => {
                this.movies = response.results;
                this.movieListFilter.total_results = response.total_results;
                this.loadingService.hide();
            });
    }

    onSearchedYear(value) {
        this.movieListFilter.setFilterValue('primary_release_year', value, 'None');
        this.loadingService.show();

        this.tmdbService
            .getMovies(this.movieListFilter)
            .subscribe((response: { results: Movie[], total_results: number }) => {
                this.movies = response.results;
                this.movieListFilter.total_results = response.total_results;
                this.loadingService.hide();
            });
    }

    onSearchedGenre(value) {
        this.movieListFilter.setFilterValue('with_genres', value, TMDB_FILTERS.GENRES[0].value);
        this.loadingService.show();

        this.tmdbService
            .getMovies(this.movieListFilter)
            .subscribe((response: { results: Movie[], total_results: number }) => {
                this.movies = response.results;
                this.movieListFilter.total_results = response.total_results;
                this.loadingService.hide();
            });
    }

    onSearchedSort(value) {
        this.movieListFilter.setFilterValue('sort_by', value, TMDB_FILTERS.SORT_OPTIONS[0].value);
        this.loadingService.show();

        this.tmdbService
            .getMovies(this.movieListFilter)
            .subscribe((response: { results: Movie[], total_results: number }) => {
                this.movies = response.results;
                this.movieListFilter.total_results = response.total_results;
                this.loadingService.hide();
            });
    }
}
