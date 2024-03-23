import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { MoviesService } from '../movies.service';
import { MovieDetails } from './movie-details.model';

export const movieDetailsResolver: ResolveFn<MovieDetails> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const moviesService = inject(MoviesService);

  const movieId = route.params['id'];

  return moviesService.getDetailsById(movieId);
};
