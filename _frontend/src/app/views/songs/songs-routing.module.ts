import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongsComponent } from './songs.component';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
    data: {
      title: `Songs`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule {
}
