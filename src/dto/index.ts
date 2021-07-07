export class PagingFiltersDto {
  page: number;
  perPage: number;
}

export interface IMetadata {
  count?: number;
}
export interface IResponse<T> {
  data: T;
  meta?: IMetadata;
}
