import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
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
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) {
  }

  login(user: User) {
    this.authProvider.login(user).then(data => {
      console.log("login successful : ", data);

      this.storageProvider.setUserId(data.uid).then(uid => {
        console.log("credentials saved : ", uid);
        this.authProvider.user.uid = uid;
        this.navCtrl.setRoot(HomePage);
      }).catch(e => {
        console.error("can't save credentials : ", e);
      });

    }).catch(e => {
      console.error("can't login : ", e);
      let toast = this.toastCtrl.create({
        message: "Invalid email or password",
        duration: 5000
      });
      toast.present();
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
