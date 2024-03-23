import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-video-player',
  templateUrl: './movie-video-player.component.html',
})
export class MovieVideoPlayerComponent {
  @Input() videoUrl: string;

  constructor(private domSanitizer: DomSanitizer) {
    this.videoUrl = '';
  }

  ngOnChanges() {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.videoUrl
    ) as string;
  }
}
