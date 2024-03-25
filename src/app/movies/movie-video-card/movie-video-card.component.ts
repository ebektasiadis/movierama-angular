import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../video.model';

@Component({
  selector: 'app-movie-video-card',
  templateUrl: './movie-video-card.component.html',
})
export class MovieVideoCardComponent {
  @Input() video?: Video['results'][number];
  @Input() isSelected: boolean;

  @Output() select: EventEmitter<Video['results'][number]>;

  constructor() {
    this.isSelected = false;
    this.select = new EventEmitter();
  }

  onClick() {
    if (!this.video) {
      return;
    }

    console.log('here');

    this.select.next(this.video);
  }
}
