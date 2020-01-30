import { Component, OnInit } from '@angular/core';
import { Movie } from './models/movie';
import {AuthService} from './services/auth.service';
import {FirestoreUser} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Movies';
  movies: Movie[];
  user: FirestoreUser;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => this.user = user);
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {

  }
}
