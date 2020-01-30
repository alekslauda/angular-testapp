import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Movie} from 'src/app/models/movie';
import {DataStorageService} from '../../services/data-storage.service';
import {FirestoreUser} from '../../models/user';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-movies-list-item',
    templateUrl: './movies-list-item.component.html',
    styleUrls: ['./movies-list-item.component.scss']
})
export class MoviesListItemComponent implements OnInit {

    @Input() movie: Movie;

    @Input() user: FirestoreUser;

    isAddedToWatchlist: boolean;

    constructor(private dataStorageService: DataStorageService, private loadingService: LoadingService) {
    }


    ngOnInit() {
        this.dataStorageService.getMovieFromWatchlist(this.user.uid, this.movie.id.toString()).subscribe(res => {
            this.isAddedToWatchlist = (typeof res !== 'undefined');
        });
    }

    removeFromWatchlist() {
        this.loadingService.show();

        this.dataStorageService.deleteWatchlistMovie(this.movie.id, this.user.uid, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('success');
            }
            this.loadingService.hide();
        });
    }

    addToWatchlist() {
        this.loadingService.show();


        this.dataStorageService.addToWatchLater(this.movie, this.user.uid, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('success');
            }
            this.loadingService.hide();
        });
    }

    addToFavorites() {

    }
}
