import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-video-player',
  templateUrl: './movie-video-player.component.html',
})
export class MovieVideoPlayerComponent {
  @Input() videoUrl: string;

  getVideoUrl() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  constructor(private domSanitizer: DomSanitizer) {
    this.videoUrl = '';
  }
}
