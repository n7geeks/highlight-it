import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'add-module',
  templateUrl: 'add-module.html'
})
export class AddModuleComponent {

  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private storageProvider: StorageProvider
  ) {
    console.log('Hello AddModuleComponent Component');
    this.storageProvider.getUserId().then(uid => {
      this.module.uid = uid;
    }).catch(e => {
      console.error("can't recover uid ", e);
    });
  }

  create(module: Module) {
    this.dataProvider.postModule(module).then(ref => {
      console.log(ref.key);
    });
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
