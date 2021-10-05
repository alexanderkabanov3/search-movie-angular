import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';

import {
  dataReceived,
  trailerDoesNotExist,
  trailerLeaveAction,
} from '../store/reducers/trailer';
import {MediaItem} from '../interfaces/fetchingResults';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export interface TrailerObjInterface {
  title: string;
  date: string;
  url: SafeResourceUrl;
}

@Injectable({
  providedIn: 'root',
})
export class TrailerService {
  public trailerObj: TrailerObjInterface;

  constructor(
    private store: Store,
    private httpItem: HttpClient,
    private dom: DomSanitizer
  ) {}

  fetchTrailer(id: number, type: string): void {
    this.httpItem
      .get<MediaItem>(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&append_to_response=videos`
      )
      .subscribe((item) => {
        if (item.videos.results.length === 0) {
          this.store.dispatch(trailerDoesNotExist());
          this.store.dispatch(trailerLeaveAction());
        } else {
          const path = `https://www.youtube.com/embed/${item.videos.results[0].key}`;

          this.trailerObj = {
            title: item.title || item.name,
            date: item.release_date || item.first_air_date,
            url: this.dom.bypassSecurityTrustResourceUrl(path),
          };

          this.store.dispatch(dataReceived());
        }
      });
  }
}
