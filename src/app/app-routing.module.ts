import {PeopleListComponent} from './people/people-list/people-list.component';
import {TvShowsListComponent} from './tv-shows-list/tv-shows-list.component';
import {MoviesDetailsComponent} from './movies/movies-details/movies-details.component';
import {MoviesListComponent} from './movies/movies-list/movies-list.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PeopleDetailsComponent} from './people/people-list/people-details/people-details.component';
import {AuthComponent} from './auth/auth/auth.component';
import {AuthGuard} from './auth.guard';
import {WatchlistComponent} from './watchlist/watchlist.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full'
    },

    {
        path: 'movies',
        component: MoviesListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'movies/:id',
        component: MoviesDetailsComponent
    },
    {
        path: 'people',
        component: PeopleListComponent
    },
    {
        path: 'people/:id',
        component: PeopleDetailsComponent
    },
    {
        path: 'tv-shows',
        component: TvShowsListComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'watchlist',
        component: WatchlistComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
