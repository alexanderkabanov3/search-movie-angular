import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailPeopleComponent} from './detail-people.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DetailPeopleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DetailPeopleComponent}]),
    FormsModule,
  ],
})
export class DetailPeopleModule {}
