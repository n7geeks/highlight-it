import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User

  constructor(
    private authProvider: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }
  
  register(user: User) {
    this.authProvider.register(user).then(data => {
      console.log("registration successful ", data)
    }).catch(e => {
      console.error("error register : ", e)
    })

    this.navCtrl.pop();
  }

}
