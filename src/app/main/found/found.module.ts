import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FoundNavComponent} from './found-nav/found-nav.component';
import {FoundComponent} from './found.component';
import {FoundMovieListComponent} from './found-movie-list/found-movie-list.component';
import {FoundSeriesListComponent} from './found-series-list/found-series-list.component';
import {FoundPeopleListComponent} from './found-people-list/found-people-list.component';
import {RouterModule, Routes} from '@angular/router';
import {MovieContentComponent} from './found-movie-list/movie-content/movie-content.component';

const routes: Routes = [
  {
    path: '',
    component: FoundComponent,
    children: [
      {
        path: 'movies',
        component: FoundMovieListComponent,
        children: [
          {
            path: 'page/:page',
            component: MovieContentComponent,
          },
        ],
      },
      {
        path: 'series',
        component: FoundSeriesListComponent,
        children: [
          {
            path: 'page/:page',
            component: MovieContentComponent,
          },
        ],
      },
      {
        path: 'people',
        component: FoundPeopleListComponent,
        children: [
          {
            path: 'page/:page',
            component: MovieContentComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    FoundComponent,
    FoundNavComponent,
    FoundMovieListComponent,
    FoundSeriesListComponent,
    FoundPeopleListComponent,
    MovieContentComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundModule {}
