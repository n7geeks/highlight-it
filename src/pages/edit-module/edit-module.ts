import { AuthProvider } from './../../providers/auth/auth';
import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController, ActionSheetController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-module',
  templateUrl: 'edit-module.html'
})
export class EditModulePage {

  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
  ) {
    console.log('Hello EditModulePage');
    this.module.uid = this.authProvider.user.uid;
    this.module.notesCount = this.viewCtrl.getNavParams().get('notesCount');
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

  delete(module: Module) {
    console.log(module);
    this.actionSheetCtrl.create({
      title: 'Are you sure ?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log("delete clicked");
            if(module.notesCount != 0) {
              console.log('cannot delete module with notes')
              // put toast
            } else {
              this.dataProvider.deleteModule(module).then(() => {
                console.log('module deleted')
                //put toast
              });
            }
            this.dismiss();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
