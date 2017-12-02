import { NgModule } from '@angular/core';
import { AddModuleComponent } from './add-module/add-module';
import { EditModuleComponent } from './edit-module/edit-module';
import { AddNoteComponent } from './add-note/add-note';
@NgModule({
	declarations: [AddModuleComponent,
    EditModuleComponent,
    AddNoteComponent],
	imports: [],
	exports: [AddModuleComponent,
    EditModuleComponent,
    AddNoteComponent]
})
export class ComponentsModule {}
