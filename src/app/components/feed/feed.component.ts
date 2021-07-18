import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.interface';
import { Investing } from 'src/app/models/reddit.investing.interface';
import { WallStreetBets } from 'src/app/models/reddit.wallstreet.interface';
import { Twitter } from 'src/app/models/twitter.interface';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() tab: 'twitter' | 'reddit' | 'news' ;
  twitter: Twitter[] ;
  wallstreetbets: WallStreetBets[] ;
  investing: Investing[] ;
  news: News[] ;
  error = false;
  loading = true ;

  constructor(private api: ApiService, private storage: StorageService) { }

  async ngOnInit(){
    const data = await this.storage.loadFeed() ;
    if (data){
      this.twitter = data.twitter ;
      this.wallstreetbets = data.reddit.wallstreetbets ;
      this.investing = data.reddit.investing ;
      this.news = data.news ;

      this.loading = false ;
    }
    else{
      this.api.getFeedData().subscribe(
        async (result) => {
          this.twitter = result[0].twitter ;
          this.wallstreetbets = result[1].reddit.data ;
          this.investing = result[2].reddit.data ;
          this.news = result[3].news ;

          this.loading = false ;

          await this.storage.saveFeed({
            twitter: this.twitter,
            reddit: {
              wallstreetbets: this.wallstreetbets,
              investing: this.investing
            },
            news: this.news
          }) ;
        },
        (err) => {
          this.loading = false ;
          this.error = true ;
          console.error(err);
        }
      ) ;
    }
  }

  onRefresh(event: any){
    this.api.getFeedData().subscribe(
      async (result) => {
        this.twitter = result[0].twitter ;
        this.wallstreetbets = result[1].reddit.data ;
        this.investing = result[2].reddit.data ;
        this.news = result[3].news ;

        await this.storage.saveFeed({
          twitter: this.twitter,
          reddit: {
            wallstreetbets: this.wallstreetbets,
            investing: this.investing
          },
          news: this.news
        }) ;

        console.log('refreshed feed');

        event.target.complete() ;
      },
      (err) => {
        console.error(err);
        event.target.complete() ;
      }
    ) ;
  }

  async retry(){
    this.loading = true ;
    this.error = false ;
    this.api.getFeedData().subscribe(
      async (result) => {
        this.twitter = result[0].twitter ;
        this.wallstreetbets = result[1].reddit.data ;
        this.investing = result[2].reddit.data ;
        this.news = result[3].news ;

        this.loading = false ;

        await this.storage.saveFeed({
          twitter: this.twitter,
          reddit: {
            wallstreetbets: this.wallstreetbets,
            investing: this.investing
          },
          news: this.news
        }) ;
      },
      (err) => {
        this.loading = false ;
        this.error = true ;
        console.error(err);
      }
    ) ;
  }

}
