import { Subscription } from 'rxjs/Subscription';
import { Module } from './../../models/module';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DataProvider } from '../../providers/data/data';
import { Note } from '../../models/note';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  notes: Observable<any[]>;
  module: Module;
  sub: Subscription
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    private loadingProvider: LoadingProvider,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.module = this.navParams.get('module');
    console.log(this.navParams.get('module'))

    let loader = this.loadingProvider.show()
    loader.present()

    this.notes = this.dataProvider
      .getNotes(this.module)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }))
      })
    
    this.sub = this.notes.subscribe(() => {
      loader.dismiss()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }
  
  addNoteModal() {
    let noteModal = this.modalCtrl.create('AddNotePage', {
      'mid': this.module.key
    });
    noteModal.present();
  }

  edit(note: Note) {
    let noteModal = this.modalCtrl.create('EditNotePage', { 
      'note': note
    });
    noteModal.present();
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
    this.navCtrl.push('NoteDetailsPage', {
      'note': note
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
