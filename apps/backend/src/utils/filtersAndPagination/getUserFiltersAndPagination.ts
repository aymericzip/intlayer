import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';
import type { User } from '@/types/user.types';

export type UserFiltersParam = {
  ids?: string | string[];
  firstName?: string;
};
export type UserFilters = RootFilterQuery<User>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getUserFiltersAndPagination = (
  req: Request<FiltersAndPagination<UserFiltersParam>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<UserFiltersParam>(req);

  let filters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { firstName, ids } = filtersRequest;

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

      filters = { ...filters, id: { $in: idsArray } };
    }

    if (firstName) {
      filters = { ...filters, firstName: new RegExp(firstName, 'i') };
    }
  }

  return { filters, ...pagination };
};
