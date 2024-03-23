import { Component, Input } from '@angular/core';
import { Review } from '../../review.model';

@Component({
  selector: 'app-movie-reviews-item',
  templateUrl: './movie-reviews-item.component.html',
})
export class MovieReviewsItemComponent {
  @Input() review!: Review;

  getAvatarUrl() {
    if (!this.review.author_details.avatar_path) {
      return `https://www.gravatar.com/avatar/`;
    }
    return `https://image.tmdb.org/t/p/w45${this.review.author_details.avatar_path}`;
  }
}
