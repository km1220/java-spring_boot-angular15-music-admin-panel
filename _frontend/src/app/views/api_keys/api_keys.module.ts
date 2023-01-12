import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  FormModule,
  GridModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';

import { APIKeysRoutingModule } from './api_keys-routing.module';
import { APIKeysComponent } from './api_keys.component';
import { APIKeysService } from './api_keys.service'

import { ComponentsModule } from '../../../components/components.module'


@NgModule({
  imports: [
    FormsModule,
    ComponentsModule,

    APIKeysRoutingModule,
    CommonModule,
    IconModule,
    GridModule,
    FormModule,
  ],
  providers: [
    IconSetService,
    APIKeysService
  ],
  declarations: [APIKeysComponent]
})
export class APIKeysModule {
}
