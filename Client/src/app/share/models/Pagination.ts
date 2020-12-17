import { IProduct } from './Product';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}

export class Pagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[] = [];
}

