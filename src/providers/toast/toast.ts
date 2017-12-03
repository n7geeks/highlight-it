import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController) {
    console.log('Hello ToastProvider Provider');
  }

  show(message: string, duration: number = 3000) {
    return this.toastCtrl.create({
      message: message,
      duration: duration
    }).present();
  }

}
