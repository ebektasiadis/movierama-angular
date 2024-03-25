import { NgModule, SecurityContext } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MagnifyingGlassSvgComponent } from './shared/svg/magnifying-glass-svg.component';
import { MoviesService } from './movies/movies.service';
import { httpInterceptorProviders } from '@/interceptors';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { MovieCatalogueComponent } from './movies/movie-catalogue/movie-catalogue.component';
import { MovieHoverDetailsComponent } from './movies/movie-hover-details/movie-hover-details.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieVideoPlayerComponent } from './movies/movie-details/movie-video-player/movie-video-player.component';
import { MovieReviewsListComponent } from './movies/movie-details/movie-reviews-list/movie-reviews-list.component';
import { MovieReviewsItemComponent } from './movies/movie-details/movie-reviews-item/movie-reviews-item.component';
import { MovieVideoCardComponent } from './movies/movie-video-card/movie-video-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MovieCatalogueComponent,
    MovieCardComponent,
    MovieHoverDetailsComponent,
    MovieDetailsComponent,
    MovieVideoPlayerComponent,
    MovieReviewsListComponent,
    MovieReviewsItemComponent,
    MovieVideoCardComponent,
    MagnifyingGlassSvgComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.HTML }),
  ],
  providers: [MoviesService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
