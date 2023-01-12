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

import { ChaptersRoutingModule } from './chapters-routing.module';
import { ChaptersComponent } from './chapters.component';
import { ChaptersDetailComponent } from './ChapterDetail/detail.component';
import { ChaptersService } from './chapters.service'

import { ComponentsModule } from '../../../components/components.module'


@NgModule({
  imports: [
    FormsModule,
    ComponentsModule,

    ChaptersRoutingModule,
    IconModule,
    CommonModule,
    GridModule,
    CardModule,
    ProgressModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    TableModule,
    PaginationModule
  ],
  providers: [
    IconSetService,
    ChaptersService
  ],
  declarations: [
    ChaptersComponent,
    ChaptersDetailComponent
  ]
})
export class ChaptersModule {
}
