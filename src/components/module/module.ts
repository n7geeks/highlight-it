import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'module',
  templateUrl: 'module.html'
})
export class ModuleComponent {

  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private storageProvider: StorageProvider
  ) {
    console.log('Hello ModuleComponent Component');
    this.storageProvider.getUserId().then(uid => {
      this.module.uid = uid;
    }).catch(e => {
      console.error("can't recover uid ", e);
    });
  }

  create(module: Module) {
    this.dataProvider.postModule(module);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
