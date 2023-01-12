import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { T_CHAPTER } from '../../../app/define/data_type'

@Component({
	selector: 'chapter-add-modal',
	templateUrl: './modal.component.html'
})

export class ChapterAddModalComponent implements OnInit {
	@Input() isVisible: boolean = false;
	@Input() data: T_CHAPTER = { id: null, name: null, paid: null, price: null, numSubParts: null };

	@Output() handleSubmit: EventEmitter<any> = new EventEmitter();
	@Output() readonly visibleChange = new EventEmitter<boolean>();


	constructor() { }

	ngOnInit() { }

	closeModal() {
		this.isVisible = false;
	}
}