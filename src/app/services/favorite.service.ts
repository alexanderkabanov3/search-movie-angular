import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public seriesId = new Subject();
  public changes = new Subject();
  public btnExist = JSON.parse(window.localStorage.getItem('btnExist'));

  constructor(private postMovieHttp: HttpClient) {}

  addMovieItem(item: number): void {
    const movObj = {
      type: 'movie',
      mediaId: item,
    };

    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.postMovieHttp
      .post('https://search-movie-server.herokuapp.com/api/favorite/', movObj, {
        headers: header,
      })
      .subscribe((observer) => {
        this.changes.next('changed');
      });
  }

  addSeriesItem(item: number): void {
    const serObj = {
      type: 'series',
      mediaId: item,
    };

    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.postMovieHttp
      .post('https://search-movie-server.herokuapp.com/api/favorite/', serObj, {
        headers: header,
      })
      .subscribe((observer) => {
        this.changes.next('changed');
      });
  }
}
