import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { T_PART, T_isShowModals } from '../../../define/data_type';
import { ChaptersService } from '../chapters.service'

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['detail.component.scss']
})
export class ChaptersDetailComponent implements OnInit {
  public url_parent_id: number | null = null;
  public api_result_parts_data: T_PART[] = [];

  public new_part: T_PART = { id: null, part: null, url: null, paid: null, offlineDownload: null, parentId: null, upload_file: null };

  public isModalVisible: T_isShowModals = { add: undefined, edit: undefined, addPart: false };
  public file_upload_progress = { percent: 0, inProgress: false };
  public searchText: string = "";
  public _searched_data: T_PART[] = [];
  public pagination: any = {
    display_rows: 5,
    total_pages: 0,
    current_page: 0
  };
  public _display_data: T_PART[] = [];


  constructor(private _route: ActivatedRoute, public iconSet: IconSetService, private _chaptersService: ChaptersService) {
    iconSet.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.url_parent_id = parseInt(this._route.snapshot.paramMap.get('id')!)!;
    this._chaptersService.getChapterDetails(this.url_parent_id).then(res => {
      this.api_result_parts_data = res; this.data_matching();
    });
  }

  toggleModal(which: string, id?: number | null, visibleChangeEvent?: any) {
    switch (which) {
      case "ADD_PART":
        if (this.url_parent_id != null) {
          this.new_part.parentId = this.url_parent_id;
        }
        if (visibleChangeEvent != undefined)
          this.isModalVisible.addPart = visibleChangeEvent;
        break;

      default:
        break;
    }
  }
  handleAddPartClick() {
    if (this.new_part.part == "" || this.new_part.part == null) {
      alert("Please insert the Part Title.");
      return
    }
    if (this.new_part.upload_file == null) {
      alert("Please select the Part Audio.");
      return
    }

    this._chaptersService.addChapterPart(this.new_part)
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
        //   return of(`${this.new_part.upload_file?.name} upload failed.`);
        // })
      )
      .subscribe((res: HttpResponse<any>) => {
        if (res !== undefined && res !== null && res.status === 200 && res.statusText === 'OK') {
          this.file_upload_progress = { inProgress: false, percent: 0 }
          this.toggleModal('ADD_PART', null, false);

          const res_data = JSON.parse(res.body)
          alert('Sucess!');
          this.api_result_parts_data.push(res_data); this.data_matching();
          this.new_part = { id: null, part: null, paid: null, parentId: null, url: null, offlineDownload: null, upload_file: null };
        }
      })
  }
  handleRemovePartClick(id: number) {
    this._chaptersService.deleteChapterPart(id).then(res => {
      if (res !== undefined) {
        let removeID = this.getIndexOfElem(res.removed_id)!;
        this.api_result_parts_data.splice(removeID, 1); this.data_matching();

        alert('Sucess!');
      }
    })
  }
  handleOfflineDownloadChange(event: any) {
    let data = {
      id: event.target.value,
      offline_download: event.target.checked ? 1 : 0
    };
    this._chaptersService.updateOfflineDownloadChapterPart(data).then(res => {
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
    for (let i = 0; i < this.api_result_parts_data.length; i++) {
      if (this.api_result_parts_data[i].id === data_id) return i;
    }
    return null;
  }


  data_matching() {
    this._searched_data = this.api_result_parts_data; // set search_data  =  total_api_fetched_data
    this.matchPagination();
  }
  matchPagination() {
    this._searched_data = this.api_result_parts_data.filter((each, index) =>
      each.part!.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.pagination.total_pages = Math.ceil(this._searched_data.length / this.pagination.display_rows);


    let startIndex = this.pagination.current_page * this.pagination.display_rows;
    let endIndex = startIndex + this.pagination.display_rows;
    this._display_data = this._searched_data.slice(startIndex, endIndex)
  }
}
