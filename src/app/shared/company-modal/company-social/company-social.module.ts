import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySocialComponent } from './company-social.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CompanySocialComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanySocialComponent]
})
export class CompanySocialModule { }
