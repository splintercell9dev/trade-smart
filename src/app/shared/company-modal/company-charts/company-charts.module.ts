import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyChartsComponent } from './company-charts.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CompanyChartsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanyChartsComponent]
})
export class CompanyChartsModule { }
