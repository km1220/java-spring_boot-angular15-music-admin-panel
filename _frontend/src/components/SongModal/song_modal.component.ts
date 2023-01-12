import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { T_SONG } from '../../app/define/data_type'

@Component({
	selector: 'song-modal',
	templateUrl: 'song_modal.component.html'
})

export class SongModalComponent implements OnInit {
	@Input() type: string = 'add';
	@Input() isVisible: boolean = false;
	@Input() data: T_SONG = { id: null, url: null, paid: null, songName: null, offlineDownload: null, upload_file: null };
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
			// let formData: FormData = new FormData();
			// formData.append('uploadFile', file, file.name);

			this.data.upload_file = file;
		}
	}
}