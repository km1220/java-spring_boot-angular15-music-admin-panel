
export enum BooleanType { TRUE = 1, FALSE = 0 }

export interface T_CHAPTER {
  id: number | null,
  name: string | null,
  paid: BooleanType | null,
  price: number | null,

  numSubParts: number | null,
}
export interface T_PART {
  id: number | null;
  part: string | null;
  url: string | null;
  paid: BooleanType | null;
  offlineDownload: BooleanType | null;

  parentId: number | null;
  // upload_file: FormData | null;
  upload_file: File | null;
}
export interface T_SONG {
  id: number | null;
  songName: string | null;
  url: string | null;
  paid: BooleanType | null;
  offlineDownload: BooleanType | null;
  // upload_file: FormData | null;
  upload_file: File | null;
}

export type T_isShowModals = {
  add: boolean | undefined,
  edit: boolean | undefined,
  addPart: boolean | undefined
}





// export enum Theme {
//   Light = 'light', Dark = 'dark'
// }
