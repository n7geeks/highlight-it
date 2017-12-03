import { DataProvider } from './../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController} from 'ionic-angular';
import { Module } from '../../models/module';

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
    let moduleModal = this.modalCtrl.create('AddModulePage');
    moduleModal.present();
  }

  edit(module: Module) {
    let moduleModal = this.modalCtrl.create('EditModulePage', module);
    moduleModal.present();
  }

  showOptions(module: Module) {
    console.log(module);
    this.actionSheetCtrl.create({
      title: `${module.name}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log("edit clicked");
            this.edit(module);
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

  goToNotes(module: Module) {
    this.navCtrl.push('NotesPage', {
      'module': module
    });
  }
}
