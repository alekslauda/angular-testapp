// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    tmdb: {
        API_URL: 'https://api.themoviedb.org/3',
        API_KEY: '26aea44a8fc723eba9e717a1557ca18e'
    },
    fireBase: {
        apiKey: 'AIzaSyAZfFYukP1PuYyTiG8hiUnl8QPvni7G6SU',
        authDomain: 'movies-8e1c2.firebaseapp.com',
        databaseURL: 'https://movies-8e1c2.firebaseio.com',
        projectId: 'movies-8e1c2',
        storageBucket: 'movies-8e1c2.appspot.com',
        messagingSenderId: '451793416643',
        appId: '1:451793416643:web:8067a44229366b730d8d76'
    }
}
;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
