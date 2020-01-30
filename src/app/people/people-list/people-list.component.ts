import {TmdbService} from '../../services/tmdb.service';
import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {Person} from '../../models/person';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
    people: Observable<Person[]>;
    searchText: string;

    constructor(private tmdbService: TmdbService) {
        this.searchText = '';
    }

    ngOnInit() {
        this.people = this.tmdbService.getPeople().pipe(
            map((response: { results: Person[] }) => {
                return response.results;
            })
        );
    }
}
