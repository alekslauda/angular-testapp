import {Component, OnInit} from '@angular/core';
import {PersonDetails} from '../../../models/person';
import {ActivatedRoute} from '@angular/router';
import {TmdbService} from '../../../services/tmdb.service';
import {forkJoin} from 'rxjs';
import {MovieCast} from '../../../models/movie';

@Component({
    selector: 'app-people-details',
    templateUrl: './people-details.component.html',
    styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit {

    person: PersonDetails;
    movies: MovieCast[];

    constructor(private activatedRoute: ActivatedRoute, private tmdbService: TmdbService) {
    }

    ngOnInit() {

        const personId = this.activatedRoute.snapshot.paramMap.get('id');
        const getPerson = this.tmdbService.getPerson(personId);
        const getPersonMovies = this.tmdbService.getPersonMovies(personId);

        /**
         * this combine observables and is called only when the observables are updated
         */
        forkJoin([getPerson, getPersonMovies]).subscribe(([person, res]) => {
            this.person = person as PersonDetails;
            const personMovies: any = res;
            this.movies = personMovies.cast
        });
    }

}
