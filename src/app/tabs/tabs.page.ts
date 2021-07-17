import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  @ViewChild(IonTabs) tabs: IonTabs ;
  tabRoute = 'tab1' ;

  constructor(private storage: StorageService) {}

  ngOnInit(){}

  setSelectedTab(){
    this.tabRoute = this.tabs.getSelected() ;
  }

}
