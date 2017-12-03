import { Note } from './../../models/note';
import { StorageProvider } from './../../providers/storage/storage';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data/data';
import { IonicPage } from 'ionic-angular';

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
    private storageProvider: StorageProvider,
  ) {
    console.log('Hello AddNotePage');
    this.note.mid = this.viewCtrl.getNavParams().get('mid');
  }
  
  create(note: Note) {
    console.log(note);
    note.date = (new Date).getTime();
    this.dataProvider.postNote(note);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
