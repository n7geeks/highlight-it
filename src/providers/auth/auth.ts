import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {
  public loggedIn = false;
  public user = {} as User;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  async register(user: User) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async login(user: User) {
    return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async logout() {
    return await this.afAuth.auth.signOut();
  }

  isSignedIn() {
    /*this.afAuth.auth.onAuthStateChanged(user => {
      if(user)
        this.loggedIn = true;
    });*/
    let user = this.afAuth.auth.currentUser;
    if(user)
      this.loggedIn = true;
  }

}
