import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotesPage } from './notes';
import { EditNotePageModule } from './../edit-note/edit-note.module';
import { AddNotePageModule } from './../add-note/add-note.module';

@NgModule({
  declarations: [
    NotesPage,
  ],
  imports: [
    IonicPageModule.forChild(NotesPage),
    AddNotePageModule,
    EditNotePageModule,
  ],
})
export class NotesPageModule {}
