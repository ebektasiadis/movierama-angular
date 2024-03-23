import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../review.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-movie-reviews-list',
  templateUrl: './movie-reviews-list.component.html',
})
export class MovieReviewsListComponent implements OnInit {
  @Input() reviews: Review[];

  private movieId: number;
  private page: number;
  private maxPages: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {
    this.reviews = [];
    this.movieId = 0;
    this.page = 1;
    this.maxPages = Infinity;
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.movieId = params['id'];
    });
  }

  onScroll() {
    this.page++;
    if (this.page > this.maxPages) {
      return;
    }
    this.moviesService
      .getReviewsById(this.movieId, this.page)
      .pipe(take(1))
      .subscribe((response) => {
        this.reviews.push(...response.results);
        this.maxPages = response.total_pages;
      });
  }
}
