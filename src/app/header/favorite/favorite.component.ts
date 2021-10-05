import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, HostListener, OnInit} from '@angular/core';
import {FavoriteService} from 'src/app/shared/services/favorite.service';
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
  public media = [];
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
          this.fetchMovie(e.type, e.mediaId).then((data: any) => {
            data.type = e.type;
            this.media.unshift(data);
          });
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
            if (
              this.media.findIndex(
                (el) => el.id === e.mediaId && el.type === e.type
              ) === -1
            ) {
              this.fetchMovie(e.type, e.mediaId).then((data: any) => {
                data.type = e.type;
                this.media.unshift(data);
              });
            }
          });
        });
    });
  }

  async fetchMovie(type: string, id: number): Promise<object> {
    return await this.httpMovie
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`
      )
      .toPromise();
  }

  deleteMovie(type: string, id: number): void {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.deleteFavorite
      .delete(
        `https://search-movie-server.herokuapp.com/api/favorite/${type}/${id}`,
        {headers: header}
      )
      .subscribe((observer: any) => {
        if (observer.status === 'success') {
          const index = this.media.findIndex(
            (item) => item.id === id && item.type === type
          );

          this.media.splice(index, 1);
          this.media.length === 0 ? (this.empty = true) : (this.empty = false);
        }
      });
  }
}
