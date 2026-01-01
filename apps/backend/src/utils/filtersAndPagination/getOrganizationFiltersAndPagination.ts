import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { FastifyRequest } from 'fastify';
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
 * @param req - Express or Fastify request object.
 * @param res - Express or Fastify response object (optional, for Express compatibility).
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getOrganizationFiltersAndPagination = (
  req:
    | Request<FiltersAndPagination<OrganizationFiltersParams>>
    | FastifyRequest<{
        Querystring: FiltersAndPagination<OrganizationFiltersParams>;
      }>,
  res?: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<OrganizationFiltersParams>(req as any);
  // Support both Express (res.locals) and Fastify (req.locals)
  const locals = (res as any)?.locals || (req as FastifyRequest).locals || {};
  const { roles, user } = locals;

  let filters: OrganizationFilters = {};
  let sortOptions: Record<string, 1 | -1> = { updatedAt: -1 };

  const { name, search, ids, membersIds, fetchAll, sortBy, sortOrder } =
    filtersRequest ?? {};

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

  return { filters, sortOptions, ...pagination };
};
