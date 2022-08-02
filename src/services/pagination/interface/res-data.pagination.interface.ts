/* eslint-disable prettier/prettier */
export interface ResDataCommon {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  option: ResDataCommonOption;
  datas: any[];
}
export interface ResDataCommonOption {
  sortFide: string;
  sortType: string;
  search: string;
}
