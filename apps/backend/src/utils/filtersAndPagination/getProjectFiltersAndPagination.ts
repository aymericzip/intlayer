import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';
import type { Project } from '@/types/project.types';

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
  req: Request<FiltersAndPagination<ProjectFiltersParams>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<ProjectFiltersParams>(req);

  let filters: ProjectFilters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const { name, ids, organizationId, membersIds } = filtersRequest;

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

    if (organizationId) {
      filters = { ...filters, organizationId };
    }

    if (membersIds) {
      filters = { ...filters, membersIds: { $in: membersIds } };
    }
  }

  return { filters, ...pagination };
};
