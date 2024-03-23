import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Paginated } from '@/app/shared/types';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie.model';

export const movieSimilarResolver: ResolveFn<Paginated<Movie>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const moviesService = inject(MoviesService);

  const movieId = route.params['id'];

  return moviesService.getSimilarById(movieId);
};
