import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySocialComponent } from './company-social.component';
import { IonicModule } from '@ionic/angular';
import { TweetModule } from '../../tweet/tweet.module';
import { NewsCardModule } from '../../news-card/news-card.module';

@NgModule({
  declarations: [CompanySocialComponent],
  imports: [
    CommonModule,
    IonicModule,
    TweetModule,
    NewsCardModule
  ],
  exports: [CompanySocialComponent]
})
export class CompanySocialModule { }
