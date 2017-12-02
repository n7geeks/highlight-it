import { AuthProvider } from './../../providers/auth/auth';
import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'edit-module',
  templateUrl: 'edit-module.html'
})
export class EditModuleComponent {

  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
  ) {
    console.log('Hello EditModuleComponent Component');
    this.module.uid = this.authProvider.user.uid;
    this.module.name = this.viewCtrl.getNavParams().get('name');
    this.module.key = this.viewCtrl.getNavParams().get('key');
    this.module.hours = this.viewCtrl.getNavParams().get('hours');
  }

  edit(module: Module) {
    this.dataProvider.putModule(module).then(() => {
      this.dismiss();
    }, e => {
      console.log(e);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
