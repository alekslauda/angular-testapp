import {Component, OnInit} from '@angular/core';
import {TvShow} from '../models/tv-show';
import {TmdbService} from '../services/tmdb.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-tv-shows-list',
    templateUrl: './tv-shows-list.component.html',
    styleUrls: ['./tv-shows-list.component.scss']
})
export class TvShowsListComponent implements OnInit {

    tvShows: Observable<TvShow[]>;

    constructor(private tmdbService: TmdbService) {
    }

    ngOnInit() {
        this.tvShows = this.tmdbService.getTvShows().pipe(
            map((response: { results: TvShow[] }) => response.results)
        );
    }

}
