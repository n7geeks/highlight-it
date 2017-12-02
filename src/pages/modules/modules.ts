import { DataProvider } from './../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController} from 'ionic-angular';
import { AddModuleComponent } from '../../components/add-module/add-module';
import { Module } from '../../models/module';
import { EditModuleComponent } from '../../components/edit-module/edit-module';

@IonicPage()
@Component({
  selector: 'page-modules',
  templateUrl: 'modules.html',
})
export class ModulesPage {

  modules: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private dataProvider: DataProvider,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.modules = this.dataProvider
      .getModules()
      .snapshotChanges()
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val()
          }))
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModulesPage');
  }

  addModuleModal() {
    let moduleModal = this.modalCtrl.create(AddModuleComponent, null);
    moduleModal.present();
  }

  edit(module: Module) {
    let moduleModal = this.modalCtrl.create(EditModuleComponent, module);
    moduleModal.present();
  }

  delete(module: Module) {
    this.actionSheetCtrl.create({
      title: 'Are you sure ?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.dataProvider.deleteModule(module).then((m) => {
              console.log(m)
            }, e => {
              console.error(e);
            });
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
}
