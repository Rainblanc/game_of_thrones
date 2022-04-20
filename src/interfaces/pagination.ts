export interface Pagination<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPage: number;
}

export interface PaginationPayload {
  page: number;
  pageSize: number;
  q?: string;
}
