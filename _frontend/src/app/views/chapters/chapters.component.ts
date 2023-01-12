import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { T_CHAPTER, T_PART, T_isShowModals } from '../../define/data_type';
import { ChaptersService } from './chapters.service'

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';

@Component({
  templateUrl: 'chapters.component.html',
  styleUrls: ['chapters.component.scss']
})
export class ChaptersComponent implements OnInit {
  public api_result_chapters_data: T_CHAPTER[] = [];

  public new_chapter: T_CHAPTER = { id: null, name: null, paid: null, price: null, numSubParts: null };
  public edit_chapter: T_CHAPTER = { id: null, name: null, paid: null, price: null, numSubParts: null };
  public new_part: T_PART = { id: null, part: null, url: null, paid: null, offlineDownload: null, parentId: null, upload_file: null };

  public isModalVisible: T_isShowModals = { add: false, edit: false, addPart: false };
  public file_upload_progress = { percent: 0, inProgress: false };
  public searchText: string = "";
  public _searched_data: T_CHAPTER[] = [];
  public pagination: any = {
    display_rows: 5,
    total_pages: 0,
    current_page: 0
  };
  public _display_data: T_CHAPTER[] = [];



  constructor(public iconSet: IconSetService, private _chaptersService: ChaptersService) {
    iconSet.icons = { ...iconSubset };
  }


  ngOnInit(): void {
    this._chaptersService.getChaptersData().then(res_chapters => {
      if (res_chapters != null) this.api_result_chapters_data = res_chapters;
      this.api_result_chapters_data.map((each, i) => {
        this._chaptersService.getChapterDetails(each.id!).then(res_parts => {
          if (res_parts != null) each.numSubParts = res_parts.length;
        })
      })

      this.data_matching();
    });

  }

  toggleModal(which: string, id?: number | null, visibleChangeEvent?: any) {
    switch (which) {
      case "ADD_CHAPTER":
        if (visibleChangeEvent != undefined)
          this.isModalVisible.add = visibleChangeEvent;
        break;
      case "EDIT_CHAPTER":
        if (id != undefined || id != null) {
          this.edit_chapter = { ...this.api_result_chapters_data[this.getIndexOfElem(id)!] };
        }
        if (visibleChangeEvent != undefined)
          this.isModalVisible.edit = visibleChangeEvent;
        break;
      case "ADD_PART":
        if (id != undefined || id != null) {
          this.new_part.parentId = id;
        }
        if (visibleChangeEvent != undefined)
          this.isModalVisible.addPart = visibleChangeEvent;
        break;

      default:
        break;
    }
  }
  handleAddChapterClick() {
    if (this.new_chapter.name == "" || this.new_chapter.name == null) {
      alert("Please insert the Chapter Name.");
      return
    }

    this._chaptersService.addChapter(this.new_chapter.name!).then(res => {
      this.toggleModal('ADD_CHAPTER', null, false);

      alert('Sucess!');
      this.api_result_chapters_data.push(res); this.data_matching();
      this.new_chapter = { id: null, name: null, paid: null, price: null, numSubParts: null };
    })
  }
  handleEditChapterClick() {
    this._chaptersService.updateChapter(this.edit_chapter).then(res => {
      if (res !== undefined) {
        this.toggleModal('EDIT_CHAPTER', null, false);
        console.log(res)

        // get the selected/changed elem in 'array',    update it with requst.result data
        let changeID = this.getIndexOfElem(this.edit_chapter.id!)!;
        this.api_result_chapters_data[changeID] = { ...this.api_result_chapters_data[changeID], ...res }; this.data_matching();

        alert('Sucess!');
      }
    })

  }
  handleRemoveChapterClick(id: number) {
    this._chaptersService.deleteChapter(id).then(res => {
      if (res !== undefined) {
        let removeID = this.getIndexOfElem(res.removed_id)!;
        this.api_result_chapters_data.splice(removeID, 1); this.data_matching();

        alert('Sucess!');
      }
    })
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
          const parentID: number = this.getIndexOfElem(res_data.parentId!)!;
          if (this.api_result_chapters_data[parentID].numSubParts == null) this.api_result_chapters_data[parentID].numSubParts = 0;
          this.api_result_chapters_data[parentID].numSubParts!++; this.data_matching();
          this.new_part = { id: null, part: null, paid: null, parentId: null, url: null, offlineDownload: null, upload_file: null };
        }
      })
  }
  // handleRemovePartClick() { }

  
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
    for (let i = 0; i < this.api_result_chapters_data.length; i++) {
      if (this.api_result_chapters_data[i].id === data_id) return i;
    }
    return null;
  }


  data_matching() {
    this._searched_data = this.api_result_chapters_data; // set search_data  =  total_api_fetched_data
    this.matchPagination();
  }
  matchPagination() {
    this._searched_data = this.api_result_chapters_data.filter((each, index) =>
      each.name!.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.pagination.total_pages = Math.ceil(this._searched_data.length / this.pagination.display_rows);


    let startIndex = this.pagination.current_page * this.pagination.display_rows;
    let endIndex = startIndex + this.pagination.display_rows;
    this._display_data = this._searched_data.slice(startIndex, endIndex)
  }
}
