import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartFullDetails } from 'src/app/models/company.interface';
import * as moment from 'moment' ;
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-company-charts',
  templateUrl: './company-charts.component.html',
  styleUrls: ['./company-charts.component.scss'],
})
export class CompanyChartsComponent implements OnInit, AfterViewInit {
  @Input() symbol: string ;
  @Input() isNegative: boolean ;
  @Input() charts: ChartFullDetails ;
  @ViewChild('companyChart') canvas: ElementRef<HTMLCanvasElement> ;
  @ViewChild(BaseChartDirective) companyChart: BaseChartDirective ;

  chartSliders = [ '1 day', '5 days', '6 months', '1 year', '5 years' ] ;

  selection = ['1d', '5d', '6mo', '1y', '5y'] ;

  activeChip = 0 ;

  currentSelection: '1d' | '5d' | '6mo' | '1y' | '5y' = '1d' ;

  chartSlideOptions = {
    freeMode: true,
    slidesPerView: 3,
    slidesOffsetAfter: 5
  } ;

  graphColors = {
    success: {
      dark: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-success').trim(),
      light: '#96e9b7'
    },
    danger: {
      dark: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-danger').trim(),
      light: '#f38c99'
    },
    medium: getComputedStyle(document.documentElement).getPropertyValue('--ion-color-medium').trim(),
    gridlineColor: 'rgba(255,255,255,0.3)',
    pointerSuccessColor: 'rgb(51, 153, 64)',
    pointerDangerColor: 'rgb(246, 8, 8)'
  } ;

  gradient: any ;
  dimensions = {
    width: 0,
    height: 0
  } ;

  companyChartData: ChartDataSets[] = [{
    data: []
  }];

