import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { T_PART } from '../../../app/define/data_type'

@Component({
	selector: 'part-add-modal',
	templateUrl: './modal.component.html'
})

export class PartAddModalComponent implements OnInit {
	@Input() isVisible: boolean = false;
	@Input() data: T_PART = { id: null, part: null, url: null, paid: null, offlineDownload: null, parentId: null, upload_file: null };
	@Output() handleSubmit: EventEmitter<any> = new EventEmitter();
	@Output() readonly visibleChange = new EventEmitter<boolean>();


	constructor() { }

	ngOnInit() { }

	closeModal() {
		this.isVisible = false;
	}

	onFileChange(event: any) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			let file: File = fileList[0];
			this.data.upload_file = file;
		}
	}
}