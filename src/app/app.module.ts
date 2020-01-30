import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {MyCustomDirective} from './directives/my-custom.directive';
import {DropdownDirective} from './directives/dropdown.directive';
import {MoviesListComponent} from './movies/movies-list/movies-list.component';
import {MoviesListItemComponent} from './movies/movies-list-item/movies-list-item.component';
import {TvShowsListComponent} from './tv-shows-list/tv-shows-list.component';
import {MoviesDetailsComponent} from './movies/movies-details/movies-details.component';
import {PeopleListComponent} from './people/people-list/people-list.component';
import {MoviesFiltersComponent} from './movies/movies-list/movies-filters/movies-filters.component';
import {FilterPipe} from './pipes/filter.pipe';
import {PeopleListItemComponent} from './people/people-list/people-list-item/people-list-item.component';
import {PeopleDetailsComponent} from './people/people-list/people-details/people-details.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthComponent} from './auth/auth/auth.component';
import {AlertModule, BsDropdownModule, ButtonsModule, PaginationModule} from 'ngx-bootstrap';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {WatchlistComponent} from './watchlist/watchlist.component';
import { ProfileComponent } from './profile/profile.component';
import {AngularFireStorageModule} from '@angular/fire/storage';

@NgModule({
    declarations: [
        AppComponent,
        MyCustomDirective,
        DropdownDirective,
        MoviesListComponent,
        MoviesListItemComponent,
        TvShowsListComponent,
        MoviesDetailsComponent,
        PeopleListComponent,
        MoviesFiltersComponent,
        FilterPipe,
        PeopleListItemComponent,
        PeopleDetailsComponent,
        AuthComponent,
        LoadingSpinnerComponent,
        WatchlistComponent,
        ProfileComponent,
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.fireBase),
        PaginationModule.forRoot(),
        ButtonsModule.forRoot(),
        AlertModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
