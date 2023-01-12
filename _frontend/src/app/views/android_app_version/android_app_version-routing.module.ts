import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AndroidAppVersionComponent } from './android_app_version.component';

const routes: Routes = [
  {
    path: '',
    component: AndroidAppVersionComponent,
    data: {
      title: `Android App Version`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidAppVersionRoutingModule {
}
