import { Note } from './../../models/note';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data/data';
import { IonicPage } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html'
})
export class AddNotePage {

  note = {} as Note;

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private toastProvider: ToastProvider,
  ) {
    console.log('Hello AddNotePage');
    this.note.mid = this.viewCtrl.getNavParams().get('mid');
  }
  
  create(note: Note) {
    console.log(note);
    note.date = (new Date).getTime();
    this.dataProvider.postNote(note).then(() => {
      this.toastProvider.show('Note Created!');
    });
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
