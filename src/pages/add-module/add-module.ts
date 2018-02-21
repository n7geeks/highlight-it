import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { ToastProvider } from '../../providers/toast/toast';
import { Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-module',
  templateUrl: 'add-module.html'
})
export class AddModulePage {
  valid: boolean;
  addModule;
  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private storageProvider: StorageProvider,
    private toastProvider: ToastProvider,
    private formBuilder: FormBuilder,
  ) {
    console.log('Hello AddModulePage');
    this.storageProvider.getUserId().then(uid => {
      this.module.uid = uid;
    }).catch(e => {
      console.error("can't recover uid ", e);
    });

    this.valid = true;
    this.addModule = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      hours: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });

    this.module.notesCount = 0;
  }

  create(module: Module) {
    if(!this.addModule.valid) {
      this.valid = false;
      return;
    }
      
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