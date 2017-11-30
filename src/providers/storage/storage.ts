import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(
    private storage: Storage
  ) {
    console.log('Hello StorageProvider Provider');
  }

  setUserId(uid) {
    return this.storage.set('uid', uid);
  }

  getUserId() {
    return this.storage.get('uid');
  }

}
