import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {FirestoreUser} from '../models/user';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<FirestoreUser>;

    constructor(private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore) {
        this.user = this.angularFireAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.angularFireStore.doc(`/Users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    updateUserInfo(user) {
        const userReference: AngularFirestoreDocument<FirestoreUser> =
            this.angularFireStore.doc(`Users/${user.uid}`);

        const userInfo: FirestoreUser = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            uid: user.uid
        };
        return userReference.set(userInfo, {merge: true});
    }

    loginWithOauth(providerName: string) {
        this.angularFireAuth
            .auth
            .signInWithPopup(this.getProvider(providerName))
            .then(userInfo => {
                this.updateUserInfo(userInfo.user);
            }).catch(error => {
            console.log(error);
        });
    }

    getProvider(providerName: string) {
        switch (providerName) {
            case 'google':
                return new auth.GoogleAuthProvider();
                break;
            case 'facebook':
                return new auth.FacebookAuthProvider();
                break;
            case 'twitter':
                return new auth.TwitterAuthProvider();
                break;

        }
    }

    loginWithEmailAndPassword(credentials: { email: string, password: string }, callback: any) {
        return this.angularFireAuth
            .auth
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(userInfo => {
                callback();
                this.updateUserInfo(userInfo.user);
            }).catch(error => {
                callback(error);
                console.log('error', error);
            });
    }

    registerWithEmailAndPassword(credentials: { email: string, password: string }, callback: any) {
        return this.angularFireAuth
            .auth
            .createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(userInfo => {
                callback();
                console.log('user', userInfo);
            }).catch(error => {
                callback(error);
                console.log('error', error);
            });
    }

    logout() {
        this.angularFireAuth.auth.signOut().then(() => {
            console.log('logout');
        });
    }
}
