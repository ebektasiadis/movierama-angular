import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCatalogueComponent } from './movies/movie-catalogue/movie-catalogue.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { movieCatalogueResolver } from './movies/movie-catalogue/movie-catalogue.resolver';
import { movieReviewsResolver } from './movies/movie-details/movie-reviews.resolver';
import { movieVideosResolver } from './movies/movie-details/movie-videos.resolver';
import { movieDetailsResolver } from './movies/movie-details/movie-details.resolver';
import { movieSimilarResolver } from './movies/movie-details/movie-similar.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    resolve: {
      reviews: movieReviewsResolver,
      videos: movieVideosResolver,
      details: movieDetailsResolver,
      similar: movieSimilarResolver,
    },
  },
  {
    path: 'movies',
    component: MovieCatalogueComponent,
    resolve: {
      movies: movieCatalogueResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
