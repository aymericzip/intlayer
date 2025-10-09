import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import type { Organization } from '@/types/organization.types';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

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
  membersIds?: string[];
};
export type OrganizationFilters = RootFilterQuery<Organization>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getOrganizationFiltersAndPagination = (
  req: Request<FiltersAndPagination<OrganizationFiltersParams>>,
  res: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<OrganizationFiltersParams>(req);
  const { roles, user } = res.locals;

  let filters: OrganizationFilters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { name, ids, membersIds } = filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
    }

    // Non-admins can only see organizations they are members of
    if (!roles.includes('admin')) {
      filters = { ...filters, membersIds: { $in: [user?.id] } };
    }

    if (name) {
      filters = { ...filters, name: new RegExp(name, 'i') };
    }

    if (membersIds) {
      filters = {
        ...filters,
        membersIds: { $in: ensureArrayQueryFilter(membersIds) },
      };
    }
  }

  return { filters, ...pagination };
};
