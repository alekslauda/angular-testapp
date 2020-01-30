import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    authChoice: string;
    loginForm: FormGroup;
    registerForm: FormGroup;
    loginError: string;
    registerError: string;


    constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) {
        this.authChoice = 'login';
        this.loginError = '';
        this.registerError = '';
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required
            ])
        });

        this.registerForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        });

        this.loadingService.hide();
    }

    onSubmitLoginForm() {
        this.registerError = '';

        this.authService.loginWithEmailAndPassword(this.loginForm.value, (error) => {
            if (error) {
                this.loginError = error.message;
            } else {
                this.router.navigate(['/movies']);
            }
        });
    }

    onSubmitRegisterForm() {
        this.loginError = '';
        this.authService.registerWithEmailAndPassword(this.registerForm.value, (error) => {
            if (error) {
                this.registerError = error.message;
            } else {
                this.router.navigate(['/movies']);
            }
        });
    }

    loginWithOauth(provider: string) {
        this.authService.loginWithOauth(provider);
    }

    logout() {
        this.authService.logout();
    }
}
