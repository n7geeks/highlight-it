import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    private authProvider: AuthProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  login(user: User) {
    this.authProvider.login(user).then(data => {
      console.log("login successful : ", data);
    }).catch(e => {
      console.error("can't login : ", e);
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
