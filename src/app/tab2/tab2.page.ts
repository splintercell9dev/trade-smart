import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  segementColor: 'primary' | 'danger' | 'warning' ;
  currentSegment: 'twitter' | 'reddit' | 'news' ;
  constructor() {}

  ngOnInit(){
    this.segementColor = 'primary' ;
    this.currentSegment = 'twitter' ;
  }

  onSegmentChange(event){
    const value = event.target.value ;
    this.currentSegment = value ;
    this.segementColor = value === 'reddit' ? 'danger' : ( value === 'news' ? 'warning' : 'primary' ) ;
  }
}
