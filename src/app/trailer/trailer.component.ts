import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {TrailerService} from '../services/trailer.service';
import {MediaItem} from '../interfaces/fetchingResults';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent implements OnInit {
  public title;
  public date;
  public path;
  public trustedDashboardUrl;
  public url = '';
  public preLoader = true;

  constructor(
    private trailerService: TrailerService,
    private httpItem: HttpClient,
    private dom: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.trailerService.movieId !== '') {
      this.fetchItem('movie', this.trailerService.movieId).then((data) => {
        this.title = data.title;
        this.date = data.release_date;
        this.path = `https://www.youtube.com/embed/${data.videos.results[0].key}`;

        this.trustedDashboardUrl = this.dom.bypassSecurityTrustResourceUrl(
          this.path
        );

        this.url = this.trustedDashboardUrl;
        this.preLoader = false;
      });
    } else {
      this.fetchItem('tv', this.trailerService.seriesId).then((data) => {
        this.title = data.name;
        this.date = data.first_air_date;
        this.path = `https://www.youtube.com/embed/${data.videos.results[0].key}`;

        this.trustedDashboardUrl = this.dom.bypassSecurityTrustResourceUrl(
          this.path
        );

        this.url = this.trustedDashboardUrl;
        this.preLoader = false;
      });
    }
  }

  close(): void {
    this.trailerService.open.next(false);
    this.trailerService.movieId = '';
    this.trailerService.seriesId = '';
  }

  async fetchItem(type, id): Promise<MediaItem> {
    return await this.httpItem
      .get<MediaItem>(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&append_to_response=videos`
      )
      .toPromise();
  }
}
