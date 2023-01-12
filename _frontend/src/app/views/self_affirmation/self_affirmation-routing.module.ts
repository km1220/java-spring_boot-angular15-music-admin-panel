import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelfAffirmationComponent } from './self_affirmation.component';

const routes: Routes = [
  {
    path: '',
    component: SelfAffirmationComponent,
    data: {
      title: `SelfAffirmation`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfAffirmationRoutingModule {
}
