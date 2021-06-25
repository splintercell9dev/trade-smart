import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, ThemeService } from 'ng2-charts';
import { Subject } from 'rxjs';
import { GraphData } from 'src/app/models/home.interface';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('stockIndexCanvas') canvas: ElementRef<HTMLCanvasElement> ;
  @Input() data: GraphData[] ;
  @Input() isNegative: boolean ;
  @Input() indexName: string ;

  context: CanvasRenderingContext2D ;
  currentCard: GraphData ;
  cardSubject = new Subject<GraphData>() ;
  chartColors = {
    success: {
      dark: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-success').trim(),
      light: '#96e9b7'
    },
    danger: {
      dark: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-danger').trim(),
      light: '#f38c99'
    }
  } ;
  gradient: any ;
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Price'
    }
  ] ;
  chartOptions: ChartOptions = {
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 10
      }
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        borderWidth: 4
      }
    },
    animation: {
      easing: 'easeOutSine',
      duration: 500
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    },
    responsive: true,
    maintainAspectRatio: false
  } ;
  chartLabels: Label[] = [] ;
  chartType: ChartType = 'line' ;
  chartColor: Color[] = [] ;
  constructor(private change: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.cardSubject.subscribe(data => {
      this.setChartVariables() ;
    }) ;
  }

  ngAfterViewInit(){
    this.context = this.canvas.nativeElement.getContext('2d') ;
    this.setChartVariables() ;
    this.change.detectChanges() ;
  }

  ngOnChanges(){
    this.currentCard = this.data.filter(index => index.name === this.indexName)[0] ;
    this.cardSubject.next() ;
  }

  ngOnDestroy(){
    this.cardSubject.complete() ;
  }

  setChartVariables(){
    this.chartData[0].data = this.currentCard.data.map( index => index.value ) ;
    this.chartLabels = this.currentCard.data.map(index => index.time) ;
    const dimension = {
      width: this.canvas.nativeElement.width/3,
      height: this.canvas.nativeElement.height/3
    } ;
    this.gradient = this.context.createLinearGradient(dimension.width/2, dimension.height, dimension.width/2, 0) ;
    if (!this.isNegative){
      this.gradient.addColorStop(0, 'rgba(0,0,0,0)') ;
      this.gradient.addColorStop(1, this.chartColors.success.light) ;
    }
    else{
      this.gradient.addColorStop(0, 'rgba(0,0,0,0)') ;
      this.gradient.addColorStop(1, this.chartColors.danger.light) ;
    }
    this.chartColor = [
      {
        backgroundColor: this.gradient,
        borderColor: !this.isNegative ? this.chartColors.success.dark : this.chartColors.danger.dark
      }
    ] ;
  }

}
