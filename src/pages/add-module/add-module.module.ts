import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddModulePage } from './add-module';

@NgModule({
  declarations: [
    AddModulePage,
  ],
  imports: [
    IonicPageModule.forChild(AddModulePage),
  ],
})
export class AddModulePageModule {}
