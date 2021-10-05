import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {MediaItem, Results} from '../interfaces/fetchingResults';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SortingDataService {
  public sortStream$ = new Subject<{option: string; genres: string}>();

  public mediaResults$ = new Subject<Array<MediaItem>>();
  public preLoader$ = new BehaviorSubject(true);

  public type: string;
  public genres: string;
  public option: string;

  private description: string;

  public filterMode = false;

  private totalPages: number;
  public moviesArr: Array<MediaItem> = [];
  public noResults = new BehaviorSubject(false);
  public btnExist = new BehaviorSubject(true);

  public pages = 1;

  constructor(private httpMedia: HttpClient) {}

  queryType(type: string, description: string): void {
    this.filterMode = false;
    this.type = type;
    this.description = description;
    this.preLoader$.next(true);
    this.noResults.next(false);
    this.btnExist.next(true);

    this.pages = 1;
    this.moviesArr = [];
    this.fetchingList(this.type, this.description);
  }

  fetchingList(type: string, description: string): void {
    this.httpMedia
      .get(
        `https://api.themoviedb.org/3/${type}/${description}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&page=${this.pages}`
      )
      .subscribe((movies: Results) => {
        movies.results.forEach((movieItem: MediaItem) => {
          this.moviesArr.push(movieItem);
        });
        this.pages++;
        this.mediaResults$.next(this.moviesArr);

        setTimeout(() => {
          this.preLoader$.next(false);
        }, 300);
      });
  }

  load(): void {
    this.filterMode
      ? this.fetchFilteredList(this.type, this.genres, this.option)
      : this.fetchingList(this.type, this.description);
  }

  fetchFilteredList(type: string, genres: string, option: string): void {
    this.filterMode = true;
    this.noResults.next(false);
    this.btnExist.next(true);

    this.httpMedia
      .get(
        `https://api.themoviedb.org/3/discover/${type}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&sort_by=${option}&include_adult=false&include_video=false&page=${this.pages}&with_genres=${genres}&with_watch_monetization_types=flatrate`
      )
      .subscribe((media: Results) => {
        this.totalPages = media.total_pages;

        media.results.forEach((movieItem: MediaItem) => {
          this.moviesArr.push(movieItem);
        });

        this.pages++;
        this.mediaResults$.next(this.moviesArr);
        this.compare();

        setTimeout(() => {
          this.preLoader$.next(false);
        }, 300);
      });
  }

  compare(): void {
    if (this.moviesArr.length === 0) {
      this.noResults.next(true);
    }

    if (this.moviesArr.length > this.totalPages * 20 - 20) {
      this.btnExist.next(false);
    }
  }
}
