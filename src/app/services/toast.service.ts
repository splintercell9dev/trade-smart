import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core' ;

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showNormalToast(msg: string, time: number){
    const toast = await this.toastCtrl.create({
      duration: time,
      message: msg,
      cssClass: 'toastClass'
    }) ;

    await toast.present() ;
  }

  async showCustomToast(options: ToastOptions){
    const toast = await this.toastCtrl.create(options) ;

    await toast.present() ;
  }
}
