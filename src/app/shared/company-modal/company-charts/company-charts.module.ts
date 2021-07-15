import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyChartsComponent } from './company-charts.component';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [CompanyChartsComponent],
  imports: [
    CommonModule,
    IonicModule,
    ChartsModule
  ],
  exports: [CompanyChartsComponent]
})
export class CompanyChartsModule { }
