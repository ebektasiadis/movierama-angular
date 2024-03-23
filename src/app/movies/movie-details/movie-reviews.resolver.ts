import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Paginated } from '@/app/shared/types';
import { MoviesService } from '../movies.service';
import { Review } from '../review.model';

export const movieReviewsResolver: ResolveFn<Paginated<Review>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const moviesService = inject(MoviesService);

  const movieId = route.params['id'];

  return moviesService.getReviewsById(movieId);
};
