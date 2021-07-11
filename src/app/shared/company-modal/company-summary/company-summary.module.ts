import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySummaryComponent } from './company-summary.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CompanySummaryComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanySummaryComponent]
})
export class CompanySummaryModule { }
