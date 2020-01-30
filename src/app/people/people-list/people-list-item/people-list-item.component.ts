import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../../models/person';

@Component({
    selector: 'app-people-list-item',
    templateUrl: './people-list-item.component.html',
    styleUrls: ['./people-list-item.component.scss']
})
export class PeopleListItemComponent implements OnInit {

    @Input() person: Person;

    constructor() {
    }

    ngOnInit() {
    }

    formatKnownFor(knownFor: any[]) {
        return knownFor.map( item => {
           if (item.media_type === 'movie') {
               return item.title;
           }
           return item.name;
        });
    }
}
