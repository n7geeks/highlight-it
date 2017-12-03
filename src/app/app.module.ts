import { ModulesPageModule } from './../pages/modules/modules.module';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { StorageProvider } from './../providers/storage/storage';
import { ToastProvider } from '../providers/toast/toast';
import { LoadingProvider } from '../providers/loading/loading';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomeModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    HomeModule,
    LoginPageModule,
    ModulesPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataProvider,
    StorageProvider,
    AngularFireDatabase,
    ToastProvider,
    LoadingProvider,
  ]
})
export class AppModule {}
