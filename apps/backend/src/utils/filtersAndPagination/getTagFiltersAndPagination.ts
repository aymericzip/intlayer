import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { FastifyRequest } from 'fastify';
import type { RootFilterQuery } from 'mongoose';
import type { Tag } from '@/types/tag.types';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type TagFiltersParams = {
  ids?: string | string[];
  keys?: string | string[];
  name?: string;
  search?: string;
  organizationId?: string;
  /**
   * For admin users, if true, will fetch all tags without filtering by organization
   */
  fetchAll?: 'true' | 'false';
};
export type TagFilters = RootFilterQuery<Tag>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express or Fastify request object.
 * @param res - Express or Fastify response object (optional, for Express compatibility).
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getTagFiltersAndPagination = (
  req:
    | Request<FiltersAndPagination<TagFiltersParams>>
    | FastifyRequest<{ Querystring: FiltersAndPagination<TagFiltersParams> }>,
  res?: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<TagFiltersParams>(req as any);
  // Support both Express (res.locals) and Fastify (req.locals)
  const locals = (res as any)?.locals || (req as FastifyRequest).locals || {};
  const { roles, organization } = locals;

  let filters: TagFilters = {};
  const sortOptions: Record<string, 1 | -1> = { updatedAt: -1 };

  const { name, search, ids, keys, organizationId, fetchAll } =
    filtersRequest ?? {};

  if (ids) {
    filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
  }

  if (keys) {
    filters = { ...filters, key: { $in: ensureArrayQueryFilter(keys) } };
  }

  if (name) {
    filters = { ...filters, name: new RegExp(name, 'i') };
  }

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filters = {
      ...filters,
      $or: [
        { name: searchRegex },
        { key: searchRegex },
        { description: searchRegex },
        { instructions: searchRegex },
      ],
    };
  }

  if (organizationId) {
    filters = { ...filters, organizationId };
  }

  if (!(roles.includes('admin') && fetchAll === 'true')) {
    filters = { ...filters, organizationId: organization?.id };
  }

  return { filters, sortOptions, ...pagination };
};
