import { Component, Input, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { Investing } from 'src/app/models/reddit.investing.interface';
import { WallStreetBets } from 'src/app/models/reddit.wallstreet.interface';

@Component({
  selector: 'app-reddit-post',
  templateUrl: './reddit-post.component.html',
  styleUrls: ['./reddit-post.component.scss'],
})
export class RedditPostComponent implements OnInit {
  @Input() wallstreetbets: WallStreetBets[] ;
  @Input() investing: Investing[] ;

  constructor() { }

  ngOnInit() {}

  async shareRedditPost(post: WallStreetBets | Investing){
    await Share.share({
      title: post.title,
      text: post.selftext,
      url: `https://reddit.com${post.permalink}`,
      dialogTitle: 'Share Reddit Post'
    }) ;
  }

}
