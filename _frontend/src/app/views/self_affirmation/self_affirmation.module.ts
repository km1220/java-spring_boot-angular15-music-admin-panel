import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  TableModule,
  PaginationModule,
  ModalModule,
  ProgressModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { SelfAffirmationRoutingModule } from './self_affirmation-routing.module';
import { SelfAffirmationComponent } from './self_affirmation.component';
import { SelfAffirmationService } from './self_affirmation.service'

import { ComponentsModule } from '../../../components/components.module'

@NgModule({
  imports: [
    FormsModule,
    ComponentsModule,

    SelfAffirmationRoutingModule,
    CardModule,
    IconModule,
    CommonModule,
    GridModule,
    FormModule,
    ButtonModule,
    TableModule,
    PaginationModule,
    // ModalModule,
    ProgressModule
  ],
  declarations: [SelfAffirmationComponent],
  providers: [SelfAffirmationService]
})
export class SelfAffirmationModule {
}
