import { Note } from './../../models/note';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data/data';
import { IonicPage } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html'
})
export class AddNotePage {
  addNote;
  valid: boolean;
  note = {} as Note;

  constructor(
    public viewCtrl: ViewController,
    private dataProvider: DataProvider,
    private toastProvider: ToastProvider,
    private formBuilder: FormBuilder,
  ) {
    this.valid = true;
    this.addNote = formBuilder.group({
      generalIdea: ['', Validators.compose([Validators.required])],
      summary: ['', Validators.compose([Validators.required])],
      reminder: ['', Validators.compose([Validators.required])]
    });

    console.log('Hello AddNotePage');
    this.note.mid = this.viewCtrl.getNavParams().get('mid');
  }
  
  create(note: Note) {
    if(!this.addNote.valid) {
      this.valid = false;
      return;
    }

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
