import type { Request } from 'express';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type UserFilters = {
  ids?: string;
  firstName?: string;
};

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getUserFiltersAndPagination = (
  req: Request<FiltersAndPagination<UserFilters>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<UserFilters>(req);

  let filters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { firstName, ids } = filtersRequest;

    filters = {};

    if (ids) {
      const idsArray = ids.split(',');
      filters = { ...filters, id: { $in: idsArray } };
    }

    if (firstName) {
      filters = { ...filters, firstName: new RegExp(firstName, 'i') };
    }
  }

  return { filters, ...pagination };
};
