import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MagnifyingGlassSvgComponent } from './shared/svg/magnifying-glass-svg.component';
import { MoviesService } from './movies/movies.service';
import { httpInterceptorProviders } from '@/interceptors';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { MovieCatalogueComponent } from './movies/movie-catalogue/movie-catalogue.component';
import { MovieHoverDetailsComponent } from './movies/movie-hover-details/movie-hover-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MovieCatalogueComponent,
    MovieCardComponent,
    MovieHoverDetailsComponent,
    MagnifyingGlassSvgComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutingModule,
  ],
  providers: [MoviesService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
