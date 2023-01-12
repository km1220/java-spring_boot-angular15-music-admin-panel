import { Component, OnInit } from '@angular/core';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset'

import { APIKeysService } from './api_keys.service'



interface APKKeys {
  id: number | null,
  publicKey: string | null,
  secretKey: string | null
}
@Component({
  templateUrl: 'api_keys.component.html'
})
export class APIKeysComponent implements OnInit {
  public api_result_keys: APKKeys[] = [{
    id: null,
    publicKey: null,
    secretKey: null
  }];
  constructor(public iconSet: IconSetService, private _apiKeysService: APIKeysService) {
    iconSet.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this._apiKeysService.getAPIKeysData().then(res => {
      this.api_result_keys[0] = res[0];
    })
  }

  handleUpdateKeys() {
    this._apiKeysService.updateAPIKeys(this.api_result_keys[0]).then(res => {
      console.log('first', res);
      if (res !== undefined) alert('Sucess!');
    }).catch(err => console.log('err', err))
  }
}
