import { Note } from './../../models/note';
import { StorageProvider } from './../../providers/storage/storage';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'add-note',
  templateUrl: 'add-note.html'
})
export class AddNoteComponent {

  note = {} as Note;

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private storageProvider: StorageProvider,
  ) {
    console.log('Hello AddNoteComponent Component');
    this.note.mid = this.viewCtrl.getNavParams().get('mid');
  }
  
  create(note: Note) {
    console.log(note);
    note.date = (new Date).getTime();
    this.dataProvider.postNote(note).then(ref => {
      console.log(ref.key);
    });
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
