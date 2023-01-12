import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { APIKeysComponent } from './api_keys.component';

const routes: Routes = [
  {
    path: '',
    component: APIKeysComponent,
    data: {
      title: `API Keys`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class APIKeysRoutingModule {
}
