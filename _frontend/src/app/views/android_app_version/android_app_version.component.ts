import { Component, OnInit } from '@angular/core';

import { AndroidAppVersionService } from './android_app_version.service'

interface AppVersion {
  id: number | null,
  check: number | null,
  version: number | null
}
@Component({
  templateUrl: 'android_app_version.component.html'
})
export class AndroidAppVersionComponent implements OnInit {
  public app_version: AppVersion = { id: null, check: null, version: null };

  constructor(private _androidAppVersionService: AndroidAppVersionService) { }

  ngOnInit(): void {
    this._androidAppVersionService.getAndroidAppVersionData().then(res => {
      this.app_version = res[0]
    })
  }

  handleUpdateAppVersion() {
    this._androidAppVersionService.updateAndroidAppVersion(this.app_version).then(res => {
      // console.log('first', res);
      // console.log('second', this.app_version);
      if (res !== undefined) alert('Sucess!');
    })
  }
}
