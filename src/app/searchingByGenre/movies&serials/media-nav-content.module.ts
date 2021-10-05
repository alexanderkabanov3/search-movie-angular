import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MediaNavComponent} from './media-nav-content.component';
import {RouterModule} from '@angular/router';
import {SortingBarModule} from '../sorting-bar/sorting-bar.module';
import {MediaContentComponent} from './media-content/media-content.component';
import {NgCircleProgressModule} from 'ng-circle-progress';

@NgModule({
  declarations: [MediaNavComponent, MediaContentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: MediaNavComponent}]),
    SortingBarModule,
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
export class MediaNavContentModule {}
