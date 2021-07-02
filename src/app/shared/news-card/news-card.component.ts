import { Component, Input, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { News } from 'src/app/models/new.interface';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() news: News[] ;
  constructor() { }

  ngOnInit() {
  }

  async shareLink(news: News){
    const firstDot = news.description.indexOf('.') ;
    await Share.share({
      title: news.title,
      text: news.description.substring(0, firstDot),
      url: news.url,
      dialogTitle: 'Share With'
    }) ;
  }

  openLink(url: string){
    window.open(url, '_system', 'location=no') ;
  }
}
