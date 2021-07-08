import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { List } from '../models/search.interface';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  @ViewChild(IonTabs) tabs: IonTabs ;
  tabRoute = 'tab1' ;

  firstTime = true ;
  prevBookmarks: List[] ;
  currBookmarks: List[] ;
  newBookmarks: number ;
  sub: Subscription ;

  constructor(private storage: StorageService, private zone: NgZone) {
    console.log('constructor');
    this.prevBookmarks = [] ;
    this.currBookmarks = [] ;
    this.newBookmarks = 0 ;
  }

  ngOnInit(){
    this.sub = this.storage.bookmarkCopy.subscribe( val => {
      console.log('inside subs');
      if (!val.length){
        this.currBookmarks = [] ;
        this.prevBookmarks = [] ;
      }
      else{
        this.currBookmarks = val ;
      }

      if (this.firstTime){
        this.firstTime = false ;
        this.prevBookmarks = val ;
        this.newBookmarks = 0 ;
        console.log('done once only');
      }
      else{
        console.log('else block');
        this.newBookmarks = this.checkNewBookmarks(val) ;
      }
      console.log(this.prevBookmarks, val);
    }) ;
  }

  ngOnDestroy(){
    console.log('on destroy called');
    this.sub.unsubscribe() ;
  }

  setSelectedTab(){
    this.tabRoute = this.tabs.getSelected() ;
    console.log(this.tabRoute);
    if (this.tabRoute === 'tab4'){
      this.prevBookmarks = this.currBookmarks ;
      console.log('prev changed to current', this.prevBookmarks);
      this.newBookmarks = 0 ;
    }
  }

  checkNewBookmarks(curr: List[]): number{
    console.log('inside check ',this.prevBookmarks, this.currBookmarks);
    const values = curr.filter( company => !this.prevBookmarks.some( val => val.symbol === company.symbol)) ;
    console.log(values.length);
    return values.length ;
  }

}
