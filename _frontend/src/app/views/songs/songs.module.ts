import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  GridModule,
  CardModule,
  ButtonModule,
  FormModule,
  ProgressModule,
  TableModule,
  PaginationModule
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';

import { SongsRoutingModule } from './songs-routing.module';
import { SongsComponent } from './songs.component';
import { SongsService } from './songs.service'

import { ComponentsModule } from '../../../components/components.module'


@NgModule({
  imports: [
    FormsModule,
    ComponentsModule,

    SongsRoutingModule,
    CardModule,
    IconModule,
    CommonModule,
    GridModule,
    FormModule,
    ButtonModule,
    TableModule,
    PaginationModule,
    ProgressModule
  ],
  providers: [
    IconSetService,
    SongsService
  ],
  declarations: [
    SongsComponent
  ]
})
export class SongsModule {
}