  companyChartOptions: ChartOptions = {
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        right: 10
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverBorderWidth: 3,
        hoverRadius: 5
      },
      line: {
        borderWidth: 3
      }
    },
    animation: {
      duration: 0
    },
    tooltips: {
      displayColors: false,
      mode: 'index',
      intersect: false,
      callbacks: {
        title: (item, data) => ''
      },
      bodyFontFamily: 'proza',
      bodyFontSize: 15
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: this.graphColors.gridlineColor
          },
          type: 'time',
          distribution: 'series',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
            fontFamily: 'proza',
            fontSize: 14,
            fontColor: this.graphColors.medium,
            minRotation: 0,
            maxRotation: 0
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            color: this.graphColors.gridlineColor
          },
          ticks: {
            fontFamily: 'proza',
            fontSize: 14,
            fontColor: this.graphColors.medium
          }
        }
      ]
    },
    responsive: true,
    maintainAspectRatio: false
  } ;
  companyChartLabels: Label[] ;
  companyChartColors: Color[] = [] ;

  constructor(private platform: Platform, private api: ApiService, private storage: StorageService, private cd: ChangeDetectorRef){
    if (this.platform.width() <= 360 ){
      console.log('inside');
      this.chartSlideOptions.slidesPerView = 2.8 ;
    }
    else if (this.platform.width() > 360 && this.platform.width() < 576){
      console.log('out');
      this.chartSlideOptions.slidesPerView = 3.5 ;
    }
    else{
      this.chartSlideOptions.slidesPerView = 5 ;
    }
  }

  ngOnInit() {
    console.log(this.charts);
  }

  ngAfterViewInit(){
    this.dimensions = {
      width: this.canvas.nativeElement.width/3,
      height: this.canvas.nativeElement.height/3
    } ;
    this.loadChartRange(this.currentSelection) ;
    this.cd.detectChanges() ;
  }

  selectChip(index: number){
    this.activeChip = index ;
    this.currentSelection = this.selection[index] as '1d' | '5d' | '6mo' | '1y' | '5y' ;
    this.loadChartRange(this.currentSelection) ;
  }

  loadChartRange(r: '1d' | '5d' | '6mo' | '1y' | '5y'){
    if (!this.charts[r].indicators.length){
      this.api.getChartValues(this.symbol, r).subscribe(
        async res => {
          this.charts[r] = res.chart ;
          await this.storage.saveChartData(this.symbol, this.charts) ;
          this.setChartRequirements(r) ;
        },
        err => {
          console.log('error occurred while gathering range data');
          console.error(err);
        }
      ) ;
    }
    else{
      this.setChartRequirements(r) ;
    }
  }

  setChartRequirements(timeRange: '1d' | '5d' | '6mo' | '1y' | '5y'){
    this.companyChartData = [{
        data: this.charts[timeRange].indicators
    }] ;

    this.companyChartLabels = this.charts[timeRange].timestamp.map( time => moment(time*1000).toISOString()) ;

    const context = this.canvas.nativeElement.getContext('2d') ;
    this.gradient = context.createLinearGradient(this.dimensions.width/2, this.dimensions.height, this.dimensions.width/2, 0) ;

    if (timeRange === '1d'){
      if (!this.isNegative){
        this.gradient.addColorStop(0, 'rgba(0,0,0,0)') ;
        this.gradient.addColorStop(1, this.graphColors.success.light) ;
      }
      else{
        this.gradient.addColorStop(0, 'rgba(0,0,0,0)') ;
        this.gradient.addColorStop(1, this.graphColors.danger.light) ;
      }
      this.companyChartOptions = {
        ...this.companyChartOptions,
        tooltips: {
          ...this.companyChartOptions.tooltips,
          callbacks: {
            ...this.companyChartOptions.tooltips.callbacks,
            label: (item, data) => `${moment(item.xLabel).format('HH:mm A')} : ₹${parseFloat(item.yLabel.toString()).toFixed(2)}`
          }
        },
        scales: {
          ...this.companyChartOptions.scales,
          xAxes: [{
            ...this.companyChartOptions.scales.xAxes[0],
            time: {
              unit: 'hour'
            }
          }]
        }
      } ;
      this.companyChartColors = [
        {
          backgroundColor: this.gradient,
          borderColor: !this.isNegative ? this.graphColors.success.dark : this.graphColors.danger.dark
        }
      ] ;
    }
    else if (timeRange === '5d'){
      this.companyChartOptions = {
        ...this.companyChartOptions,
        tooltips: {
          ...this.companyChartOptions.tooltips,
          callbacks: {
            ...this.companyChartOptions.tooltips.callbacks,
            label: (item, data) => `${moment(item.xLabel).format('DD MMM, HH:mm A')} : ₹${parseFloat(item.yLabel.toString()).toFixed(2)}`
          }
        },
        scales: {
          ...this.companyChartOptions.scales,
          xAxes: [{
            ...this.companyChartOptions.scales.xAxes[0],
            time: {
              unit: 'day'
            }
          }]
        }
      } ;
    }
    else if (timeRange === '6mo' || timeRange === '1y'){
      this.companyChartOptions = {
        ...this.companyChartOptions,
        tooltips: {
          ...this.companyChartOptions.tooltips,
          callbacks: {
            ...this.companyChartOptions.tooltips.callbacks,
            label: (item, data) => `${moment(item.xLabel).format('DD MMM YYYY')} : ₹${parseFloat(item.yLabel.toString()).toFixed(2)}`
          }
        },
        scales: {
          ...this.companyChartOptions.scales,
          xAxes: [{
            ...this.companyChartOptions.scales.xAxes[0],
            time: {
              unit: 'month'
            },
            ticks: {
              ...this.companyChartOptions.scales.xAxes[0].ticks,
              maxTicksLimit: 4
            }
          }]
        }
      } ;
    }
    else{
      this.companyChartOptions = {
        ...this.companyChartOptions,
        tooltips: {
          ...this.companyChartOptions.tooltips,
          callbacks: {
            ...this.companyChartOptions.tooltips.callbacks,
            label: (item, data) => `${moment(item.xLabel).format('DD MMM YYYY')} : ₹${parseFloat(item.yLabel.toString()).toFixed(2)}`
          }
        },
        scales: {
          ...this.companyChartOptions.scales,
          xAxes: [{
            ...this.companyChartOptions.scales.xAxes[0],
            time: {
              unit: 'year'
            }
          }]
        }
      } ;
    }

    this.companyChart.chart.update() ;

    if (this.currentSelection !== '1d'){
      this.gradient.addColorStop(0, 'rgba(0,0,0,0)') ;
      this.gradient.addColorStop(1, this.graphColors.success.light) ;

      this.companyChartColors = [
        {
          backgroundColor: this.gradient,
          borderColor: this.graphColors.success.dark
        }
      ] ;
    }

  }
}
