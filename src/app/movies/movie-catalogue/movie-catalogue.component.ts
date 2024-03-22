import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-catalogue',
  templateUrl: './movie-catalogue.component.html',
})
export class MovieCatalogueComponent implements OnInit, OnDestroy {
  private getPopularSubscription$: Subscription;

  movies: Movie[] = [];
  page = 1;

  constructor(private moviesService: MoviesService) {
    this.getPopularSubscription$ = Subscription.EMPTY;
  }

  ngOnInit() {
    this.getPopularSubscription$ = this.moviesService
      .getPopular(this.page)
      .subscribe((response) => {
        this.movies = response.results;
      });
  }

  ngOnDestroy() {
    if (this.getPopularSubscription$) {
      this.getPopularSubscription$.unsubscribe();
    }
  }

  onScroll() {
    this.page++;
    this.getPopularSubscription$ = this.moviesService
      .getPopular(this.page)
      .subscribe((response) => {
        this.movies = [...this.movies, ...response.results];
      });
  }
}
