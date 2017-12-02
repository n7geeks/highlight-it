import { ModulesPageModule } from './../pages/modules/modules.module';
import { StorageProvider } from './../providers/storage/storage';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { AddModuleComponent } from '../components/add-module/add-module';
import { EditModuleComponent } from '../components/edit-module/edit-module';
import { AddNoteComponent } from '../components/add-note/add-note';
import { EditNoteComponent } from '../components/edit-note/edit-note';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotesPageModule } from '../pages/notes/notes.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { NoteDetailsPageModule } from '../pages/note-details/note-details.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddModuleComponent,
    EditModuleComponent,
    AddNoteComponent,
    EditNoteComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    NotesPageModule,
    ModulesPageModule,
    LoginPageModule,
    RegisterPageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NoteDetailsPageModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddModuleComponent,
    EditModuleComponent,
    AddNoteComponent,
    EditNoteComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataProvider,
    StorageProvider,
    AngularFireDatabase,
  ]
})
export class AppModule {}
