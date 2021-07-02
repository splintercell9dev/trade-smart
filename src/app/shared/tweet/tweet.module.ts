import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet.component';
import { IonicModule } from '@ionic/angular';
import { TweetHtmlPipe } from 'src/app/pipes/tweet-html.pipe';
import { TweetMetricsPipe } from 'src/app/pipes/tweet-metrics.pipe';
import { TweetTimePipe } from 'src/app/pipes/tweet-time.pipe';

@NgModule({
  declarations: [TweetComponent, TweetHtmlPipe, TweetMetricsPipe, TweetTimePipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TweetComponent]
})
export class TweetModule { }
