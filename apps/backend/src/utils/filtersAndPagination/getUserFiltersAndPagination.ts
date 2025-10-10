import type { GetUsersResult } from '@controllers/user.controller';
import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
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
export type UserFilters = RootFilterQuery<User>;

/**
 * Extracts filters and pagination information from the request body.
 * @param req - Express request object.
 * @returns Object containing filters, page, pageSize, and getNumberOfPages functions.
 */
export const getUserFiltersAndPagination = (
  req: Request<FiltersAndPagination<UserFiltersParam>>,
  res: ResponseWithSession<GetUsersResult>
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<UserFiltersParam>(req);
  const { roles, organization } = res.locals;

  let filters = {};
  let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };

  if (Object.keys(filtersRequest).length > 0) {
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
    } = filtersRequest;

    filters = {};

    if (ids) {
      filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };

      if (!(roles.includes('admin') && fetchAll === 'true')) {
        const secureMembersIds: string[] =
          ensureArrayQueryFilter(ids)?.filter((id) =>
            organization?.membersIds?.map(String).includes(id)
          ) ?? [];

        filters = {
          ...filters,
          _id: {
            $in: secureMembersIds,
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
  }

  return { filters, sortOptions, ...pagination };
};
