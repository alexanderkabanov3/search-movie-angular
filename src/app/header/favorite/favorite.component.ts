import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, HostListener, OnInit} from '@angular/core';
import {FavoriteService} from 'src/app/services/favorite.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class FavoriteComponent implements OnInit {
  public empty = true;
  public movie = [];
  public series = [];

  constructor(
    public favoriteService: FavoriteService,
    private httpMovie: HttpClient,
    private getUserFavorites: HttpClient,
    private deleteFavorite: HttpClient
  ) {}

  ngOnInit(): void {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.getUserFavorites
      .get('https://search-movie-server.herokuapp.com/api/favorite/', {
        headers: header,
      })
      .subscribe((observer: any) => {
        observer.data.length > 0 ? (this.empty = false) : (this.empty = true);

        observer.data.forEach((e) => {
          if (e.type === 'movie') {
            this.fetchMovie('movie', e.mediaId).then((data: any) => {
              this.movie.unshift(data);
            });
          } else if (e.type === 'series') {
            this.fetchMovie('tv', e.mediaId).then((data: any) => {
              this.series.unshift(data);
            });
          }
        });
      });

    this.favoriteService.changes.subscribe((observer) => {
      this.getUserFavorites
        .get('https://search-movie-server.herokuapp.com/api/favorite/', {
          headers: header,
        })
        .subscribe((event: any) => {
          event.data.length > 0 ? (this.empty = false) : (this.empty = true);

          event.data.forEach((e) => {
            if (e.type === 'movie') {
              if (this.movie.findIndex((el) => el.id === e.mediaId) === -1) {
                this.fetchMovie('movie', e.mediaId).then((data: any) => {
                  this.movie.unshift(data);
                });
              }
            } else if (e.type === 'series') {
              if (this.series.findIndex((el) => el.id === e.mediaId) === -1) {
                this.fetchMovie('tv', e.mediaId).then((data: any) => {
                  this.series.unshift(data);
                });
              }
            }
          });
        });
    });
  }

  async fetchMovie(type, id): Promise<object> {
    return await this.httpMovie
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`
      )
      .toPromise();
  }

  deleteMovie(event): void {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.deleteFavorite
      .delete(
        `https://search-movie-server.herokuapp.com/api/favorite/movie/${event}`,
        {headers: header}
      )
      .subscribe((observer: any) => {
        if (observer.status === 'success') {
          this.favoriteService.changes.next('changed');
          this.movie = this.movie.filter((el) => el.id !== event);
        }
      });
  }

  deleteSeries(event): void {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.deleteFavorite
      .delete(
        `https://search-movie-server.herokuapp.com/api/favorite/series/${event}`,
        {headers: header}
      )
      .subscribe((observer: any) => {
        if (observer.status === 'success') {
          this.favoriteService.changes.next('changed');
          this.series = this.series.filter((el) => el.id !== event);
        }
      });
  }
}
