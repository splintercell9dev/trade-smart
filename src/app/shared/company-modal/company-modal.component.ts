import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChartFullDetails, CompanyFullDetails, Details, LoadInterFace } from 'src/app/models/company.interface';
import { News, NewsAPI } from 'src/app/models/news.interface';
import { List } from 'src/app/models/search.interface';
import { Twitter, TwitterAPI } from 'src/app/models/twitter.interface';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss'],
})
export class CompanyModalComponent implements OnInit {
  @Input() symbol: string;
  @Input() company: List;
  @Input() twitr: null | Twitter ;
  error = false ;
  loading = true ;

  companyDetails: Details ;
  chartData: ChartFullDetails ;
  news: News[] ;
  twitter: Twitter[] ;

  chipHeaders = ['Summary', 'Charts', 'Finance', 'Social', 'Profile'] ;
  iconList = ['newspaper', 'pie-chart', 'analytics', 'logo-facebook', 'person'] ;
  activeSlide = 0 ;

  sliderOptions = {
    freeMode: true,
    slidesPerView: 2.9,
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 5
  } ;

  constructor(private platform: Platform, private modalCtrl: ModalController, private api: ApiService, private storage: StorageService) {
    this.chartData = {
      '1d': {
        range: '1d',
        indicators: [],
        timestamp: []
      },
      '5d': {
        range: '5d',
        indicators: [],
        timestamp: []
      },
      '6mo': {
        range: '6mo',
        indicators: [],
        timestamp: []
      },
      '1y': {
        range: '1y',
        indicators: [],
        timestamp: []
      },
      '5y': {
        range: '5y',
        indicators: [],
        timestamp: []
      }
    } ;

    if (this.platform.width() < 360 ){
      this.sliderOptions.slidesPerView = 2.8 ;
    }
    else if (this.platform.width() > 360 && this.platform.width() < 576){
      this.sliderOptions.slidesPerView = 3.5 ;
    }
  }

  async ngOnInit() {
    const result = await this.storage.loadCompanyFullData(this.symbol, this.twitr) ;

    if (!result){
      console.log('inside api');
      if (this.twitr !== null){
        (await this.api.getCompanyFullDataWithTwitter(this.symbol)).subscribe(
          async (res: any) => {
            console.log('inside set full', res);
            this.companyDetails = res[0].details ;
            this.chartData['1d'] = res[1].chart ;
            this.news = res[2].news ;
            this.twitter = res[3].twitter ;
            console.log(this.twitter, this.news, res);
            this.loading = false ;

            await this.saveAllDetails() ;
          },
          (err) => {
            console.log('failed to load data from api');
            console.error(err);
            this.error = true ;
            this.loading = false ;
          }
          ) ;
      }
      else{
        (await this.api.getCompanyFullDataWithoutTwitter(this.symbol)).subscribe(
          async (res) => {
            console.log('inside set 3');
            this.companyDetails = res[0].details ;
            this.chartData['1d'] = res[1].chart ;
            this.news = res[2].news ;
            this.twitter = [] ;

            this.loading = false ;
            await this.saveAllDetails() ;
          },
          (err) => {
            console.log('failed to load data from api');
            console.error(err);
            this.error = true ;
            this.loading = false ;
          }
        ) ;
      }
    }
    else{
      console.log('inside load');
      await this.loadAllDetails(result) ;
      this.loading = false ;
    }
  }

  async saveAllDetails(){
    console.log(this.news, this.twitter);
    await this.storage.saveCompanyInfo(this.companyDetails) ;
    await this.storage.saveChartData(this.symbol, this.chartData) ;
    await this.storage.saveNews(this.symbol, this.news) ;
    await this.storage.saveTwitterTweets(this.symbol, this.twitter) ;
  }

  async loadAllDetails(result: LoadInterFace){
    console.log(result);
    if (result.twitter !== null){
      this.companyDetails = result.details ;
      this.chartData = result.chart ;
      this.news = result.news ;
      this.twitter = result.twitter ;
    }
    else{
      this.companyDetails = result.details ;
      this.chartData = result.chart ;
      this.news = result.news ;
    }
  }

  dismiss(){
    this.modalCtrl.dismiss({
      dismissed: true
    }) ;
  }

  selectSlide(index: number){
    this.activeSlide = index ;
  }

  async refresh(){
    this.error = false ;
    this.loading = true ;
    if (this.twitr !== null){
      (await this.api.getCompanyFullDataWithTwitter(this.symbol)).subscribe(
        async (res: any) => {
          console.log('inside set full', res);
          this.companyDetails = res[0].details ;
          this.chartData['1d'] = res[1].chart ;
          this.news = res[2].news ;
          this.twitter = res[3].twitter ;
          console.log(this.twitter, this.news, res);
          this.loading = false ;

          await this.saveAllDetails() ;
        },
        (err) => {
          console.log('failed to load data from api');
          console.error(err);
          this.error = true ;
          this.loading = false ;
        }
        ) ;
    }
    else{
      (await this.api.getCompanyFullDataWithoutTwitter(this.symbol)).subscribe(
        async (res) => {
          console.log('inside set 3');
          this.companyDetails = res[0].details ;
          this.chartData['1d'] = res[1].chart ;
          this.news = res[2].news ;
          this.twitter = [] ;

          this.loading = false ;
          await this.saveAllDetails() ;
        },
        (err) => {
          console.log('failed to load data from api');
          console.error(err);
          this.error = true ;
          this.loading = false ;
        }
      ) ;
    }
  }

}
