import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModulesPage } from './modules';

@NgModule({
  declarations: [
    ModulesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModulesPage),
  ],
})
export class ModulesPageModule {}
