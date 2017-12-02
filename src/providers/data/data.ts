import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Module } from '../../models/module';
import { AuthProvider } from '../auth/auth';
import { Note } from '../../models/note';

@Injectable()
export class DataProvider {

  constructor(
    private afDatabase: AngularFireDatabase,
    private authProvider: AuthProvider,
  ) {
    console.log('Hello DataProvider Provider');
  }

  postModule(module: Module) {
    return this.afDatabase.list('modules').push(module);
  }

  getModules() {
    return this.afDatabase.list('modules', ref => {
      return ref.orderByChild('uid').equalTo(this.authProvider.user.uid)
    })
  }

  putModule(module: Module) {
    console.log(module);
    return this.afDatabase.list('modules').update(module.key, {
      'name': module.name,
      'hours': module.hours,
      'uid': module.uid
    });
  }

  deleteModule(module: Module) {
    return this.afDatabase.list('modules').remove(module.key);
  }

  /* ------------- Notes -------------*/

  getNotes(module: Module) {
    return this.afDatabase.list('notes', ref => {
      return ref.orderByChild('mid').equalTo(module.key);
    })
  }

  postNote(note: Note) {
    return this.afDatabase.list('notes').push(note);
  }

  putNote(note: Note) {
    console.log(note);
    return this.afDatabase.list('notes').update(note.key, {
      'mid': note.mid,
      'generalIdea': note.generalIdea,
      'date': note.date,
      'summary': note.summary,
      'reminder': note.reminder
    });
  }

  deleteNote(note: Note) {
    return this.afDatabase.list('notes').remove(note.key);
  }

}
