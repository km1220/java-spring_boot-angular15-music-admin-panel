import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DailyUpdateAlertService {
	constructor(private _httpClient: HttpClient) { }

	getDailyUpdateAlertData(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get('http://127.0.0.1:8080/api/app_update').subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}
	updateDailyUpdateAlert(app_version: any): Promise<any> {
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