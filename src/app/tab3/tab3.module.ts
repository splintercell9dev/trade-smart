import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SearchModule } from '../components/search/search.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CompanyModalModule } from '../shared/company-modal/company-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    SearchModule,
    LazyLoadImageModule,
    CompanyModalModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
