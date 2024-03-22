import { Component, Input } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  get imageUrl() {
    return `https://image.tmdb.org/t/p/w300${this.movie.poster_path}`;
  }

  get imageAlt() {
    return `${this.movie.title} movie poster`;
  }
}
