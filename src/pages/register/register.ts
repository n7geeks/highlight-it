import { LoadingProvider } from './../../providers/loading/loading';
import { ToastProvider } from './../../providers/toast/toast';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User

  constructor(
    private authProvider: AuthProvider,
    private storageProvider: StorageProvider,
    private toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider,
    public navCtrl: NavController,
  ) {
  }
  
  register(user: User) {
    let loader = this.loadingProvider.show()
    loader.present()
    this.authProvider.register(user).then(data => {
      console.log("registration successful ", data)

      this.storageProvider.setUserId(data.uid).then(uid => {
        this.authProvider.user.uid = uid;
        console.log(this.authProvider.user.uid);
        this.navCtrl.setRoot(HomePage);
        loader.dismiss()
      }).catch(e => {
        loader.dismiss()
        console.error(e);
      });

    }).catch(e => {
      loader.dismiss()
      console.error("error register : ", e)
      this.toastProvider.show(e.message, 5000);
    })
  }

}
