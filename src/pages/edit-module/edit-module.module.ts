import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditModulePage } from './edit-module';

@NgModule({
  declarations: [
    EditModulePage,
  ],
  imports: [
    IonicPageModule.forChild(EditModulePage),
  ],
})
export class EditModulePageModule {}
