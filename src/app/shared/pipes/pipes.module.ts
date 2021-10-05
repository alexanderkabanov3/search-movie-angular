import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyTimePipe} from './my-time.pipe';

@NgModule({
  declarations: [MyTimePipe],
  imports: [CommonModule],
  exports: [MyTimePipe],
})
export class PipesModule {}
