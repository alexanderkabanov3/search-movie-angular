import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SortingBarComponent} from './sorting-bar.component';

@NgModule({
  declarations: [SortingBarComponent],
  imports: [CommonModule],
  exports: [SortingBarComponent],
})
export class SortingBarModule {}
