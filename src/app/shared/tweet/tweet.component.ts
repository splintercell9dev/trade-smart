import { Component, Input, OnInit } from '@angular/core';
import { Twitter } from 'src/app/models/twitter.interface';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() twitter: Twitter[] ;
  constructor() { }

  ngOnInit() {}

}
