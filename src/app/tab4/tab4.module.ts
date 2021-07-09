import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CompanyModalModule } from '../shared/company-modal/company-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    LazyLoadImageModule,
    CompanyModalModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
