import { Component, Input } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-hover-details',
  templateUrl: './movie-hover-details.component.html',
})
export class MovieHoverDetailsComponent {
  @Input() movie!: Movie;

  get stars() {
    // The vote_average is a number between 0 and 10, so we divide it by 2 to get a number between 0 and 5
    const starsAmount = Math.floor(this.movie.vote_average / 2);
    return new Array(5).fill(false).map((_, index) => index < starsAmount);
  }
}
