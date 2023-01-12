import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
	GridModule,
	FormModule,
	ModalModule,
	ButtonModule,
	ButtonGroupModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';


import { ThemeSwitchComponent } from './ThemeSwitch/theme_switch.component'
import { ToolbarComponent } from './toolbar/toolbar.component'

import { SongModalComponent } from './SongModal/song_modal.component'
import { ChapterAddModalComponent } from './ChapterModal/AddChapter/modal.component'
import { ChapterEditModalComponent } from './ChapterModal/EditChapter/modal.component'
import { PartAddModalComponent } from './ChapterModal/AddPart/modal.component'


const Modals = [SongModalComponent, ChapterAddModalComponent, ChapterEditModalComponent, PartAddModalComponent];

@NgModule({
	declarations: [
		ThemeSwitchComponent,
		ToolbarComponent,
		...Modals
	],
	exports: [
		ThemeSwitchComponent,
		ToolbarComponent,
		...Modals
	],
	imports: [
		FormsModule,

		CommonModule,
		IconModule,
		GridModule,
		FormModule,
		ModalModule,
		ButtonModule,
		ButtonGroupModule
	]
})
export class ComponentsModule {
}
