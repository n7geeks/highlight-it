import { NgModule } from '@angular/core';
import { AddModuleComponent } from './add-module/add-module';
import { EditModuleComponent } from './edit-module/edit-module';
import { AddNoteComponent } from './add-note/add-note';
import { EditNoteComponent } from './edit-note/edit-note';
@NgModule({
	declarations: [AddModuleComponent,
    EditModuleComponent,
    AddNoteComponent,
    EditNoteComponent],
	imports: [],
	exports: [AddModuleComponent,
    EditModuleComponent,
    AddNoteComponent,
    EditNoteComponent]
})
export class ComponentsModule {}
