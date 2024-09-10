import type { Request } from 'express';
import type { ObjectId } from 'mongoose';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type OrganizationFilters = {
  /**
   * Comma separated list of ids
   *
   * ```
   * GET /organizations?ids=5f8d9f1d8a1e4f0e8c0c,5f8d9f1d8a1e4f0e8d1
   * -> ids: "5f8d9f1d8a1e4f0e8c0c,5f8d9f1d8a1e4f0e8d1"
   * ```
   */
  ids?: string | string[];
  name?: string;
};

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getOrganizationFiltersAndPagination = (
  req: Request<FiltersAndPagination<OrganizationFilters>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<OrganizationFilters>(req);

  let filters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { name, ids } = filtersRequest;

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

    if (name) {
      filters = { ...filters, name: new RegExp(name, 'i') };
    }
  }

  return { filters, ...pagination };
};
