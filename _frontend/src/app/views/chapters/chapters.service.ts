import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable()
export class ChaptersService {
	// public apiData: any;
	constructor(private _httpClient: HttpClient) { }

	getChaptersData(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get('http://127.0.0.1:8080/api/get_all_chapters').subscribe((response: any) => {
				// this.apiData = response;
				// this.onBlogDetailChanged.next(this.apiData);
				resolve(response);
			}, reject);
		});
	}
	addChapter(chapter_name: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const body = { name: chapter_name }
			this._httpClient.post('http://127.0.0.1:8080/api/chapter', body).subscribe((response: any) => {
				resolve(response);
			}, reject)
		})
	}
	updateChapter(data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const body = { name: data.name, paid: parseInt(data.paid), price: parseFloat(data.price) };
			this._httpClient.put(`http://127.0.0.1:8080/api/chapter/${data.id}`, body).subscribe((response: any) => {
				resolve(response);
			}, reject)
		})
	}
	deleteChapter(id: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient.delete(`http://127.0.0.1:8080/api/chapter/${id}`).subscribe((response: any) => {
				resolve(response);
			}, reject)
		})
	}

	getChapterDetails(chapter_id: number): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get(`http://127.0.0.1:8080/api/get_all_chapter_details/${chapter_id}`).subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}
	addChapterPart(data: any): Observable<any> {
		let formData = new FormData();
		formData.append("part", String(data.part));
		formData.append("paid", data.paid);
		formData.append("parent_id", data.parentId);
		if (data.upload_file !== null)
			formData.append('file', data.upload_file, data.upload_file.name);

		return this._httpClient.post('http://127.0.0.1:8080/api/add_chapter_part', formData, {
			responseType: 'text',
			reportProgress: true,
			observe: 'events'
		})
	}
	deleteChapterPart(id: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient.delete(`http://127.0.0.1:8080/api/chapter_detail/${id}`).subscribe((response: any) => {
				resolve(response);
			}, reject)
		})
	}
	
	updateOfflineDownloadChapterPart(data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const body = {
				id: parseInt(data.id),
				offline_download: parseInt(data.offline_download)
			}
			this._httpClient.put('http://127.0.0.1:8080/api/update_chapter_detail_offline_download', body).subscribe((response: any) => {
				resolve(response);
			}, reject)
		});
	}
}