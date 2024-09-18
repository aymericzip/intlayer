import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';
import type { Organization } from '@/types/organization.types';

export type OrganizationFiltersParams = {
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
  members?: string[];
};
export type OrganizationFilters = RootFilterQuery<Organization>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getOrganizationFiltersAndPagination = (
  req: Request<FiltersAndPagination<OrganizationFiltersParams>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<OrganizationFiltersParams>(req);

  let filters: OrganizationFilters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { name, ids, members } = filtersRequest;

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

    if (name) {
      filters = { ...filters, name: new RegExp(name, 'i') };
    }

    if (members) {
      filters = { ...filters, members: { $in: members } };
    }
  }

  return { filters, ...pagination };
};
