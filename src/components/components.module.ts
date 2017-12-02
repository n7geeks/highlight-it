import { NgModule } from '@angular/core';
import { AddModuleComponent } from './add-module/add-module';
import { EditModuleComponent } from './edit-module/edit-module';
@NgModule({
	declarations: [AddModuleComponent,
    EditModuleComponent],
	imports: [],
	exports: [AddModuleComponent,
    EditModuleComponent]
})
export class ComponentsModule {}
