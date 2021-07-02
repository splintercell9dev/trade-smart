import { Component, Input, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { Data, Media, Twitter } from 'src/app/models/twitter.interface';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  @Input() twitter: Twitter[] ;
  constructor() { }

  ngOnInit() {}

  async shareTweet(username: string, tweet: Data){
    await Share.share({
      title: `Tweet by @${username}`,
      text: tweet.text,
      url: `https://twitter.com/${username}/status/${tweet.id}`,
      dialogTitle: 'Share Tweet'
    }) ;
  }

  getImageSrc(media: Media[], key: string){
    return media.filter(v => v.media_key === key)[0].preview_image_url ;
  }
}
