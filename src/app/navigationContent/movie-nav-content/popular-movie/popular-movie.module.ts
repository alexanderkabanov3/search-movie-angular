import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {PopularMovieComponent} from './popular-movie.component';

@NgModule({
  declarations: [PopularMovieComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PopularMovieComponent}]),
    NgCircleProgressModule.forRoot({
      backgroundColor: '#000',
      radius: 30,
      maxPercent: 100,
      units: ' %',
      unitsColor: '#FFF',
      outerStrokeWidth: 1,
      outerStrokeColor: '#FFFFFF',
      innerStrokeColor: '#FFFFFF',
      titleColor: '#fff',
      subtitleColor: '#FFF',
      showSubtitle: false,
      showInnerStroke: false,
      startFromZero: false,
    }),
  ],
})
export class PopularMovieModule {}
