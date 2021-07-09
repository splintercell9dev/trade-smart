import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModalComponent } from './company-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CompanyModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanyModalComponent]
})
export class CompanyModalModule { }
