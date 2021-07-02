import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditPostComponent } from './reddit-post.component';
import { IonicModule } from '@ionic/angular';
import { RedditTimePipe } from 'src/app/pipes/reddit-time.pipe';
import { RedditCountPipe } from 'src/app/pipes/reddit-count.pipe';

@NgModule({
  declarations: [RedditPostComponent, RedditTimePipe, RedditCountPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [RedditPostComponent]
})
export class RedditPostModule { }
