import { Component, Input, OnInit } from '@angular/core';
import { SummaryDetail } from 'src/app/models/company.interface';
import { List } from 'src/app/models/search.interface';

@Component({
  selector: 'app-company-summary',
  templateUrl: './company-summary.component.html',
  styleUrls: ['./company-summary.component.scss'],
})
export class CompanySummaryComponent implements OnInit {
  @Input() stock: List ;
  @Input() summary: SummaryDetail ;

  constructor() { }

  ngOnInit() {
  }

}
