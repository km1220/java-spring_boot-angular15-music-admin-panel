import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AndroidAppVersionService {
	constructor(private _httpClient: HttpClient) { }

	getAndroidAppVersionData(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get('http://127.0.0.1:8080/api/app_update').subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}
	updateAndroidAppVersion(app_version: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const body = {
				id: parseInt(app_version.id),
				check: parseInt(app_version.check),
				version: parseInt(app_version.version)
			}
			this._httpClient.put('http://127.0.0.1:8080/api/app_update', body).subscribe((response: any) => {
				resolve(response);
			}, reject)
		});
	}
}