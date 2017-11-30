import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  async register(user: User) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async login(user: User) {
    return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

}
