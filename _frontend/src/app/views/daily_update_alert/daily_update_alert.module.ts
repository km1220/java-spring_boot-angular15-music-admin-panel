import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  GridModule,
  FormModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DailyUpdateAlertRoutingModule } from './daily_update_alert-routing.module';
import { DailyUpdateAlertComponent } from './daily_update_alert.component';
import { DailyUpdateAlertService } from './daily_update_alert.service'

import { ComponentsModule } from '../../../components/components.module'


@NgModule({
  imports: [
    FormsModule,
    ComponentsModule,

    DailyUpdateAlertRoutingModule,
    IconModule,
    CommonModule,
    GridModule,
    FormModule
  ],
  declarations: [DailyUpdateAlertComponent],
  providers: [DailyUpdateAlertService]
})
export class DailyUpdateAlertModule {
}
