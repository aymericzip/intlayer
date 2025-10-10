import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import type { Project } from '@/types/project.types';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type ProjectFiltersParams = {
  ids?: string | string[];
  name?: string;
  search?: string;
  organizationId?: string;
  membersIds?: string[];
  sortBy?: string;
  sortOrder?: string;
  /**
   * For admin users, if true, will fetch all projects without filtering by organization
   */
  fetchAll?: 'true' | 'false';
};
export type ProjectFilters = RootFilterQuery<Project>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getProjectFiltersAndPagination = (
  req: Request<FiltersAndPagination<ProjectFiltersParams>>,
  res: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<ProjectFiltersParams>(req);
  const { roles, organization } = res.locals;

  let filters: ProjectFilters = {};
  let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };

  if (Object.keys(filtersRequest).length > 0) {
    const {
      name,
      search,
      ids,
      organizationId,
      membersIds,
      sortBy,
      sortOrder,
      fetchAll,
    } = filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
    }

    if (name) {
      filters = { ...filters, name: new RegExp(name, 'i') };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filters = {
        ...filters,
        $or: [{ name: searchRegex }],
      };
    }

    if (organizationId) {
      filters = { ...filters, organizationId };
    }

    if (!(roles.includes('admin') && fetchAll === 'true')) {
      filters = { ...filters, organizationId: organization?.id };
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
