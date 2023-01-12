import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable()
export class SongsService {
	// public apiData: any;
	constructor(private _httpClient: HttpClient) { }

	getSongsData(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get('http://127.0.0.1:8080/api/song_all').subscribe((response: any) => {
				// this.apiData = response;
				// this.onBlogDetailChanged.next(this.apiData);
				resolve(response);
			}, reject);
		});
	}
	removeSongs(id: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient.delete(`http://127.0.0.1:8080/api/remove_song/${id}`).subscribe((response: any) => {
				resolve(response);
			}, reject)
		});
	}
	addSongs(data: any): Observable<any> {
		let formData = new FormData();
		formData.append("song_name", data.songName);
		formData.append("paid", data.paid);
		if (data.upload_file !== null)
			formData.append('file', data.upload_file, data.upload_file.name);

		return this._httpClient.post('http://127.0.0.1:8080/api/add_song', formData, {
			responseType: 'text',
			reportProgress: true,
			observe: 'events'
		})
	}
	updateSongs(data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const body = {
				id: parseInt(data.id),
				song_name: data.songName,
				paid: parseInt(data.paid)
			}
			this._httpClient.put('http://127.0.0.1:8080/api/update_song', body).subscribe((response: any) => {
				resolve(response);
			}, reject)
		});
	}
	updateOfflineDownloadSongs(data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const body = {
				id: parseInt(data.id),
				offline_download: parseInt(data.offline_download)
			}
			this._httpClient.put('http://127.0.0.1:8080/api/update_song_offline_download', body).subscribe((response: any) => {
				resolve(response);
			}, reject)
		});
	}
}