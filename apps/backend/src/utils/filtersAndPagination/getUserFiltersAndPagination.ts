import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import type { User } from '@/types/user.types';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type UserFiltersParam = {
  ids?: string | string[];
  organizationId?: string | string[];
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: string;
  role?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
};
export type UserFilters = RootFilterQuery<User>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getUserFiltersAndPagination = (
  req: Request<FiltersAndPagination<UserFiltersParam>>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<UserFiltersParam>(req);

  let filters = {};
  let sortOptions = {};

  if (Object.keys(filtersRequest).length > 0) {
    const {
      firstName,
      lastName,
      email,
      emailVerified,
      role,
      organizationId,
      search,
      sortBy,
      sortOrder,
      ids,
    } = filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
    }

    if (organizationId) {
      filters = {
        ...filters,
        organizationId: { $in: ensureArrayQueryFilter(organizationId) },
      };
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
  }

  return { filters, sortOptions, ...pagination };
};
