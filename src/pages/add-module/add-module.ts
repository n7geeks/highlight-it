import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-add-module',
  templateUrl: 'add-module.html'
})
export class AddModulePage {

  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private storageProvider: StorageProvider,
    private toastProvider: ToastProvider,
  ) {
    console.log('Hello AddModulePage');
    this.storageProvider.getUserId().then(uid => {
      this.module.uid = uid;
    }).catch(e => {
      console.error("can't recover uid ", e);
    });
    this.module.notesCount = 0;
  }

  create(module: Module) {
    this.dataProvider.postModule(module).then(ref => {
      this.toastProvider.show(`${module.name} created!`);
      console.log(ref.key);
    });
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}