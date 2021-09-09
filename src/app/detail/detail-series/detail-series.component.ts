import {HttpClient} from '@angular/common/http';
import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FavoriteService} from 'src/app/services/favorite.service';
import {TrailerService} from 'src/app/services/trailer.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-detail-series',
  templateUrl: './detail-series.component.html',
  styleUrls: ['./detail-series.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class DetailSeriesComponent implements OnInit, DoCheck {
  public bgImgPath: string;
  public preLoader = true;
  public item;
  public genres: string;
  public ageAccees: string;
  public cast = [];
  public similar = [];
  public modal = false;
  public routerObservable;
  public barValue = 25;
  public titleFontSize = '15';
  public outerStrokeWidth = 5;
  public unitsFontSize = '12';

  constructor(
    private httpMovie: HttpClient,
    private httpSimilar: HttpClient,
    private httpCredits: HttpClient,
    private router: ActivatedRoute,
    private trailerService: TrailerService,
    private favoriteService: FavoriteService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.trailerService.movieId = '';
    this.trailerService.seriesId = '';
    this.trailerService.open = false;

    this.router.params.subscribe((params: Params) => {
      window.scrollTo(0, 0);
      this.preLoader = true;

      const movId = +params.id;

      this.fetchItem(movId).then((data: any) => {
        this.item = data;

        const genre = [];
        this.item.genres.forEach((element) => {
          genre.push(element.name);
        });
        this.genres = genre.join(' ');

        data.backdrop_path !== null
          ? (this.bgImgPath = `https://image.tmdb.org/t/p/original${data.backdrop_path}`)
          : (this.bgImgPath =
              'data:image/jpeg;base64,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');
      });

      this.getCredits(movId).then((data: any) => {
        this.cast = data.cast;
      });

      this.getSimilar(movId).then((data: any) => {
        this.similar = data.results;

        setTimeout(() => {
          this.preLoader = false;
        }, 500);
      });
    });

    this.mediaQueries();
  }

  ngDoCheck(): void {
    this.modal = this.trailerService.open;
  }

  async fetchItem(id) {
    const fetch = await this.httpMovie
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&append_to_response=videos`
      )
      .toPromise();

    return fetch;
  }

  async getSimilar(id) {
    const fetch = await this.httpSimilar
      .get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&page=1`
      )
      .toPromise();

    return fetch;
  }

  async getCredits(id) {
    const fetch = await this.httpCredits
      .get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`
      )
      .toPromise();

    return fetch;
  }

  open(event) {
    this.trailerService.seriesId = event;
    this.trailerService.open = true;
  }

  addFavorite(event) {
    this.favoriteService.addSeriesItem(event.target.id);
  }

  mediaQueries() {
    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 20;
          this.titleFontSize = '12';
          this.outerStrokeWidth = 4;
        }
      });

    this.breakpointObserver
      .observe(['(max-width: 790px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 16;
          this.titleFontSize = '8';
          this.outerStrokeWidth = 2;
          this.unitsFontSize = '8';
        }
      });

    this.breakpointObserver
      .observe(['(max-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 13;
          this.titleFontSize = '8';
          this.outerStrokeWidth = 2;
          this.unitsFontSize = '8';
        }
      });
  }
}
