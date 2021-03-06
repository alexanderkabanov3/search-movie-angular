import {animate, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Results, MediaItem} from 'src/app/shared/interfaces/fetchingResults';

@Component({
  selector: 'app-sectionpopular',
  templateUrl: './sectionpopular.component.html',
  styleUrls: ['./sectionpopular.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class SectionpopularComponent implements OnInit {
  public onTvFlag = true;
  private urlPopularMovies =
    'https://api.themoviedb.org/3/movie/popular?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&page=1';
  private urlPopularTv =
    'https://api.themoviedb.org/3/tv/popular?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&page=1';
  public movArr: MediaItem[] = [];
  public serArr: MediaItem[] = [];
  public barValue = 25;
  public titleFontSize = '15';
  public outerStrokeWidth = 5;
  public unitsFontSize = '12';

  constructor(
    private movieHttp: HttpClient,
    private seriesHttp: HttpClient,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // fetching movie list
    this.movieHttp
      .get<Results>(this.urlPopularMovies)
      .subscribe((response: Results) => (this.movArr = response.results));

    // fetching series list
    this.seriesHttp
      .get<Results>(this.urlPopularTv)
      .subscribe((response: Results) => (this.serArr = response.results));

    this.mediaQueries();
  }

  switchBtn({event}: {event: any}): void {
    if (!event.target.classList.contains('popular__select')) {
      const childrenArr = event.target.parentNode.children;
      for (const element of childrenArr) {
        element.classList.remove('popular__btn--focus');
      }
      event.target.classList.add('popular__btn--focus');
      event.target.innerText === 'ON TV'
        ? (this.onTvFlag = false)
        : (this.onTvFlag = true);
    }
  }

  mediaQueries(): void {
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
      .observe(['(max-width: 400px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 15;
          this.titleFontSize = '10';
          this.outerStrokeWidth = 2;
          this.unitsFontSize = '8';
        }
      });
  }
}
