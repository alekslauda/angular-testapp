import { TmdbService } from './../../services/tmdb.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from 'src/app/models/movie';


@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TmdbService) { }

  private movie: Movie;

  ngOnInit() {
    const movieId = this.activatedRoute.snapshot.paramMap.get('id');

    this.tmdbService.getMovieDetails(movieId).subscribe( (response: Movie) => {
      this.movie = response;
    });
  }

}
