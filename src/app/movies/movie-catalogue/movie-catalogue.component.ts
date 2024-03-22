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

  constructor(private moviesService: MoviesService) {
    this.getPopularSubscription$ = Subscription.EMPTY;
  }

  ngOnInit() {
    this.getPopularSubscription$ = this.moviesService
      .getPopular()
      .subscribe((response) => {
        this.movies = response.results;
      });
  }

  ngOnDestroy() {
    if (this.getPopularSubscription$) {
      this.getPopularSubscription$.unsubscribe();
    }
  }
}
