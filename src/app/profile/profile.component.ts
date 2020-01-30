import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FirestoreUser} from '../models/user';
import {LoadingService} from '../services/loading.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: FirestoreUser;

    updateUserForm: FormGroup;

    profileUpdateMessage: string;

    filedBeingUploaded: boolean = false;

    constructor(private authService: AuthService, private loadingService: LoadingService, private afStorage: AngularFireStorage) {
        this.profileUpdateMessage = '';
    }

    ngOnInit() {
        this.loadingService.show();

        this.authService.user.subscribe(u => {
            this.user = u;

            this.updateUserForm = new FormGroup({
                email: new FormControl(u.email, [Validators.required, Validators.email]),
                displayName: new FormControl(u.displayName),
                phoneNumber: new FormControl(u.phoneNumber),
                image: new FormControl({name: 'Choose file'})
            });
            this.loadingService.hide();
        });

    }

    handleFileInput(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.filedBeingUploaded = !this.filedBeingUploaded;
            this.updateUserForm.patchValue({
                image: file
            });

            this.uploadProfilePhoto(file);
        }
    }

    deleteProfilePhoto(downloadUrl) {
        this.loadingService.show();
        this.filedBeingUploaded = false;

        this.updateUserForm.patchValue({
            image: {
                name: 'Choose file'
            }
        });

        this.afStorage.storage.refFromURL(downloadUrl).delete().then(() => {
            this.user.photoURL = null;
            this.loadingService.hide();
        }).catch(error => {
            this.loadingService.hide();
            console.log(error);
        });
    }

    uploadProfilePhoto(file) {

        if (!file) {
            return;
        }

        this.loadingService.show();

        const randomId = Math.random().toString(36).substring(2);
        const ref = this.afStorage.ref(randomId);

        ref.put(file).then((c: UploadTaskSnapshot) => {
            c.ref.getDownloadURL().then(downloadURL => {
                this.user.photoURL = downloadURL;
                this.loadingService.hide();
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    onUpdateUserFormSubmit() {

        const formUser = this.updateUserForm.value;
        const updatedUser = {
            ...this.user,
            email: formUser.email,
            displayName: formUser.displayName,
            phoneNumber: formUser.phoneNumber,
        };

        this.loadingService.show();

        this.authService.updateUserInfo(updatedUser)
            .then(success => {
                this.profileUpdateMessage = 'Your profile was successfully updated.';
                this.loadingService.hide();
            })
            .catch(error => {
                this.loadingService.hide();
                console.log(error);
            });
    }
}
