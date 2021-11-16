import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Results} from '../interfaces/fetchingResults';

@Injectable({
  providedIn: 'root',
})
export class BackgroundImagesService {
  private moviePopularUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&page=1';

  public sectionSearchImg$ = new Subject<string>();
  public sectionUpcomingImg$ = new Subject<string>();

  constructor(
    private sectionSearchImgHttp: HttpClient,
    private sectionUpcomingImgHttp: HttpClient
  ) {}

  findSectionSearchBgImg(): void {
    this.sectionSearchImgHttp
      .get<Results>(this.moviePopularUrl)
      .subscribe((res) => {
        this.sectionSearchImg$.next(
          `https://image.tmdb.org/t/p/original${
            res.results[this.randomInteger()].backdrop_path
          }`
        );
      });
  }

  findSectionUpcomingBgImg(): void {
    this.sectionUpcomingImgHttp
      .get<Results>(this.moviePopularUrl)
      .subscribe((res) => {
        this.sectionUpcomingImg$.next(
          `https://image.tmdb.org/t/p/original${
            res.results[this.randomInteger()].backdrop_path
          }`
        );
      });
  }

  randomInteger(): number {
    const rand = 0 - 0.5 + Math.random() * (19 + 1);
    return Math.round(rand);
  }
}
