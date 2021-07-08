import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HomeApi } from '../models/home.interface';
import { FeedAPI } from '../models/news.interface';
import { List } from '../models/search.interface';
import { ToastService } from './toast.service';

const IMG_FOLDER = 'CACHE_IMG' ;
const API_FOLDER = 'CACHE_API' ;

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
      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: IMG_FOLDER
      }) ;

      await Filesystem.mkdir({
        directory: Directory.Cache,
        path: API_FOLDER
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
        path: `/${API_FOLDER}/home-api.json`,
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
        path: `/${API_FOLDER}/home-api.json`
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
        path: `/${API_FOLDER}/feed-api.json`,
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
        path: `/${API_FOLDER}/feed-api.json`
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
    }
    catch(err){
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
}
