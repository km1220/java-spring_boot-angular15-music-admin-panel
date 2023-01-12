import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  GridModule,
  FormModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { AndroidAppVersionRoutingModule } from './android_app_version-routing.module';
import { AndroidAppVersionComponent } from './android_app_version.component';
import { AndroidAppVersionService } from './android_app_version.service'

import { ComponentsModule } from '../../../components/components.module'


@NgModule({
  imports: [
    FormsModule,
    ComponentsModule,

    AndroidAppVersionRoutingModule,
    IconModule,
    CommonModule,
    GridModule,
    FormModule
  ],
  declarations: [AndroidAppVersionComponent],
  providers: [AndroidAppVersionService]
})
export class AndroidAppVersionModule {
}
