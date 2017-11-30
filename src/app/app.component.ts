import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ModulesPage } from '../pages/modules/modules';
import { StorageProvider } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private storageProvider: StorageProvider,
    private toastCtrl: ToastController
  ) {
    this.setRootPage();
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Modules', component: ModulesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  setRootPage() {
    if(this.authProvider.loggedIn) {
      console.log("welcome back");
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }
  }

  logout() {
    this.authProvider.logout().then(() => {
      console.log("logged out : ");
      this.nav.setRoot(LoginPage);
      let toast = this.toastCtrl.create({
        message: "hope I see you again",
        duration: 5000      
      });
      toast.present();
    }).catch(e => {
      console.error("Error : ", e);
    });
  }
}
