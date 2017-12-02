import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Note } from '../../models/note';

@IonicPage()
@Component({
  selector: 'page-note-details',
  templateUrl: 'note-details.html',
})
export class NoteDetailsPage {

  note: Note;

  constructor(public navParams: NavParams) {
    this.note = this.navParams.get('note');
  }

}
