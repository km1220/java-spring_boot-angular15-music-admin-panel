import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DailyUpdateAlertComponent } from './daily_update_alert.component';

const routes: Routes = [
  {
    path: '',
    component: DailyUpdateAlertComponent,
    data: {
      title: `Android App Version`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyUpdateAlertRoutingModule {
}
