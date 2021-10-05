import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public seriesId = new Subject();
  public changes = new Subject();

  constructor(private postMovieHttp: HttpClient) {}

  addMovieItem(t: string, item: number): void {
    const movObj = {
      type: t,
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
}
