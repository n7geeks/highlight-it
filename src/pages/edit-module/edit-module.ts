import { AuthProvider } from './../../providers/auth/auth';
import { DataProvider } from './../../providers/data/data';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { ViewController, ActionSheetController, IonicPage } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-module',
  templateUrl: 'edit-module.html'
})
export class EditModulePage {
  valid: boolean;
  editModule;
  module = {} as Module

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    private toastProvider: ToastProvider,
    public actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder,
  ) {
    this.valid = true;
    this.editModule = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      hours: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });

    console.log('Hello EditModulePage');
    this.module.uid = this.authProvider.user.uid;
    this.module.notesCount = this.viewCtrl.getNavParams().get('notesCount');
    this.module.name = this.viewCtrl.getNavParams().get('name');
    this.module.key = this.viewCtrl.getNavParams().get('key');
    this.module.hours = this.viewCtrl.getNavParams().get('hours');
  }

  edit(module: Module) {
    if(!this.editModule.valid) {
      this.valid = false;
      return;
    }
    
    this.dataProvider.putModule(module).then(() => {
      this.toastProvider.show(`${module.name} saved!`);
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
              this.toastProvider.show('Cannot delete a module that contains notes');
            } else {
              this.dataProvider.deleteModule(module).then(() => {
                console.log('module deleted')
                this.toastProvider.show(`${module.name} deleted!`);
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
