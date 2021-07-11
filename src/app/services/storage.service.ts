/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChartFullDetails, Details, LoadInterFace } from '../models/company.interface';
import { HomeApi } from '../models/home.interface';
import { FeedAPI, News } from '../models/news.interface';
import { List } from '../models/search.interface';
import { Twitter } from '../models/twitter.interface';
import { ToastService } from './toast.service';

// const IMG_FOLDER = 'CACHE_IMG' ;
const PREFIX_INFO = 'INFO_' ;
const PREFIX_CHART = 'CHART_' ;
const PREFIX_TWITTER = 'TWITTER_' ;
const PREFIX_NEWS = 'NEWS_' ;
const INFO_PATH = `company_info` ;
const CHART_PATH = `company_chart` ;
const TWITTER_PATH = `company_twitter` ;
const NEWS_PATH = `company_news` ;


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  bookmarkCopy: Observable<List[]>;

  private bookmarks: List[] = [];
  private bookmarkObservable = new BehaviorSubject<List[]>(this.bookmarks) ;

  constructor(private toast: ToastService) {
    this.bookmarkCopy = this.bookmarkObservable.asObservable() ;
  }

  async initCacheFolders(){
    try{
      // await Filesystem.mkdir({
      //   directory: Directory.Cache,
      //   path: IMG_FOLDER
      // }) ;

      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: `home`
      }) ;

      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: `feed`
      }) ;

      // await Filesystem.mkdir({
      //   directory: Directory.Cache,
      //   path: `company`
      // }) ;

      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: TWITTER_PATH
      }) ;

      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: NEWS_PATH
      }) ;

      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: CHART_PATH
      }) ;

      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: INFO_PATH
      }) ;
    }
    catch(err){
      console.error(err);
    }
  }

  async initBookmarksFile(){
    try{
      const result = await Filesystem.readFile({
        directory: Directory.Data,
        path: 'app-bookmarks.json',
        encoding: Encoding.UTF8
      }) ;

      if (!result.data){
        throw new Error('App config file not found') ;
      }
      else{
        // console.log(JSON.parse(result.data));
        this.bookmarks = JSON.parse(result.data) as List[] ;
        this.bookmarkObservable.next(JSON.parse(result.data)) ;
      }
    }
    catch(err){
      console.log(err.stack);
      await Filesystem.writeFile({
        directory: Directory.Data,
        path: 'app-bookmarks.json',
        data: JSON.stringify(this.bookmarks)
      }) ;
    }
  }

  async loadHomeData(){
    try{
      const result = await Filesystem.readFile({
        directory: Directory.Cache,
        path: `home/home-api.json`,
        encoding: Encoding.UTF8
      }) ;
      console.log('home data loaded successfully');
      return JSON.parse(result.data) as HomeApi ;
    }
    catch(err){
      console.error(err);
      console.log('failed to load home data');
      return null ;
    }
  }

  async saveHomeData(data: HomeApi){
    try{
      await Filesystem.writeFile({
        directory: Directory.Cache,
        data: JSON.stringify(data),
        encoding: Encoding.UTF8,
        path: `home/home-api.json`
      }) ;

      console.log('home api data saved');
    }
    catch(err){
      console.error(err);
      console.log('home api data failed to save');
    }
  }

  async loadFeed(){
    try{
      const result = await Filesystem.readFile({
        directory: Directory.Cache,
        path: `feed/feed-api.json`,
        encoding: Encoding.UTF8
      }) ;

      console.log('loaded feed successfully');
      return JSON.parse(result.data) as FeedAPI ;
    }
    catch(err){
      console.error(err);
      console.log('failed to load feed');
      return null ;
    }
  }

  async saveFeed(data: FeedAPI){
    try{
      await Filesystem.writeFile({
        directory: Directory.Cache,
        data: JSON.stringify(data),
        encoding: Encoding.UTF8,
        path: `feed/feed-api.json`
      }) ;

      console.log('feed api data saved');
    }
    catch(err){
      console.error(err);
      console.log('feed api data failed to save');
    }
  }

  async addBookmark(company: List){
    try{
      this.bookmarks.push(company) ;
      this.bookmarkObservable.next(this.bookmarks) ;

      await Filesystem.writeFile({
        directory: Directory.Data,
        path: 'app-bookmarks.json',
        encoding: Encoding.UTF8,
        data: JSON.stringify(this.bookmarks)
      }) ;

      await this.toast.showNormalToast('Added new bookmark ', 1000) ;
    }
    catch(err){
      console.error(err) ;
    }
  }

  async removeBookmark(company: List){
    try{
      if (this.bookmarks.length === 1){
        this.bookmarks = [] ;
        this.bookmarkObservable.next(this.bookmarks) ;
      }
      else{
        this.bookmarks = this.bookmarks.filter( c => c.symbol !== company.symbol ) ;
        this.bookmarkObservable.next(this.bookmarks) ;
      }

      await Filesystem.writeFile({
        directory: Directory.Data,
        path: 'app-bookmarks.json',
        encoding: Encoding.UTF8,
        data: JSON.stringify(this.bookmarks)
      }) ;

      await this.toast.showNormalToast('Removed Bookmark', 1000) ;
      await this.clearCache(company.symbol) ;
    }
    catch(err){
      console.log('error clearing bookmark');
      console.error(err);
    }
  }

  async updateBookmarks(list: List[]){
    try{
      await Filesystem.writeFile({
        directory: Directory.Data,
        path: 'app-bookmarks.json',
        encoding: Encoding.UTF8,
        data: JSON.stringify(list)
      }) ;

      console.log('bookmarks saved');
    }
    catch(err){
      console.error(err);
      console.log('failed to save bookmarks');
    }
  }

  getBookmarks(){
    return this.bookmarkObservable.value ;
  }

  // async loadCompanyData(symbol: string){
  //   try{
  //     const value = await Filesystem.readFile({
  //       directory: Directory.Cache,
  //       path: `company/info/${PREFIX_INFO}${symbol}.json`,
  //       encoding: Encoding.UTF8
  //     }) ;

  //     if (value.data.length){
  //       return JSON.parse(value.data) as Details ;
  //     }
  //     else{
  //       return null ;
  //     }
  //   }
  //   catch(err){
  //     console.error(err);
  //     return null ;
  //   }
  // }

  async loadCompanyFullData(symbol: string, twitter: null | Twitter): Promise<LoadInterFace | null>{
    try{
      if (twitter){
        const details = await Filesystem.readFile({
          directory: Directory.Cache,
          path: `${INFO_PATH}/${PREFIX_INFO+symbol}.json`,
          encoding: Encoding.UTF8
        }) ;

        const chart = await Filesystem.readFile({
          directory: Directory.Cache,
          path: `${CHART_PATH}/${PREFIX_CHART+symbol}.json`,
          encoding: Encoding.UTF8
        }) ;

        const news = await Filesystem.readFile({
          directory: Directory.Cache,
          path: `${NEWS_PATH}/${PREFIX_NEWS+symbol}.json`,
          encoding: Encoding.UTF8
        }) ;

        const twitr = await Filesystem.readFile({
          directory: Directory.Cache,
          path: `${TWITTER_PATH}/${PREFIX_TWITTER+symbol}.json`,
          encoding: Encoding.UTF8
        }) ;

        return {
          details: JSON.parse(details.data) as Details,
          chart: JSON.parse(chart.data) as ChartFullDetails,
          news: JSON.parse(news.data) as News[],
          twitter: JSON.parse(twitr.data) as Twitter[],
        } ;
      }
      else{
        const details = await Filesystem.readFile({
          directory: Directory.Cache,
          path: `${INFO_PATH}/${PREFIX_INFO+symbol}.json`,
          encoding: Encoding.UTF8
        }) ;

        const chart = await Filesystem.readFile({
          directory: Directory.Cache,
          path: `${CHART_PATH}/${PREFIX_CHART+symbol}.json`,
          encoding: Encoding.UTF8
        }) ;

        const news = await Filesystem.readFile({
          directory: Directory.Cache,
          path: `${NEWS_PATH}/${PREFIX_NEWS+symbol}.json`,
          encoding: Encoding.UTF8
        }) ;

        return {
          details: JSON.parse(details.data) as unknown as Details,
          chart: JSON.parse(chart.data) as unknown as ChartFullDetails,
          news: JSON.parse(news.data) as unknown as News[],
          twitter: null
        } ;
      }
    }
    catch(err){
      console.error(err);
      console.log('company full details failed to load');
      return null ;
    }
  }

  async saveCompanyInfo(data: Details){
    try{
      await Filesystem.writeFile({
        directory: Directory.Cache,
        path: `${INFO_PATH}/${PREFIX_INFO+data.stock.symbol}.json`,
        encoding: Encoding.UTF8,
        data: JSON.stringify(data)
      }) ;

      console.log('saved company info');
    }
    catch(err){
      console.error(err);
      console.log('error saving company info');
    }
  }

  async saveChartData(symbol: string, chartData: ChartFullDetails){
    try{
      await Filesystem.writeFile({
        directory: Directory.Cache,
        path: `${CHART_PATH}/${PREFIX_CHART+symbol}.json`,
        encoding: Encoding.UTF8,
        data: JSON.stringify(chartData)
      }) ;

      console.log('saved chart data');
    }
    catch(err){
      console.log('error saving chart data');
      console.error(err);
    }
  }

  async saveNews(symbol: string, news: News[]){
    console.log(news);
    try{
      await Filesystem.writeFile({
        directory: Directory.Cache,
        path: `${NEWS_PATH}/${PREFIX_NEWS+symbol}.json`,
        encoding: Encoding.UTF8,
        data: JSON.stringify(news)
      }) ;

      console.log('saved news');
    }
    catch(err){
      console.log('error saving news');
      console.error(err);
    }
  }

  async saveTwitterTweets(symbol: string, twitr: Twitter[]){
    console.log(twitr);
    try{
      await Filesystem.writeFile({
        directory: Directory.Cache,
        path: `${TWITTER_PATH}/${PREFIX_TWITTER+symbol}.json`,
        encoding: Encoding.UTF8,
        data: JSON.stringify(twitr)
      }) ;

      console.log('saved twitter tweets');
    }
    catch(err){
      console.log('error saving twitter tweets');
      console.error(err);
    }
  }

  async clearCache(sym: string){
    try{
      await Filesystem.deleteFile({
        directory: Directory.Cache,
        path: `${INFO_PATH}/${PREFIX_INFO+sym}.json`
      }) ;
      await Filesystem.deleteFile({
        directory: Directory.Cache,
        path: `${CHART_PATH}/${PREFIX_CHART+sym}.json`
      }) ;
      await Filesystem.deleteFile({
        directory: Directory.Cache,
        path: `${NEWS_PATH}/${PREFIX_NEWS+sym}.json`
      }) ;
      await Filesystem.deleteFile({
        directory: Directory.Cache,
        path: `${TWITTER_PATH}/${PREFIX_TWITTER+sym}.json`
      }) ;

      console.log('deleted symbol cache', sym);
    }
    catch(err){
      console.log('failed to clear cache');
      console.error(err);
    }
  }
}
