import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';
import type { Tag } from '@/types/tag.types';

export type TagFiltersParams = {
  ids?: string | string[];
  keys?: string | string[];
  name?: string;
  organizationId?: string;
};
export type TagFilters = RootFilterQuery<Tag>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getTagFiltersAndPagination = (
  req: Request<FiltersAndPagination<TagFiltersParams>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<TagFiltersParams>(req);

  let filters: TagFilters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { name, ids, keys, organizationId } = filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
    }

    if (keys) {
      filters = { ...filters, key: { $in: ensureArrayQueryFilter(keys) } };
    }

    if (name) {
      filters = { ...filters, name: new RegExp(name, 'i') };
    }

    if (organizationId) {
      filters = { ...filters, organizationId };
    }
  }

  return { filters, ...pagination };
};
