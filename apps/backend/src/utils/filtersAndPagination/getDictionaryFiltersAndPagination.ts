import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
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
};
export type DictionaryFilters = RootFilterQuery<Dictionary>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getDictionaryFiltersAndPagination = (
  req: Request<FiltersAndPagination<DictionaryFiltersParams>>,
  res: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<DictionaryFiltersParams>(req);
  const { roles, organization } = res.locals;

  let filters: DictionaryFilters = {};

  if (Object.keys(filtersRequest).length > 0) {
    const {
      key,
      keys,
      tags,
      ids,
      projectId,
      projectIds,
      organizationId,
      organizationIds,
      userId,
      userIds,
      creatorId,
      creatorIds,
      title,
      description,
      version,
    } = filtersRequest;

    filters = {};

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

    if (organizationId) {
      filters = { ...filters, organizationIds: organizationId };
    }

    if (organizationIds) {
      filters = {
        ...filters,
        organizationIds: { $in: ensureArrayQueryFilter(organizationIds) },
      };
    }
    if (!roles.includes('admin')) {
      filters = { ...filters, organizationId: organization?.id };
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

    if (keys) {
      filters = { ...filters, key: { $in: ensureArrayQueryFilter(keys) } };
    }

    if (tags) {
      filters = { ...filters, tags: { $in: ensureArrayQueryFilter(tags) } };
    }

    if (version) {
      filters = { ...filters, content: { [version]: `$content.${version}` } };
    }
  }

  return { filters, ...pagination };
};
