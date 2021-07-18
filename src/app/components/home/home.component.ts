import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { GraphData, StockIndex } from 'src/app/models/home.interface';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('indicesSlider') slider: IonSlides ;
  lastUpdated: Date ;
  indexSliderOptions = {
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 25,
  } ;
  error = false ;
  loading = true ;
  graphData: GraphData[] ;
  indexData: StockIndex[] ;
  currentIndexName = 'BSE SENSEX' ;
  isNegative = false ;
  currentIndex = 0 ;

  constructor(private api: ApiService, private storage: StorageService) { }

  async ngOnInit() {
    const data = await this.storage.loadHomeData() ;
    if (data){
      this.lastUpdated = data.lastUpdated ;
      this.graphData = data.graph ;
      this.indexData = data.index ;
      this.loading = false ;
      this.error = false ;
    }
    else{
      this.api.getHomeData().subscribe(
        async (result) => {
          this.lastUpdated = result[0].metrics.lastUpdated ;
          this.indexData = result[0].metrics.data ;
          this.graphData = result[1].metrics.data ;

          this.loading = false ;
          this.error = false ;

          await this.storage.saveHomeData({
            lastUpdated: result[0].metrics.lastUpdated,
            index: result[0].metrics.data,
            graph: result[1].metrics.data
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

  async onSlideChange(){
    const value = await this.slider.getActiveIndex() ;
    this.currentIndex = value ;
    this.currentIndexName = this.indexData[value].name ;
    this.isNegative = this.indexData[value].negative ;
  }

  onRefresh(event: any){
    this.api.getHomeData().subscribe(
      async (result) => {
        this.lastUpdated = result[0].metrics.lastUpdated ;
        this.indexData = result[0].metrics.data ;
        this.graphData = result[1].metrics.data ;

        await this.storage.saveHomeData({
          lastUpdated: result[0].metrics.lastUpdated,
          index: result[0].metrics.data,
          graph: result[1].metrics.data
        }) ;

        event.target.complete() ;
      },
      (err) => {
        this.error = true ;
        console.error(err);
        event.target.complete() ;
      }
    ) ;
  }

  async retry(){
    this.loading = true ;
    this.error = false ;
    this.api.getHomeData().subscribe(
      async (result) => {
        this.lastUpdated = result[0].metrics.lastUpdated ;
        this.indexData = result[0].metrics.data ;
        this.graphData = result[1].metrics.data ;

        this.loading = false ;

        await this.storage.saveHomeData({
          lastUpdated: result[0].metrics.lastUpdated,
          index: result[0].metrics.data,
          graph: result[1].metrics.data
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
