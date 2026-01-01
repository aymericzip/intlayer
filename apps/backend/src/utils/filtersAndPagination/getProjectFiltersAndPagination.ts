import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { FastifyRequest } from 'fastify';
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
 * @param req - Express or Fastify request object.
 * @param res - Express or Fastify response object (optional, for Express compatibility).
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getProjectFiltersAndPagination = (
  req:
    | Request<FiltersAndPagination<ProjectFiltersParams>>
    | FastifyRequest<{
        Querystring: FiltersAndPagination<ProjectFiltersParams>;
      }>,
  res?: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<ProjectFiltersParams>(req as any);
  // Support both Express (res.locals) and Fastify (req.locals)
  const locals = (res as any)?.locals || (req as FastifyRequest).locals || {};
  const { roles, organization } = locals;

  let filters: ProjectFilters = {};
  let sortOptions: Record<string, 1 | -1> = { updatedAt: -1 };

  const {
    name,
    search,
    ids,
    organizationId,
    membersIds,
    sortBy,
    sortOrder,
    fetchAll,
  } = filtersRequest ?? {};

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

  if (membersIds) {
    filters = {
      ...filters,
      membersIds: { $in: ensureArrayQueryFilter(membersIds) },
    };
  }

  if (sortBy && sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
    sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  }

  if (!(roles.includes('admin') && fetchAll === 'true')) {
    filters = { ...filters, organizationId: organization?.id };
  }

  return { filters, sortOptions, ...pagination };
};
