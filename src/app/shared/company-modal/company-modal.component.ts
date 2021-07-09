import { Component, Input, OnInit } from '@angular/core';
import { Twitter } from 'src/app/models/twitter.interface';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss'],
})
export class CompanyModalComponent implements OnInit {
  @Input() symbol: string;
  @Input() twitter: null | Twitter ;

  constructor() { }

  ngOnInit() {
    console.log(this.symbol);
  }

}
