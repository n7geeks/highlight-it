import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Module } from '../../models/module';
import { AuthProvider } from '../auth/auth';

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

}
