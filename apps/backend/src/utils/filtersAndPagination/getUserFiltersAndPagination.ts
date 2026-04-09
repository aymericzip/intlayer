import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { FastifyRequest } from 'fastify';
import type { QueryFilter } from 'mongoose';
import type { User } from '@/types/user.types';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type UserFiltersParam = {
  ids?: string | string[];
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: string;
  role?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  /**
   * For admin users, if true, will fetch all users without filtering by organization
   */
  fetchAll?: 'true' | 'false';
};
export type UserFilters = QueryFilter<User>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Fastify request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getUserFiltersAndPagination = (
  req: FastifyRequest<{ Querystring: FiltersAndPagination<UserFiltersParam> }>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<UserFiltersParam>(req);
  const roles = req.session?.roles;
  const organization = req.session?.organization;

  let filters = {};
  let sortOptions: Record<string, 1 | -1> = { updatedAt: -1 };

  const {
    firstName,
    lastName,
    email,
    emailVerified,
    role,
    search,
    sortBy,
    sortOrder,
    ids,
    fetchAll,
  } = filtersRequest ?? {};

  if (ids) {
    filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };

    if (!(roles?.includes('admin') && fetchAll === 'true')) {
      const requestedIds = ensureArrayQueryFilter(ids) ?? [];

      // Build the set of IDs the requester is allowed to fetch:
      //   1. Always allow fetching themselves.
      //   2. Allow fetching any member of their active organization.
      const currentUserId = req.session?.user?.id
        ? String(req.session.user.id)
        : null;
      const orgMemberIds: string[] =
        organization?.membersIds?.map(String) ?? [];

      const allowedIds = requestedIds.filter(
        (id) =>
          (currentUserId && id === currentUserId) ||
          orgMemberIds.includes(id)
      );

      filters = {
        ...filters,
        _id: {
          $in: allowedIds,
        },
      };
    }
  }

  if (firstName) {
    filters = { ...filters, firstName: new RegExp(firstName, 'i') };
  }

  if (lastName) {
    filters = { ...filters, lastName: new RegExp(lastName, 'i') };
  }

  if (email) {
    filters = { ...filters, email: new RegExp(email, 'i') };
  }

  if (emailVerified !== undefined) {
    const isVerified = emailVerified === 'true';
    filters = { ...filters, emailVerified: isVerified };
  }

  if (role) {
    filters = { ...filters, role };
  }

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filters = {
      ...filters,
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { name: searchRegex },
      ],
    };
  }

  if (sortBy && sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
    sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  }

  return { filters, sortOptions, ...pagination };
};
