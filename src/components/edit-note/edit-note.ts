import { Note } from './../../models/note';
import { AuthProvider } from './../../providers/auth/auth';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { ViewController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'edit-note',
  templateUrl: 'edit-note.html'
})
export class EditNoteComponent {

  note = {} as Note

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private authProvider: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
  ) {
    console.log('Hello EditNoteComponent Component');
    this.note = this.viewCtrl.getNavParams().get('note');
    console.log(this.note)
  }

  edit(note: Note) {
    note.date = (new Date).getTime();
    this.dataProvider.putNote(note).then(() => {
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
