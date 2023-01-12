import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { T_SONG, T_isShowModals } from '../../define/data_type';

import { SelfAffirmationService } from './self_affirmation.service'
// import { of } from 'rxjs';

@Component({
  templateUrl: 'self_affirmation.component.html',
  styleUrls: ['self_affirmation.component.scss']
})
export class SelfAffirmationComponent implements OnInit {
  public api_result_data: T_SONG[] = [];

  public new_song: T_SONG = { id: null, url: null, paid: 1, songName: null, offlineDownload: null, upload_file: null };
  public edit_song: T_SONG = { id: null, url: null, paid: 1, songName: null, offlineDownload: null, upload_file: null };

  public isModalVisible: T_isShowModals = { add: false, edit: false, addPart: undefined };
  public file_upload_progress = { percent: 0, inProgress: false };
  public searchText: string = "";
  public _searched_data: T_SONG[] = [];
  public pagination: any = {
    display_rows: 5,
    total_pages: 0,
    current_page: 0
  };
  public _display_data: T_SONG[] = [];

  

  constructor(private _selfAffirmationService: SelfAffirmationService) { }

  ngOnInit(): void {
    this._selfAffirmationService.getSelfAffirmationData().then(res => {
      this.api_result_data = res;
      this.data_matching();
    })
  }


  toggleModal(which: string, id?: number | null, visibleChangeEvent?: any) {
    if (which === "" || which === null || which === undefined) return;
    // // this.isModalVisible[which as keyof IsModalVisible] = !this.isModalVisible[which as keyof IsModalVisible];
    // this.isModalVisible[which as keyof IsModalVisible] = (visibleChangeEvent != undefined) ? visibleChangeEvent : true;

    switch (which) {
      case "ADD":
        if (visibleChangeEvent != undefined)
          this.isModalVisible.add = visibleChangeEvent;
        break;
      case "EDIT":
        if (id != undefined) {
          this.edit_song = { ...this.api_result_data[this.getIndexOfElem(id)!] };
          // const selected_song = this.api_result_data.find((e: any) => e.id == id)
          // this.edit_song = { ...this.edit_song, ...selected_song };
        }
        if (visibleChangeEvent != undefined)
          this.isModalVisible.edit = visibleChangeEvent;
        break;

      default:
        break;
    }
    // console.log('$visibleChangeEvent', visibleChangeEvent, 'this.isModalVisible[which as keyof IsModalVisible]', this.isModalVisible[which as keyof IsModalVisible])
  }

  handleAddClick() {
    // this.new_song.id = Math.max(...this.api_result_data.map((e: any) => e.id)) + 1;
    // this.new_song.offlineDownload = 1;
    if (this.new_song.songName == "" || this.new_song.songName == null) {
      alert("Please insert the Song Title.");
      return
    }
    if (this.new_song.upload_file == null) {
      alert("Please select the Song.");
      return
    }

    this._selfAffirmationService.addSelfAffirmation(this.new_song)
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file_upload_progress = { inProgress: true, percent: Math.round(event.loaded * 100 / event.total!) }
              break;
            case HttpEventType.Response:
              return event;
          }
          return;
        }),
        // catchError((error: HttpErrorResponse) => {
        //   console.log('catch error', error)
        //   return of(`${this.new_song.upload_file?.name} upload failed.`);
        // })
      )
      .subscribe((res: HttpResponse<any>) => {
        if (res !== undefined && res !== null && res.status === 200 && res.statusText === 'OK') {
          this.file_upload_progress = { inProgress: false, percent: 0 }
          this.toggleModal('ADD', null, false);

          const res_data = JSON.parse(res.body)
          // console.log(res_data)
          alert('Sucess!');
          this.api_result_data.push(res_data); this.data_matching();
          this.new_song = { id: null, url: null, paid: 1, songName: null, offlineDownload: null, upload_file: null };
        }
      })
  }
  handleEditClick() {
    this._selfAffirmationService.updateSelfAffirmation(this.edit_song).then(res => {
      if (res !== undefined) {
        this.toggleModal('EDIT', null, false);

        // get the selected/changed elem in 'array',    update it with requst.result data
        let changeID = this.getIndexOfElem(this.edit_song.id!)
        if (changeID !== null) { this.api_result_data[changeID] = res; this.data_matching(); }

        alert('Sucess!');
      }
    })
  }
  handleRemoveClick(id: number) {
    this._selfAffirmationService.removeSelfAffirmation(id).then(res => {
      // console.log('=> res ==========', res)

      if (res !== undefined) {
        let removeID = this.getIndexOfElem(res.removed_id);
        if (removeID !== null) { this.api_result_data.splice(removeID, 1); this.data_matching(); }

        alert('Sucess!');
      }
    })
  }

  handleOfflineDownloadChange(event: any) {
    let data = {
      id: event.target.value,
      offline_download: event.target.checked ? 1 : 0
    };
    this._selfAffirmationService.updateOfflineDownloadSelfAffirmation(data).then(res => {
      console.log('res : ', res);
    });
  }

  onSearch() {
    this.matchPagination();
  }
  onChangePagination(i: number | null, prev_next?: string) {
    // change current pagination
    if (prev_next === 'prev') {
      if (this.pagination.current_page > 0) this.pagination.current_page--;
    }
    else if (prev_next === 'next') {
      if (this.pagination.current_page < this.pagination.total_pages - 1) this.pagination.current_page++;
    }
    else {
      this.pagination.current_page = i;
    }

    this.matchPagination();
  }




  getIndexOfElem(data_id: number): number | null {
    for (let i = 0; i < this.api_result_data.length; i++) {
      if (this.api_result_data[i].id === data_id) return i;
    }
    return null;
  }



  data_matching() {
    this._searched_data = this.api_result_data; // set search_data  =  total_api_fetched_data
    this.matchPagination();
  }
  matchPagination() {
    this._searched_data = this.api_result_data.filter((each, index) =>
      each.songName!.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.pagination.total_pages = Math.ceil(this._searched_data.length / this.pagination.display_rows);


    let startIndex = this.pagination.current_page * this.pagination.display_rows;
    let endIndex = startIndex + this.pagination.display_rows;
    this._display_data = this._searched_data.slice(startIndex, endIndex)
  }
}
