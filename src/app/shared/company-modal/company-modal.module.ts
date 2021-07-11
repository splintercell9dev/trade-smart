import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModalComponent } from './company-modal.component';
import { IonicModule } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [CompanyModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    LazyLoadImageModule
  ],
  exports: [CompanyModalComponent]
})
export class CompanyModalModule { }
