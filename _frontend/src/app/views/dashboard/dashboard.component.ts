import { Component, OnInit } from '@angular/core';

import { DashboardService } from './dashboard.service'
// import { UsersService } from '../users/users.service';
// import { SongsService } from '../songs/songs.service';
// import { ChaptersService } from '../chapters/chapters.service';
// import { SelfAffirmationService } from '../self_affirmation/self_affirmation.service';


import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dashboard_card_data = {
    premium_users: 0,
    songs: 0,
    chapters: 0,
    self_affirmation: 0
  }
  constructor(
    private chartsData: DashboardChartsData,
    private _dashboardService: DashboardService,
    // private _usersService: UsersService,
    // private _songsService: SongsService,
    // private _chaptersService: ChaptersService,
    // private _selfAffirmationService: SelfAffirmationService,
  ) { }

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();

    this._dashboardService.getAnalyzedData().then(res => {
      if (res != null) this.dashboard_card_data = res[0];
    })

    // this._usersService.getUsersData().then(res => this.dashboard_card_data.premium_users = res.length)
    // this._songsService.getSongsData().then(res => this.dashboard_card_data.songs = res.length)
    // this._chaptersService.getChaptersData().then(res => this.dashboard_card_data.chapters = res.length)
    // this._selfAffirmationService.getSelfAffirmationData().then(res => this.dashboard_card_data.self_affirmation = res.length)
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
