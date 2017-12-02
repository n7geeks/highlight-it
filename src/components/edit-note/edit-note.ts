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
    // this.note.key = this.viewCtrl.getNavParams().get('key')
    // this.note.mid = this.viewCtrl.getNavParams().get('mid');
    // this.note.generalIdea = this.viewCtrl.getNavParams().get('generalIdea');
    // this.note.summary = this.viewCtrl.getNavParams().get('summary');
    // this.note.reminder = this.viewCtrl.getNavParams().get('reminder');
    console.log(this.note)
  }

  // edit(note: Note) {
  //   this.dataProvider.putNote(note).then(() => {
  //     this.dismiss();
  //   }, e => {
  //     console.log(e);
  //   });
  // }

  // delete(module: Note) {
  //   this.actionSheetCtrl.create({
  //     title: 'Are you sure ?',
  //     buttons: [
  //       {
  //         text: 'Delete',
  //         handler: () => {
  //           console.log("delete clicked");
  //           this.dataProvider.deleteNote(note).then(() => {
  //             this.dismiss();
  //           });
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   }).present();
  // }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
