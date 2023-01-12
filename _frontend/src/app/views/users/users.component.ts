import { Component, OnInit } from '@angular/core';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';

import { UsersService } from './users.service'

interface User {
  id: number | null,
  email: string | null
}

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
})
export class UsersComponent implements OnInit {
  public api_result_users_data: User[] = [{
    id: null, email: null
  }];

  public searchText: string = "";
  public _searched_data: User[] = [];

  constructor(public iconSet: IconSetService, private _usersService: UsersService) {
    iconSet.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this._usersService.getUsersData().then(res => {
      this.api_result_users_data = res; this.matchSearchData2Total();
    })
  }

  handleSearch() {
    this._searched_data = this.api_result_users_data.filter((each, index) =>
      each.email!.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  matchSearchData2Total() {
    this._searched_data = this.api_result_users_data; // set search_data = total_api_fetched_data
  }
}
