import { ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Dimension, GraphData } from './home.interface';

export class Chart {
    data: GraphData[] ;
    currentCard: GraphData ;
    dimension: Dimension ;
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
      responsiveAnimationDuration: 0,
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
    constructor(data: GraphData[]){
        this.data = data ;
    }

    setCurrentIndex(indexName: string){
        this.currentCard = this.data.filter(index => index.name === indexName)[0] ;
    }

    setVariables(context: CanvasRenderingContext2D, isNegative: boolean, div: ElementRef<HTMLDivElement>){
        this.chartData[0].data = this.currentCard.data.map( index => index.value ) ;
        this.chartLabels = this.currentCard.data.map( index => index.time ) ;
        this.dimension = {
          width: div.nativeElement.offsetWidth,
          height: div.nativeElement.offsetHeight
        } ;
        this.gradient = context.createLinearGradient(this.dimension.width/2, this.dimension.height, this.dimension.width/2, 0) ;
        if (!isNegative){
            this.gradient.addColorStop(0.6, 'rgba(255,255,255,0)') ;
            this.gradient.addColorStop(1, this.chartColors.success.light) ;
        }
        else{
          this.gradient.addColorStop(0.6, 'rgba(255,255,255,0)') ;
          this.gradient.addColorStop(1, this.chartColors.danger.light) ;
        }
        this.chartColor = [
          {
            backgroundColor: this.gradient,
            borderColor: !isNegative ? this.chartColors.success.dark : this.chartColors.danger.dark
          }
        ] ;
    }
}
