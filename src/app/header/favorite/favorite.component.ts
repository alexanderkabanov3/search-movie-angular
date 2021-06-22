import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
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
export class FavoriteComponent implements OnInit, DoCheck {
  public empty = false;
  public movieArrId = [];
  public seriesArrId = [];
  public movie = [];
  public series = [];

  constructor(
    private favoriteService: FavoriteService,
    private httpMovie: HttpClient
  ) {}

  ngOnInit(): void {
    this.favoriteService.movieId.subscribe((value) => {
      this.fetchMovie('movie', value).then((data: any) => {
        this.movie.unshift(data);
        this.empty = false;
      });
    });

    this.favoriteService.seriesId.subscribe((value) => {
      this.fetchMovie('tv', value).then((data: any) => {
        this.series.unshift(data);
        this.empty = false;
      });
    });

    this.movieArrId = JSON.parse(window.localStorage.getItem('movieFavorite'));
    this.seriesArrId = JSON.parse(
      window.localStorage.getItem('seriesFavorite')
    );

    if (this.movieArrId.length === 0 && this.seriesArrId.length === 0) {
      this.empty = true;
    }

    if (this.movieArrId !== null) {
      this.movieArrId.forEach((e) => {
        this.fetchMovie('movie', e).then((data: any) => {
          this.movie.push(data);
        });
      });
    }

    if (this.seriesArrId !== null) {
      this.seriesArrId.forEach((e) => {
        this.fetchMovie('tv', e).then((data: any) => {
          this.series.push(data);
        });
      });
    }
  }

  ngDoCheck() {}

  async fetchMovie(type, id) {
    const fetch = await this.httpMovie
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`
      )
      .toPromise();

    return fetch;
  }

  deleteMovie(event) {
    this.movie = this.movie.filter((e) => {
      return +e.id !== event;
    });

    if (this.movie.length == 0 && this.series.length == 0) {
      this.empty = true;
    }

    const movieArrId = JSON.parse(window.localStorage.getItem('movieFavorite'));

    const index = movieArrId.findIndex((e) => {
      return +e === event;
    });

    movieArrId.splice(index, 1);

    if (this.series.length === 0 && this.movie.length === 0) {
      this.empty = true;
    }

    window.localStorage.setItem('movieFavorite', JSON.stringify(movieArrId));
  }

  deleteSeries(event) {
    this.series = this.series.filter((e) => {
      return +e.id !== event;
    });

    if (this.movie.length == 0 && this.series.length == 0) {
      this.empty = true;
    }

    const movieArrId = JSON.parse(
      window.localStorage.getItem('seriesFavorite')
    );

    const index = movieArrId.findIndex((e) => {
      return +e === event;
    });

    movieArrId.splice(index, 1);

    if (this.series.length === 0 && this.movie.length === 0) {
      this.empty = true;
    }

    window.localStorage.setItem('seriesFavorite', JSON.stringify(movieArrId));
  }
}
