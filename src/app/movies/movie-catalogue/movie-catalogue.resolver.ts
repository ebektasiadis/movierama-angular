import { Paginated } from '@/app/shared/types';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

export const movieCatalogueResolver: ResolveFn<Paginated<Movie>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const moviesService = inject(MoviesService);

  const query = route.queryParamMap.get('query') ?? undefined;

  if (query) {
    return moviesService.getByQuery(query);
  }

  return moviesService.getPopular();
};
