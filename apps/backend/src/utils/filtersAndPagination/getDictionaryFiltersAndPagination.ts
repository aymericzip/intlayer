import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
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
  tags?: string | string[];
  version?: string;
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
    const { key, keys, tags, ids, version } = filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
    }

    if (key) {
      filters = { ...filters, key: new RegExp(key, 'i') };
    }

    if (keys) {
      filters = { ...filters, key: { $in: ensureArrayQueryFilter(keys) } };
    }

    if (tags) {
      filters = { ...filters, tags: { $in: ensureArrayQueryFilter(tags) } };
    }

    if (version) {
      filters = { ...filters, content: { [version]: `$content.${version}` } };
    }
  }

  return { filters, ...pagination };
};
