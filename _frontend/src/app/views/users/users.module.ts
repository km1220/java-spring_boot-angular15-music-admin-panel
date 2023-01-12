import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service'

import { ComponentsModule } from '../../../components/components.module'

@NgModule({
  imports: [
    FormsModule,
    ComponentsModule,

    UsersRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule
  ],
  declarations: [
    UsersComponent,
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule {
}
