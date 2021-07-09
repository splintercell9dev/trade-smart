import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { List } from '../models/search.interface';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { CompanyModalComponent } from '../shared/company-modal/company-modal.component';
import { fullDetails } from '../static/static-data' ;

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, OnDestroy {

  bookmarks: List[] ;

  sub: Subscription ;

  constructor(private storage: StorageService, private api: ApiService, private modalCtrl: ModalController) {
    this.bookmarks = [] ;
  }

  ngOnInit() {
    this.sub = this.storage.bookmarkCopy.subscribe(val => {
      this.bookmarks = val ;
    }) ;
  }

  ngOnDestroy(){
    this.sub.unsubscribe() ;
  }

  async removeBookmarks(company: List){
    await this.storage.removeBookmark(company) ;
  }

  trackByFn(index, company: List){
    return company.symbol ;
  }

  onRefresh(event){
    if (this.bookmarks.length){
      const list = this.bookmarks.map(c => c.symbol) ;
      this.api.getBookmarkData(list).subscribe(
        async res => {
          this.bookmarks = res.list ;
          await this.storage.updateBookmarks(res.list) ;
          event.target.complete() ;
        },
        err => {
          console.error(err);
          event.target.complete() ;
        }
      ) ;
    }
    else{
      event.target.complete() ;
    }
  }

  async presentModal(symbol: string){
    const twitter = fullDetails.filter( company => company.symbol === symbol )[0] ;

    const modal = await this.modalCtrl.create({
      component: CompanyModalComponent,
      componentProps: {
        symbol,
        twitter
      }
    }) ;

    return modal.present() ;
  }
}
