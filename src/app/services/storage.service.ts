import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HomeApi } from '../models/home.interface';

const IMG_FOLDER = 'CACHE_IMG' ;
const API_FOLDER = 'CACHE_API' ;

const APP_CONFIG = {
  bookmarks: []
} ;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  bookmarkCopy: Observable<any>;

  private bookmarks = APP_CONFIG ;
  private bookmarkObservable = new BehaviorSubject(APP_CONFIG) ;

  constructor() {
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

  async initAppConfigFile(){
    try{
      const result = await Filesystem.readFile({
        directory: Directory.Data,
        path: 'app-config.json',
        encoding: Encoding.UTF8
      }) ;

      if (!result.data){
        throw new Error('App config file not found') ;
      }
      else{
        this.bookmarks = JSON.parse(result.data) ;
        this.bookmarkObservable.next(JSON.parse(result.data)) ;
      }
    }
    catch(err){
      console.log(err.stack);
      await Filesystem.writeFile({
        path: 'app-config.json',
        data: JSON.stringify(APP_CONFIG),
        directory: Directory.Data
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
}
