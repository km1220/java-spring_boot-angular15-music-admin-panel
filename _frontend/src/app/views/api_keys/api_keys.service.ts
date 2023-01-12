import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class APIKeysService {
	constructor(private _httpClient: HttpClient) { }

	getAPIKeysData(): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this._httpClient.get('http://127.0.0.1:8080/api/razorpay').subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}
	updateAPIKeys(api_key: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const body = {
				publicKey: api_key.publicKey,
				secretKey: api_key.secretKey
			}
			this._httpClient.put(`http://127.0.0.1:8080/api/razorpay/${api_key.id}`, body).subscribe((response: any) => {
				resolve(response);
			}, reject)
		});
	}
}