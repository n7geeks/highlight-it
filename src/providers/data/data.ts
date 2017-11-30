import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Module } from '../../models/module';

@Injectable()
export class DataProvider {

  constructor(
    private afDatabase: AngularFireDatabase
  ) {
    console.log('Hello DataProvider Provider');
  }

  postModule(module: Module) {
    this.afDatabase.list('modules').push(module);
  }

  getModules() {
    return this.afDatabase.list('modules').valueChanges();
  }

}
