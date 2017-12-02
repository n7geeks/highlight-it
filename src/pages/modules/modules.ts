import { DataProvider } from './../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController} from 'ionic-angular';
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
    public modalCtrl: ModalController) {
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

  }
}
