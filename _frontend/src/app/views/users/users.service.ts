import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
	public apiData: any;
	constructor(private _httpClient: HttpClient) { }

	getUsersData(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get('http://127.0.0.1:8080/api/users').subscribe((response: any) => {
				this.apiData = response;
				// this.onBlogDetailChanged.next(this.apiData);
				resolve(this.apiData);
			}, reject);
		});
	}
}