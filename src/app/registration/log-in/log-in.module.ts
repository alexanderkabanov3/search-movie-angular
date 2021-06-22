import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogInComponent} from './log-in.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: LogInComponent}]),
  ],
})
export class LogInModule {}
