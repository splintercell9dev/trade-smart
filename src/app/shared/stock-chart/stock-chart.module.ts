import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockChartComponent } from './stock-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [StockChartComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [StockChartComponent]
})
export class StockChartModule { }
