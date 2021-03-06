import { PagingFiltersDto } from '../dto';
import { FindManyOptions } from 'typeorm';

export const transformPagingFiltersToOrm = (
  filters: PagingFiltersDto,
): FindManyOptions => {
  const { page, perPage } = filters;

  return {
    take: perPage,
    skip: (page - 1) * perPage,
  };
};
