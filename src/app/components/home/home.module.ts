import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { StockChartModule } from 'src/app/shared/stock-chart/stock-chart.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    StockChartModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
