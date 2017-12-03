import { Note } from './../../models/note';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { ViewController, ActionSheetController, IonicPage } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html'
})
export class EditNotePage {

  note = {} as Note

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private toastProvider: ToastProvider,
    public actionSheetCtrl: ActionSheetController,
  ) {
    console.log('Hello EditNotePage');
    this.note = this.viewCtrl.getNavParams().get('note');
    console.log(this.note)
  }

  edit(note: Note) {
    note.date = (new Date).getTime();
    this.dataProvider.putNote(note).then(() => {
      this.toastProvider.show('Note Saved!');
      this.dismiss();
    }, e => {
      console.log(e);
    });
  }

  delete(note: Note) {
    this.actionSheetCtrl.create({
      title: 'Are you sure ?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log("delete clicked");
            this.dataProvider.deleteNote(note).then(() => {
              this.toastProvider.show('Note Deleted!');
              this.dismiss();
            }, e => {
              console.log(e);
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
