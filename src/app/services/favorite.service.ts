import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favoriteMovieArr: any = [];
  public favoriteSeriesArr: any = [];
  public movieId = new Subject();
  public seriesId = new Subject();
  public empty = new Subject();
  public btnExist = JSON.parse(window.localStorage.getItem('btnExist'));

  constructor() {}

  addMovieItem(item: any) {
    if (JSON.parse(window.localStorage.getItem('movieFavorite')) !== null) {
      this.favoriteMovieArr = JSON.parse(
        window.localStorage.getItem('movieFavorite')
      );
    }

    const index = this.favoriteMovieArr.findIndex((e) => {
      return +e === +item;
    });

    if (index >= 0) {
      this.favoriteMovieArr.splice(index, 1);
    } else {
      this.movieId.next(item);
    }

    this.favoriteMovieArr.unshift(item);
    window.localStorage.setItem(
      'movieFavorite',
      JSON.stringify(this.favoriteMovieArr)
    );
  }

  addSeriesItem(item: any) {
    if (JSON.parse(window.localStorage.getItem('seriesFavorite')) !== null) {
      this.favoriteSeriesArr = JSON.parse(
        window.localStorage.getItem('seriesFavorite')
      );
    }

    const index = this.favoriteSeriesArr.findIndex((e) => {
      return +e === +item;
    });

    if (index >= 0) {
      this.favoriteSeriesArr.splice(index, 1);
    } else {
      this.seriesId.next(item);
    }

    this.favoriteSeriesArr.unshift(item);
    window.localStorage.setItem(
      'seriesFavorite',
      JSON.stringify(this.favoriteSeriesArr)
    );
  }
}
