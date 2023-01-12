import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  WidgetModule,
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
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


import { DashboardService } from './dashboard.service';
// import { UsersService } from '../users/users.service';
// import { SongsService } from '../songs/songs.service';
// import { ChaptersService } from '../chapters/chapters.service';
// import { SelfAffirmationService } from '../self_affirmation/self_affirmation.service';

// const Services = [UsersService, SongsService, ChaptersService, SelfAffirmationService];
@NgModule({
  imports: [
    DashboardRoutingModule,
    WidgetModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule
  ],
  declarations: [DashboardComponent],
  providers: [
    DashboardService,
    // ...Services,
  ]
})
export class DashboardModule {
}
