import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CompanyProfileComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanyProfileComponent]
})
export class CompanyProfileModule { }
