import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'module',
  templateUrl: 'module.html'
})
export class ModuleComponent {

  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider
  ) {
    console.log('Hello ModuleComponent Component');
  }

  create(module: Module) {
    this.dataProvider.postModule(module);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
