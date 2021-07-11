import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFinanceComponent } from './company-finance.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CompanyFinanceComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompanyFinanceComponent]
})
export class CompanyFinanceModule { }
