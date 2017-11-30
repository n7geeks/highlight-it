import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Module } from '../../models/module';
import { StorageProvider } from '../storage/storage';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@Injectable()
export class DataProvider {

  constructor(
    private afDatabase: AngularFireDatabase,
    private storageProvider: StorageProvider,
    private afs: AngularFirestore,
    private authProvider: AuthProvider,
  ) {
    console.log('Hello DataProvider Provider');
  }

  postModule(module: Module) {
    this.afDatabase.list('modules').push(module);
  }

  getModules() {
    return this.afDatabase.list('modules', ref => {
      return ref.orderByChild('uid').equalTo(this.authProvider.user.uid)
    }).valueChanges();
  }

}
