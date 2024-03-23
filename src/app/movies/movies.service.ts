import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environments';
import { Paginated } from '@/app/shared/types';
import { Movie } from './movie.model';
import { Review } from './review.model';
import { Video } from './video.model';
import { MovieDetails } from './movie-details/movie-details.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private _baseUrl = 'https://api.themoviedb.org';

  constructor(private http: HttpClient) {}

  getPopular(page: number = 1) {
    return this.http.get<Paginated<Movie>>(`${this._baseUrl}/3/movie/popular`, {
      params: {
        page,
      },
    });
  }

  getByQuery(query: string, page: number = 1) {
    return this.http.get<Paginated<Movie>>(`${this._baseUrl}/3/search/movie`, {
      params: {
        query,
        page,
      },
    });
  }

  /**
   * TODO: catch error if movie id is not found
   */
  getDetailsById(movieId: number) {
    return this.http.get<MovieDetails>(`${this._baseUrl}/3/movie/${movieId}`);
  }

  /**
   * TODO: catch error if movie id is not found
   */
  getSimilarById(movieId: number) {
    return this.http.get<Paginated<Movie>>(
      `${this._baseUrl}/3/movie/${movieId}/similar`
    );
  }

  /**
   * TODO: catch error if movie id is not found
   */
  getVideosById(movieId: number) {
    return this.http.get<Video[]>(`${this._baseUrl}/3/movie/${movieId}/videos`);
  }

  /**
   * TODO: catch error if movie id is not found
   */
  getReviewsById(movieId: number, page: number = 1) {
    return this.http.get<Paginated<Review>>(
      `${this._baseUrl}/3/movie/${movieId}/reviews`,
      {
        params: {
          page,
        },
      }
    );
  }
}
