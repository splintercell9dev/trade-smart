import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModalComponent } from './company-modal.component';
import { IonicModule } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CompanySummaryModule } from './company-summary/company-summary.module';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { CompanyChartsModule } from './company-charts/company-charts.module';
import { CompanyFinanceModule } from './company-finance/company-finance.module';
import { CompanySocialModule } from './company-social/company-social.module';

@NgModule({
  declarations: [CompanyModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    LazyLoadImageModule,
    CompanySummaryModule,
    CompanyChartsModule,
    CompanyFinanceModule,
    CompanySocialModule,
    CompanyProfileModule
  ],
  exports: [CompanyModalComponent]
})
export class CompanyModalModule { }
