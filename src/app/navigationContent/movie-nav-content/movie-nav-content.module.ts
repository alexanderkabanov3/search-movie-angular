import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieNavComponent} from './movie-nav-content.component';
import {RouterModule, Routes} from '@angular/router';
import {SortingBarModule} from '../sorting-bar/sorting-bar.module';

const routes: Routes = [
  {
    path: '',
    component: MovieNavComponent,
    children: [
      {
        path: 'popular',
        loadChildren: () =>
          import('./popular-movie/popular-movie.module').then(
            (m) => m.PopularMovieModule
          ),
      },
      {
        path: 'playing',
        loadChildren: () =>
          import('./playing-movie/playing-movie.module').then(
            (m) => m.PlayingMovieModule
          ),
      },
      {
        path: 'upcoming',
        loadChildren: () =>
          import('./upcoming-movie/upcoming-movie.module').then(
            (m) => m.UpcomingMovieModule
          ),
      },
      {
        path: 'rated',
        loadChildren: () =>
          import('./trending-movie/trending-movie.module').then(
            (m) => m.TrendingMovieModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [MovieNavComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SortingBarModule],
})
export class MovieNavContentModule {}
