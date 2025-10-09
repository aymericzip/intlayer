import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import { organization } from 'better-auth/plugins';
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
  organizationId?: string;
  membersIds?: string[];
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

  if (Object.keys(filtersRequest).length > 0) {
    const { name, ids, organizationId, membersIds } = filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
    }

    if (name) {
      filters = { ...filters, name: new RegExp(name, 'i') };
    }

    if (organizationId) {
      filters = { ...filters, organizationId };
    }
    if (!roles.includes('admin')) {
      filters = { ...filters, organizationId: organization?.id };
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
