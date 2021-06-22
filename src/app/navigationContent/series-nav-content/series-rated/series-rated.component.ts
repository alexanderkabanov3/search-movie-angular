import {HttpClient} from '@angular/common/http';
import {Component, OnInit, DoCheck} from '@angular/core';
import {SortingDataService} from 'src/app/services/sorting-data.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-series-rated',
  templateUrl: './series-rated.component.html',
  styleUrls: ['./series-rated.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class SeriesRatedComponent implements OnInit, DoCheck {
  public moviesArr = [];
  public pages = 1;
  public btnExist = true;
  public preLoader = true;
  public noResults = false;
  public filter = false;
  private totaRes: number;
  public barValue = 25;
  public titleFontSize = '15';
  public outerStrokeWidth = 5;
  public unitsFontSize = '12';

  constructor(
    private httpMovie: HttpClient,
    private sortService: SortingDataService,
    private httpFiler: HttpClient,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.sortService.genres = '';
    this.sortService.sortValue = '';

    this.fetchingList().then(() => {
      setTimeout(() => {
        this.preLoader = false;
      }, 500);
    });

    this.mediaQueries();
  }

  ngDoCheck() {
    if (this.sortService.sortValue !== '') {
      this.preLoader = true;
      this.moviesArr = [];
      this.btnExist = true;
      this.noResults = false;
      this.pages = 1;
      this.filter = true;

      this.filterAlone()
        .then((data) => {
          data.forEach((element) => {
            this.moviesArr.push(element);
          });
        })
        .then(() => {
          this.pages++;
          this.compare();

          setTimeout(() => {
            this.preLoader = false;
          }, 500);
        });

      this.sortService.sortValue = '';
    }
  }

  async fetchingList() {
    const request: any = await this.httpMovie
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&page=${this.pages}`
      )
      .toPromise();

    request.results.forEach((element) => {
      this.moviesArr.push(element);
    });
    this.pages++;
  }

  load() {
    if (this.filter === true) {
      this.filterAlone()
        .then((data) => {
          data.forEach((element) => {
            this.moviesArr.push(element);
          });
        })
        .then(() => {
          this.pages++;
          this.compare();
        });
    } else {
      this.fetchingList();
    }
  }

  async filterAlone() {
    const filt: any = await this.httpFiler
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&sort_by=${this.sortService.sortValue}&include_adult=false&include_video=false&page=${this.pages}&with_genres=${this.sortService.genres}&with_watch_monetization_types=flatrate`
      )
      .toPromise();

    this.totaRes = filt.total_results;

    return filt.results;
  }

  compare() {
    const calc = this.totaRes / 20;

    if (calc === 0) {
      this.noResults = true;
    }

    if (this.moviesArr.length / 20 >= calc) {
      this.btnExist = false;
    }
  }

  mediaQueries() {
    this.breakpointObserver
      .observe(['(max-width: 790px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 20;
          this.titleFontSize = '12';
          this.outerStrokeWidth = 4;
        }
      });

    this.breakpointObserver
      .observe(['(max-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 17;
          this.titleFontSize = '10';
          this.outerStrokeWidth = 4;
          this.unitsFontSize = '10';
        }
      });

    this.breakpointObserver
      .observe(['(max-width: 510px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 20;
          this.titleFontSize = '12';
          this.outerStrokeWidth = 4;
          this.unitsFontSize = '12';
        }
      });
  }
}
