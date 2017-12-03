import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  show(content: string = 'Please wait!') {
    return this.loadingCtrl.create({
      content: content
    })
  }

}
