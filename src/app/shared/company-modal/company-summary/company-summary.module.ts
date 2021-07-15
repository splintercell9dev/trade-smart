import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySummaryComponent } from './company-summary.component';
import { IonicModule } from '@ionic/angular';
import { SummaryPipe } from 'src/app/pipes/summary.pipe';

@NgModule({
  declarations: [CompanySummaryComponent, SummaryPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanySummaryComponent]
})
export class CompanySummaryModule { }
