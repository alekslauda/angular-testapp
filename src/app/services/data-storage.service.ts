import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreMovie, Movie} from '../models/movie';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private httpClient: HttpClient,
                private authService: AuthService,
                private angularFireAuth: AngularFireAuth,
                private angularFirestore: AngularFirestore) {
    }

    addToWatchLater(movie: Movie, userid: string, callback: any) {
        const movieDetails = {
            userId: userid,
            movieId: movie.id,
            date: new Date(),
            original_title: movie.original_title,
            poster_path: movie.poster_path,
            watched: false,
        };

        return this.angularFirestore
            .doc(`Playlist/${userid}`)
            .collection('watchlist')
            .doc(`${movie.id}`)
            .set(movieDetails)
            .then(success => callback())
            .catch(error => callback(error));
    }

    addToFavorites(movie: Movie, userid: string, callback: any) {
        const movieDetails = {
            userId: userid,
            movieId: movie.id,
            date: new Date(),
            original_title: movie.original_title,
            poster_path: movie.poster_path,
            watched: false,
        };

        return this.angularFirestore
            .doc(`Playlist/${userid}`)
            .collection('favorites')
            .doc(`${movie.id}`)
            .set(movieDetails)
            .then(success => callback())
            .catch(error => callback(error));
    }

    getWatchlist(userId: string) {
        return this.angularFirestore
            .doc(`Playlist/${userId}`)
            .collection('watchlist')
            .valueChanges();
    }

    getMovieFromWatchlist(userId: string | number, movieId: string | number) {
        return this.angularFirestore
            .doc(`Playlist/${userId}`)
            .collection('watchlist')
            .doc(`${movieId}`)
            .valueChanges();
    }

    getFavorites(userId: string) {
        return this.angularFirestore
            .doc<FirestoreMovie[]>(`Playlist/${userId}`)
            .collection('favorites')
            .valueChanges();
    }

    updateWatchList(movie: { movieId: string | number, watched: boolean }, userId: string, callback: any) {
        return this.angularFirestore
            .doc(`Playlist/${userId}`)
            .collection('watchlist')
            .doc(`${movie.movieId}`)
            .update(movie)
            .then(success => callback())
            .catch(error => callback(error));
    }

    deleteWatchlistMovie(movieId: string | number, userId: string, callback: any) {
        return this.angularFirestore
            .doc(`Playlist/${userId}`)
            .collection('watchlist')
            .doc(`${movieId}`)
            .delete()
            .then(success => callback())
            .catch(error => callback(error));
    }
}
