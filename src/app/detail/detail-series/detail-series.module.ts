import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailSeriesComponent} from './detail-series.component';
import {TrailerModule} from 'src/app/trailer/trailer.module';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {PipesModule} from 'src/app/pipes/pipes.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DetailSeriesComponent],
  imports: [
    CommonModule,
    TrailerModule,
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
    FormsModule,
    PipesModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailSeriesComponent,
      },
    ]),
  ],
})
export class DetailSeriesModule {}
