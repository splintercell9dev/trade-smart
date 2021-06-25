import { Component, Input, OnInit } from '@angular/core';
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

}
