import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailMovieComponent} from './detail-movie.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {TrailerModule} from 'src/app/trailer/trailer.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DetailMovieComponent],
  imports: [
    CommonModule,
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
    PipesModule,
    TrailerModule,
    RouterModule,
    RouterModule.forChild([{path: '', component: DetailMovieComponent}]),
    FormsModule,
  ],
})
export class DetailMovieModule {}
