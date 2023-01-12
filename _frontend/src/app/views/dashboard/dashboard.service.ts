import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
	constructor(private _httpClient: HttpClient) { }

	getAnalyzedData(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get('http://127.0.0.1:8080/api/get_dashboard_data').subscribe((res: any) => {
				resolve(res);
			}, reject);
		});
	}
}