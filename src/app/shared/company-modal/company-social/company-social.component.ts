import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.interface';
import { Twitter } from 'src/app/models/twitter.interface';

@Component({
  selector: 'app-company-social',
  templateUrl: './company-social.component.html',
  styleUrls: ['./company-social.component.scss'],
})
export class CompanySocialComponent implements OnInit {
  @Input() twitter: Twitter[] ;
  @Input() news: News[] ;
  hasTweets: boolean ;

  constructor() {
  }

  ngOnInit() {
    console.log(this.twitter);
    if (this.twitter){
      this.hasTweets = true ;
    }
    else{
      this.hasTweets = false ;
    }
  }

}
