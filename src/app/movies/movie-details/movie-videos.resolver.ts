import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { MoviesService } from '../movies.service';
import { Video } from '../video.model';

export const movieVideosResolver: ResolveFn<Video[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const moviesService = inject(MoviesService);

  const movieId = route.params['id'];

  return moviesService.getVideosById(movieId);
};
