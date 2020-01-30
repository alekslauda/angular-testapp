import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { TMDB_FILTERS } from "src/app/services/tmdb.filters";

@Component({
  selector: "app-movies-filters",
  templateUrl: "./movies-filters.component.html",
  styleUrls: ["./movies-filters.component.scss"]
})
export class MoviesFiltersComponent implements OnInit {

  @Output() searchedYear = new EventEmitter<number>();
  @Output() searchedGenre = new EventEmitter<number>();
  @Output() searchedSort = new EventEmitter<string>();


  years: any[] = [];
  genres: any[];
  sortOptions: any[];
  discoverMovieForm: FormGroup;

  constructor() {
    this.years.push("None");
    for (let year = new Date().getFullYear(); year >= 1900; year--) {
      this.years.push(year);
    }
    this.genres = TMDB_FILTERS.GENRES;
    this.sortOptions = TMDB_FILTERS.SORT_OPTIONS;
  }

  ngOnInit() {
    this.discoverMovieForm = new FormGroup({
      discoverFromYear: new FormControl(this.years[0]),
      discoverFromGenres: new FormControl(this.genres[0]),
      discoverFromSortOptions: new FormControl(this.sortOptions[0])
    });

    this.discoverMovieForm
      .get("discoverFromYear")
      .valueChanges.subscribe(params => {
        this.searchedYear.emit(params);
      });

    this.discoverMovieForm
      .get("discoverFromGenres")
      .valueChanges.subscribe(params => {
        this.searchedGenre.emit(params.value);
      });

    this.discoverMovieForm
      .get("discoverFromSortOptions")
      .valueChanges.subscribe(params => {
        this.searchedSort.emit(params.value);
      });
  }
}
