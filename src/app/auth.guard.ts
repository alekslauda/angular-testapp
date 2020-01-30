import {Injectable} from '@angular/core';
import {
    CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,
    Router, NavigationExtras
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, timestamp} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private authService: AuthService, private angularFireAuth: AngularFireAuth, private  router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkLogin(state.url);
    }

    canLoad(route: Route,
            segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkLogin(`/${route.path}`);
    }

    private checkLogin(url: string) {
        return this.angularFireAuth.authState.pipe(
            map(auth => {
                if (auth === null) {

                    const sessionId = +new Date();
                    // this.authService.redirectUrl = url;

                    const navigationExtras: NavigationExtras = {
                        queryParams: {session_id: sessionId},
                        fragment: 'anchor'
                    };

                    this.router.navigate(['/auth'], navigationExtras);
                    return false;
                } else {
                    return true;
                }
            })
        );
    }
}
