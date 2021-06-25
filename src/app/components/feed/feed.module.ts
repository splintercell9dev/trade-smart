import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { IonicModule } from '@ionic/angular';
import { TweetModule } from 'src/app/shared/tweet/tweet.module';
import { RedditPostModule } from 'src/app/shared/reddit-post/reddit-post.module';
import { NewsCardModule } from 'src/app/shared/news-card/news-card.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    IonicModule,
    TweetModule,
    RedditPostModule,
    NewsCardModule
  ],
  exports: [FeedComponent]
})
export class FeedModule { }
