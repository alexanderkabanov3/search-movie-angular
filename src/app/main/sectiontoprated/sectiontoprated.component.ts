import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MediaItem, Results} from '../../interfaces/fetchingResults';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-sectiontoprated',
  templateUrl: './sectiontoprated.component.html',
  styleUrls: ['./sectiontoprated.component.scss'],
})
export class SectiontopratedComponent implements OnInit {
  private urlTopRatedMovies =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=f4a143e6e64636aa4b0cd6bec7236ad4';
  public ratedArr: MediaItem[] = [];
  public barValue = 25;
  public titleFontSize = '15';
  public outerStrokeWidth = 5;
  public unitsFontSize = '12';

  constructor(
    private ratedHttp: HttpClient,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.ratedHttp
      .get(this.urlTopRatedMovies)
      .subscribe((response: Results) => {
        this.ratedArr = response.results;
      });

    this.mediaQueries();
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
      .observe(['(max-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 18;
          this.titleFontSize = '10';
          this.outerStrokeWidth = 2;
          this.unitsFontSize = '8';
        }
      });

    this.breakpointObserver
      .observe(['(max-width: 520px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 22;
          this.titleFontSize = '14';
          this.outerStrokeWidth = 4;
          this.unitsFontSize = '10';
        }
      });
  }
}
