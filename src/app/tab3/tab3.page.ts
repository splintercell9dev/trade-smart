import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bookmark, List } from '../models/search.interface';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy{

  loadingState = false ;

  searchText: string ;

  results: Bookmark[] ;

  bookmarks: List[] ;

  sub: Subscription ;

  constructor(private api: ApiService, private storage: StorageService) {
    this.searchText = '' ;
    this.results = [] ;
  }

  ngOnInit(){
    // this.sub = this.storage.bookmarkCopy.subscribe( b => {
    //   this.bookmarks = b ;
    // }) ;
  }

  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe() ;
    }
  }

  onTyping(event){
    if (event.value === ''){
      this.loadingState = false ;
    }
    else{
      this.loadingState = true ;
    }
  }

  getSearchResults(){
    if (this.searchText === ''){
      this.loadingState = false ;
      this.results = [] ;
    }
    else{
      this.api.getSearchData(this.searchText).subscribe(
        res => {
          console.log(res) ;
          const bookmarks = this.storage.getBookmarks() ;
          if (bookmarks.length){
            this.results = res.list.map( company => ({
              ...company,
              bookmarked: bookmarks.some(value => value.symbol === company.symbol)
            })) ;
          }
          else{
            this.results = res.list.map( company => ({
                ...company,
                bookmarked: false
            })) ;
          }
          this.loadingState = false ;
        },
        (err) => {
          console.log(err) ;
          this.results = [] ;
          this.loadingState = false ;
        }
      ) ;
    }
  }

  async addBookmark(c: Bookmark){
    this.results = this.results.map(company => {
      if (company.symbol === c.symbol){
        company.bookmarked = true ;
      }
      return company ;
    }) ;
    await this.storage.addBookmark(c as List) ;
  }

  async removeBookmark(c: Bookmark){
    this.results = this.results.map(company => {
      if (company.symbol === c.symbol){
        company.bookmarked = false ;
      }
      return company ;
    }) ;
    await this.storage.removeBookmark(c as List) ;
  }

  trackByFn(index, item: Bookmark){
    return item.name ;
  }
}
