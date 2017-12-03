import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModulesPage } from './modules';
import { EditModulePageModule } from './../edit-module/edit-module.module';
import { AddModulePageModule } from '../add-module/add-module.module';

@NgModule({
  declarations: [
    ModulesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModulesPage),
    AddModulePageModule,
    EditModulePageModule,
  ],
})
export class ModulesPageModule {}
