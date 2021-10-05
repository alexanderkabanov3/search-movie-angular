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
    path: 'overview/:type/:id',
    loadChildren: () =>
      import('./detail/detail-movie/detail-movie.module').then(
        (m) => m.DetailMovieModule
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
      import('./searchingByGenre/people/people.module').then(
        (m) => m.PeopleModule
      ),
  },
  {
    path: 'media/:type/:description',
    loadChildren: () =>
      import('./searchingByGenre/movies&serials/media-nav-content.module').then(
        (m) => m.MediaNavContentModule
      ),
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
