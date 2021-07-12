import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFinanceComponent } from './company-finance.component';
import { IonicModule } from '@ionic/angular';
import { FinancePipe } from 'src/app/pipes/finance.pipe';

@NgModule({
  declarations: [CompanyFinanceComponent, FinancePipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanyFinanceComponent]
})
export class CompanyFinanceModule { }
