import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../review.model';
import { Video } from '../video.model';
import { MovieDetails } from './movie-details.model';
import { take } from 'rxjs';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  reviews: Review[];
  videoUrls: string[];
  similar: Movie[];
  details?: MovieDetails;

  constructor(private activatedRoute: ActivatedRoute) {
    this.reviews = [];
    this.similar = [];
    this.videoUrls = [];
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      this.reviews = data['reviews'].results;
      this.similar = data['similar'].results;
      this.details = data['details'];

      this.videoUrls = (data['videos'] as Video)?.results
        .filter((video) => video.site === 'YouTube')
        .sort((a) => {
          if (a.type === 'Trailer' || a.official) {
            return -1;
          }

          return 1;
        })
        .map((video) => `https://www.youtube.com/embed/${video.key}`);
    });
  }
}
