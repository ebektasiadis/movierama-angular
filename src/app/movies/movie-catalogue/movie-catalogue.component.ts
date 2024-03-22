import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-catalogue',
  templateUrl: './movie-catalogue.component.html',
})
export class MovieCatalogueComponent implements OnInit, OnDestroy, OnChanges {
  @Input() query: string = '';

  private _getPopularSubscription$: Subscription;
  private _searchSubscription$: Subscription;

  movies: Movie[] = [];
  page = 1;

  constructor(private moviesService: MoviesService) {
    this._getPopularSubscription$ = Subscription.EMPTY;
    this._searchSubscription$ = Subscription.EMPTY;
  }

  /**
   * FIXME: I really don't like this approach, it's not scalable and it's not maintainable.
   */
  ngOnChanges() {
    this.page = 1;

    if (this._searchSubscription$ && !this.query) {
      this._searchSubscription$.unsubscribe();
    }

    if (this._getPopularSubscription$ && this.query) {
      this._getPopularSubscription$.unsubscribe();
    }

    if (this.query) {
      this._searchSubscription$ = this.moviesService
        .getByQuery(this.query, this.page)
        .subscribe((response) => {
          this.movies = response.results;
        });
      return;
    }

    this._getPopularSubscription$ = this.moviesService
      .getPopular(this.page)
      .subscribe((response) => {
        this.movies = response.results;
      });
  }

  ngOnInit() {
    this._getPopularSubscription$ = this.moviesService
      .getPopular(this.page)
      .subscribe((response) => {
        this.movies = response.results;
      });
  }

  ngOnDestroy() {
    if (this._getPopularSubscription$) {
      this._getPopularSubscription$.unsubscribe();
    }
  }

  onScroll() {
    this.page++;
    this._getPopularSubscription$ = this.moviesService
      .getPopular(this.page)
      .subscribe((response) => {
        this.movies = [...this.movies, ...response.results];
      });
  }
}
