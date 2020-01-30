import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../services/loading.service';
import {AuthService} from '../services/auth.service';
import {DataStorageService} from '../services/data-storage.service';
import {FirestoreUser} from '../models/user';
import {FirestoreMovie} from '../models/movie';
import { DocumentData } from '@angular/fire/firestore';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

    user: FirestoreUser;
    watchlist = [];
    watchedMovies = [];

    constructor(private loadingService: LoadingService,
                private authService: AuthService,
                private dataStorageService: DataStorageService) {
        this.loadingService.show();
    }

    ngOnInit() {
        this.authService.user.subscribe(u => {
            this.user = u;
            this.dataStorageService.getWatchlist(this.user.uid).subscribe(res => {
                this.watchlist = res.filter(movie => !movie.watched);
                this.watchedMovies = res.filter(movie => movie.watched);
            });
            this.loadingService.hide();
        });

    }

    toggleMovieWatched(movie) {
        const updatedMovie = {...movie, watched: !movie.watched};

        this.dataStorageService.updateWatchList(updatedMovie, this.user.uid, callback => {
            if (callback) {
                console.log(callback);
            } else {
                console.log('success edit');
            }
        });
    }

}
