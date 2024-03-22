import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-catalogue',
  templateUrl: './movie-catalogue.component.html',
})
export class MovieCatalogueComponent implements OnInit, OnDestroy {
  private _querySubscription$: Subscription;
  private _getPopularSubscription$: Subscription;
  private _searchSubscription$: Subscription;

  movies: Movie[] = [];
  page = 1;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {
    this._getPopularSubscription$ = Subscription.EMPTY;
    this._searchSubscription$ = Subscription.EMPTY;
    this._querySubscription$ = Subscription.EMPTY;
  }

  ngOnInit() {
    this._getPopularSubscription$ = this.moviesService
      .getPopular(this.page)
      .subscribe((response) => {
        this.movies = response.results;
      });

    this.activatedRoute.queryParamMap.subscribe((paramsMap) => {
      this.page = 1;
      if (!paramsMap.has('query')) {
        this._getPopularSubscription$ = this.moviesService
          .getPopular(this.page)
          .subscribe((response) => {
            this.movies = response.results;
          });

        return;
      }

      this._searchSubscription$ = this.moviesService
        .getByQuery(paramsMap.get('query') as string, this.page)
        .subscribe((response) => {
          this.movies = response.results;
        });
    });
  }

  ngOnDestroy() {
    if (this._getPopularSubscription$) {
      this._getPopularSubscription$.unsubscribe();
    }

    if (this._searchSubscription$) {
      this._searchSubscription$.unsubscribe();
    }

    if (this._querySubscription$) {
      this._querySubscription$.unsubscribe();
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
