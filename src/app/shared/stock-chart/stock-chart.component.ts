import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'src/app/models/chart';
import { Dimension, GraphData } from 'src/app/models/home.interface';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('stockIndexCanvas') canvas: ElementRef<HTMLCanvasElement> ;
  @ViewChild('canvasContainer') div: ElementRef<HTMLDivElement> ;
  @Input() data: GraphData[] ;
  @Input() isNegative: boolean ;
  @Input() indexName: string ;
  chartObject: Chart ;
  constructor(private change: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.chartObject = new Chart(this.data) ;
  }

  ngAfterViewInit(){
    const context = this.canvas.nativeElement.getContext('2d') ;
    this.chartObject.setCurrentIndex(this.indexName) ;
    this.chartObject.setVariables(context, this.isNegative, this.div) ;
    this.change.detectChanges() ;
  }

  ngOnChanges(){
    if (!this.canvas){
      this.chartObject.setVariables(this.canvas.nativeElement.getContext('2d'), this.isNegative, this.div) ;
    }
  }

}
