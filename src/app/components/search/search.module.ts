import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
