import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeriesNavContentComponent} from './series-nav-content.component';
import {RouterModule, Routes} from '@angular/router';
import {SortingBarModule} from '../sorting-bar/sorting-bar.module';
import {NgCircleProgressModule} from 'ng-circle-progress';

const routes: Routes = [
  {
    path: '',
    component: SeriesNavContentComponent,
    children: [
      {
        path: 'popular',
        loadChildren: () =>
          import('./series-popular/series-popular.module').then(
            (m) => m.SeriesPopularModule
          ),
      },
      {
        path: 'airing',
        loadChildren: () =>
          import('./series-airing/series-airing.module').then(
            (m) => m.SeriesAiringModule
          ),
      },
      {
        path: 'tv',
        loadChildren: () =>
          import('./series-on-tv/series-on-tv.module').then(
            (m) => m.SeriesOnTvModule
          ),
      },
      {
        path: 'rated',
        loadChildren: () =>
          import('./series-rated/series-rated.module').then(
            (m) => m.SeriesRatedModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [SeriesNavContentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
export class SeriesNavContentModule {}
