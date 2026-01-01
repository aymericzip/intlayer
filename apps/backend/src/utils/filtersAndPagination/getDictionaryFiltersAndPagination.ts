import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { FastifyRequest } from 'fastify';
import type { RootFilterQuery } from 'mongoose';
import type { Dictionary } from '@/types/dictionary.types';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type DictionaryFiltersParams = {
  ids?: string | string[];
  projectId?: string;
  projectIds?: string[];
  organizationId?: string;
  organizationIds?: string[];
  userId?: string;
  userIds?: string[];
  creatorId?: string;
  creatorIds?: string[];
  title?: string;
  description?: string;
  key?: string;
  keys?: string[];
  tags?: string | string[];
  version?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  /**
   * For admin users, if true, will fetch all users without filtering by organization
   */
  fetchAll?: 'true' | 'false';
};
export type DictionaryFilters = RootFilterQuery<Dictionary>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express or Fastify request object.
 * @param res - Express or Fastify response object (optional, for Express compatibility).
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getDictionaryFiltersAndPagination = (
  req:
    | Request<FiltersAndPagination<DictionaryFiltersParams>>
    | FastifyRequest<{
        Querystring: FiltersAndPagination<DictionaryFiltersParams>;
      }>,
  res?: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<DictionaryFiltersParams>(req as any);
  // Support both Express (res.locals) and Fastify (req.locals)
  const locals = (res as any)?.locals || (req as FastifyRequest).locals || {};
  const { roles, project } = locals;

  let filters: DictionaryFilters = {};
  let sortOptions: Record<string, 1 | -1> = { updatedAt: -1 };

  const {
    key,
    search,
    keys,
    tags,
    ids,
    projectId,
    projectIds,
    userId,
    userIds,
    creatorId,
    creatorIds,
    title,
    description,
    version,
    sortBy,
    sortOrder,
    fetchAll,
  } = filtersRequest ?? {};

  if (ids) {
    filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
  }

  if (projectId) {
    filters = { ...filters, projectIds: projectId };
  }

  if (projectIds) {
    filters = {
      ...filters,
      projectIds: { $in: ensureArrayQueryFilter(projectIds) },
    };
  }

  if (!(roles.includes('admin') && fetchAll === 'true')) {
    filters = { ...filters, projectIds: { $in: project?.id } };
  }

  if (userId) {
    filters = { ...filters, creatorId: userId };
  }

  if (userIds) {
    filters = {
      ...filters,
      creatorId: { $in: ensureArrayQueryFilter(userIds) },
    };
  }

  if (creatorId) {
    filters = { ...filters, creatorId: creatorId };
  }

  if (creatorIds) {
    filters = {
      ...filters,
      creatorId: { $in: ensureArrayQueryFilter(creatorIds) },
    };
  }

  if (title) {
    filters = { ...filters, title: new RegExp(title, 'i') };
  }

  if (description) {
    filters = { ...filters, description: new RegExp(description, 'i') };
  }

  if (key) {
    filters = { ...filters, key: new RegExp(key, 'i') };
  }

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filters = {
      ...filters,
      $or: [
        { key: searchRegex },
        { title: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } },
      ],
    };
  }

  if (keys) {
    filters = { ...filters, key: { $in: ensureArrayQueryFilter(keys) } };
  }

  if (tags) {
    filters = { ...filters, tags: { $in: ensureArrayQueryFilter(tags) } };
  }

  if (version) {
    filters = { ...filters, content: { [version]: `$content.${version}` } };
  }

  if (sortBy && sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
    sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  }

  return { filters, sortOptions, ...pagination };
};
