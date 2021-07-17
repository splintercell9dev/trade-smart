import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
import { Bookmark, List } from '../models/search.interface';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { CompanyModalComponent } from '../shared/company-modal/company-modal.component';
import { fullDetails } from '../static/static-data';

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

  constructor(private api: ApiService, private storage: StorageService, private router: Router, private modalCtrl: ModalController) {
    this.searchText = '' ;
    this.results = [] ;
  }

  ngOnInit(){
    this.sub = this.storage.bookmarkCopy.subscribe( val => {
      this.bookmarks = val ;
    }) ;

    this.router.events.subscribe( ev => {
      if (ev instanceof NavigationStart){
        this.searchText = '' ;
        this.results = [] ;
      }
    }) ;
  }

  ngOnDestroy(){
    this.sub.unsubscribe() ;
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
    const hasTwitter = fullDetails.filter( company => company.symbol === c.symbol )[0].twitter !== null ? true : false ;
    await this.storage.removeBookmark(c as List, hasTwitter) ;
  }

  trackByFn(index, item: Bookmark){
    return item.symbol ;
  }

  async presentModal(symbol: string, stock: List){
    const twitr = fullDetails.filter( company => company.symbol === symbol )[0].twitter ;

    const modal = await this.modalCtrl.create({
      component: CompanyModalComponent,
      componentProps: {
        symbol,
        company: stock
      }
    }) ;

    return modal.present() ;
  }
}
