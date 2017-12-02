import { EditNoteComponent } from './../../components/edit-note/edit-note';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from '../../providers/data/data';
import { AddNoteComponent } from '../../components/add-note/add-note';
import { Note } from '../../models/note';
import { NoteDetailsPage } from '../note-details/note-details';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  notes: Observable<any[]>;
  module: Module;
  
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private dataProvider: DataProvider,
      public modalCtrl: ModalController,
      public actionSheetCtrl: ActionSheetController
    ) {
      this.module = this.navParams.get('module');
      console.log(this.navParams.get('module'))
      this.notes = this.dataProvider
        .getNotes(this.module)
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
  
    addNoteModal() {
      let noteModal = this.modalCtrl.create(AddNoteComponent, {
        'mid': this.module.key
      });
      noteModal.present();
    }
  
    edit(note: Note) {
      let moduleModal = this.modalCtrl.create(EditNoteComponent, { 
        'note': note
      });
      moduleModal.present();
    }
  
    showOptions(note: Note) {
      console.log(note);
      this.actionSheetCtrl.create({
        title: `${note.generalIdea}`,
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              console.log("edit clicked");
              this.edit(note);
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

    goToDetails(note: Note) {
      this.navCtrl.push(NoteDetailsPage, {
        'note': note
      });
    }
}
