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
  search?: string;
  membersIds?: string[];
  sortBy?: string;
  sortOrder?: string;
  /**
   * For admin users, if true, will fetch all organizations without filtering by members
   */
  fetchAll?: 'true' | 'false';
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
  let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };

  if (Object.keys(filtersRequest).length > 0) {
    const { name, search, ids, membersIds, fetchAll, sortBy, sortOrder } =
      filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
    }

    // Non-admins can only see organizations they are members of
    if (!(roles.includes('admin') && fetchAll === 'true')) {
      filters = { ...filters, membersIds: { $in: [user?.id] } };
    }

    if (name) {
      filters = { ...filters, name: new RegExp(name, 'i') };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filters = { ...filters, $or: [{ name: searchRegex }] };
    }

    if (membersIds) {
      filters = {
        ...filters,
        membersIds: { $in: ensureArrayQueryFilter(membersIds) },
      };
    }

    if (sortBy && sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
      sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    }
  }

  return { filters, sortOptions, ...pagination };
};
