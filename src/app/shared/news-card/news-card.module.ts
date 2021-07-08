import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './news-card.component';
import { IonicModule } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [NewsCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    LazyLoadImageModule
  ],
  exports: [NewsCardComponent]
})
export class NewsCardModule { }
