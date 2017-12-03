import { ToastProvider } from './../../providers/toast/toast';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    private authProvider: AuthProvider,
    private storageProvider: StorageProvider,
    private toastProvider: ToastProvider,
    public navCtrl: NavController,
  ) {
  }

  login(user: User) {
    this.authProvider.login(user).then(data => {
      console.log("login successful : ", data);

      this.storageProvider.setUserId(data.uid).then(uid => {
        this.authProvider.user.uid = uid;
        console.log(this.authProvider.user.uid);
        this.navCtrl.setRoot('HomePage');
      }).catch(e => {
        console.error(e);
      });

    }).catch(e => {
      console.error("can't login : ", e);
      this.toastProvider.show('Invalid email or password', 5000);
    });
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}
