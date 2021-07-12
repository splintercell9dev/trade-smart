import { Component, Input, OnInit } from '@angular/core';
import { BalanceSheetHistory, DetailsIncomeStatementHistory } from 'src/app/models/company.interface';

@Component({
  selector: 'app-company-finance',
  templateUrl: './company-finance.component.html',
  styleUrls: ['./company-finance.component.scss'],
})
export class CompanyFinanceComponent implements OnInit {
  @Input() balanceSheet: BalanceSheetHistory ;
  @Input() incomeHistory: DetailsIncomeStatementHistory ;

  constructor() {}

  ngOnInit() {
    console.log(this.balanceSheet, this.incomeHistory);
  }

}
