import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'found',
    loadChildren: () =>
      import('./main/found/found.module').then((m) => m.FoundModule),
  },
  {
    path: 'movieoverview/:id',
    loadChildren: () =>
      import('./detail/detail-movie/detail-movie.module').then(
        (m) => m.DetailMovieModule
      ),
  },
  {
    path: 'seriesoverview/:id',
    loadChildren: () =>
      import('./detail/detail-series/detail-series.module').then(
        (m) => m.DetailSeriesModule
      ),
  },
  {
    path: 'personoverview/:id',
    loadChildren: () =>
      import('./detail/detail-people/people.module').then(
        (m) => m.DetailPeopleModule
      ),
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./navigationContent/people/people.module').then(
        (m) => m.PeopleModule
      ),
  },
  {
    path: 'movie',
    loadChildren: () =>
      import(
        './navigationContent/movie-nav-content/movie-nav-content.module'
      ).then((m) => m.MovieNavContentModule),
  },
  {
    path: 'series',
    loadChildren: () =>
      import(
        './navigationContent/series-nav-content/series-nav-content.module'
      ).then((m) => m.SeriesNavContentModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
