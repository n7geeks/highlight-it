import { LoadingProvider } from './../../providers/loading/loading';
import { ToastProvider } from './../../providers/toast/toast';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { StorageProvider } from '../../providers/storage/storage';
import { Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  repass: string;
  matchPass: boolean;
  valid: boolean;
  registerForm;
  user = {} as User

  constructor(
    private authProvider: AuthProvider,
    private storageProvider: StorageProvider,
    private toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) {
    this.valid = true;
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      repass: ['', Validators.compose([Validators.required])],
    });
  }
  
  register(user: User) {
    if(!this.registerForm.valid || !this.passMatch()) {
      this.valid = false;
      return;
    }

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

  passMatch() {
    if(!this.registerForm.getError('required', ['password'])) {
      if(this.user.password === this.repass)
        return true;
      else 
        return false;
    } else
      return true;
  }

}
