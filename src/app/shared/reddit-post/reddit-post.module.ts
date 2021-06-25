import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditPostComponent } from './reddit-post.component';

@NgModule({
  declarations: [RedditPostComponent],
  imports: [
    CommonModule
  ],
  exports: [RedditPostComponent]
})
export class RedditPostModule { }
