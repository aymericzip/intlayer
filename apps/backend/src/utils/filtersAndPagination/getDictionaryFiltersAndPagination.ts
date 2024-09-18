import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';
import type { Dictionary } from '@/types/dictionary.types';

export type DictionaryFiltersParams = {
  ids?: string | string[];
  key?: string;
  keys?: string[];
};
export type DictionaryFilters = RootFilterQuery<Dictionary>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getDictionaryFiltersAndPagination = (
  req: Request<FiltersAndPagination<DictionaryFiltersParams>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<DictionaryFiltersParams>(req);

  let filters: DictionaryFilters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { key, keys, ids } = filtersRequest;

    filters = {};

    if (ids) {
      let idsArray: string[];

      if (typeof ids === 'string') {
        idsArray = ids.split(',');
      } else if (Array.isArray(ids)) {
        idsArray = ids;
      } else {
        idsArray = [ids];
      }

      filters = { ...filters, _id: { $in: idsArray } };
    }

    if (key) {
      filters = { ...filters, key: new RegExp(key, 'i') };
    }

    if (keys) {
      filters = { ...filters, key: { $in: keys } };
    }
  }

  return { filters, ...pagination };
};
