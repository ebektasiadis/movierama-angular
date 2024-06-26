import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../review.model';
import { Video } from '../video.model';
import { MovieDetails } from './movie-details.model';
import { Subscription, take } from 'rxjs';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  reviews: Review[];
  videos: Video['results'];
  similarMovies: Movie[];
  details?: MovieDetails;
  selectedTab: string;
  selectedVideo?: Video['results'][number];

  private movieId: number;
  private page: number;
  private maxPages: number;

  private _data$: Subscription;
  private _params$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {
    this.reviews = [];
    this.similarMovies = [];
    this.videos = [];

    this._data$ = Subscription.EMPTY;
    this._params$ = Subscription.EMPTY;

    this.movieId = 0;
    this.page = 1;
    this.maxPages = Infinity;
    this.selectedTab = 'similar';
  }

  ngOnInit() {
    this._data$ = this.activatedRoute.data.subscribe((data) => {
      this.reviews = data['reviews'].results;
      this.similarMovies = data['similar'].results;
      this.details = data['details'];

      this.videos = (data['videos'] as Video)?.results
        .filter((video) => video.site === 'YouTube')
        .sort((a) => {
          if (a.type === 'Trailer' || a.official) {
            return -1;
          }

          return 1;
        });

      this.selectedVideo = this.videos[0];
    });

    this._params$ = this.activatedRoute.params.subscribe((params) => {
      this.movieId = params['id'];
    });
  }

  ngOnDestroy() {
    this._data$.unsubscribe();
    this._params$.unsubscribe();
  }

  onSimilarMoviesScroll() {
    this.page++;
    if (this.page > this.maxPages) {
      return;
    }
    this.moviesService
      .getSimilarById(this.movieId, this.page)
      .pipe(take(1))
      .subscribe((response) => {
        this.similarMovies.push(...response.results);
        this.maxPages = response.total_pages;
      });
  }

  onTabClick(tab: string) {
    this.selectedTab = tab;
  }

  onVideoClick(video: Video['results'][number]) {
    this.selectedVideo = video;
  }

  movieTrackBy(_: number, movie: Movie) {
    return movie.id;
  }
}
