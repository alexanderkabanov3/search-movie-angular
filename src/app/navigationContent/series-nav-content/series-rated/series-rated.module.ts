import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeriesRatedComponent} from './series-rated.component';
import {RouterModule} from '@angular/router';
import {NgCircleProgressModule} from 'ng-circle-progress';

@NgModule({
  declarations: [SeriesRatedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: SeriesRatedComponent}]),
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
export class SeriesRatedModule {}
