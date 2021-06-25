import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './news-card.component';

@NgModule({
  declarations: [NewsCardComponent],
  imports: [
    CommonModule
  ],
  exports: [NewsCardComponent]
})
export class NewsCardModule { }
