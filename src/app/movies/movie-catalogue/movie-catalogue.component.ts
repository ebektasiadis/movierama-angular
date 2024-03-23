import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-catalogue',
  templateUrl: './movie-catalogue.component.html',
})
export class MovieCatalogueComponent implements OnInit, OnDestroy {
  private _querySubscription$: Subscription;

  movies: Movie[] = [];
  page = 1;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {
    this._querySubscription$ = Subscription.EMPTY;
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      this.movies = data['movies'].results;
    });

    this._querySubscription$ = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.page = 1;
        this.getMovies(params['query']);
      }
    );
  }

  ngOnDestroy() {
    this._querySubscription$.unsubscribe();
  }

  getMovies(query: string) {
    if (query) {
      this.moviesService
        .getByQuery(query, this.page)
        .pipe(take(1))
        .subscribe((response) => {
          this.movies = response.results;
        });

      return;
    }

    this.moviesService
      .getPopular(this.page)
      .pipe(take(1))
      .subscribe((response) => {
        this.movies = response.results;
      });
  }

  onScroll() {
    this.page++;
    this.moviesService
      .getPopular(this.page)
      .pipe(take(1))
      .subscribe((response) => {
        this.movies.push(...response.results);
      });
  }

  movieTrackBy(_: number, movie: Movie) {
    return movie.id;
  }
}
