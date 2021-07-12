import { Component, Input, OnInit } from '@angular/core';
import { AssetProfile } from 'src/app/models/company.interface';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  @Input() profile: AssetProfile ;

  constructor() { }

  ngOnInit() {
    console.log(this.profile);
  }

}
