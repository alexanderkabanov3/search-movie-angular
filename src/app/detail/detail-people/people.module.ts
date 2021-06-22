import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailPeopleComponent} from './detail-people.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [DetailPeopleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DetailPeopleComponent}]),
  ],
})
export class DetailPeopleModule {}
