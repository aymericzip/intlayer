import type { ResponseWithSession } from '@middlewares/sessionAuth.middleware';
import { ensureArrayQueryFilter } from '@utils/ensureArrayQueryFilter';
import type { Request } from 'express';
import type { RootFilterQuery } from 'mongoose';
import type { Discussion } from '@/types/discussion.types';
import {
  type FiltersAndPagination,
  getFiltersAndPaginationFromBody,
} from './getFiltersAndPaginationFromBody';

export type DiscussionFiltersParams = {
  ids?: string | string[];
  userId?: string;
  userIds?: string[];
  discussionId?: string;
  search?: string;
  isArchived?: 'true' | 'false';
  sortBy?: string;
  sortOrder?: string;
  /**
   * For admin users only: if true, will not restrict to current user
   */
  fetchAll?: 'true' | 'false';
};
export type DiscussionFilters = RootFilterQuery<Discussion>;

/**
 * Extracts filters and pagination information for discussions.
 * Enforces that non-admin users can only see their own discussions.
 */
export const getDiscussionFiltersAndPagination = (
  req: Request<FiltersAndPagination<DiscussionFiltersParams>>,
  res: ResponseWithSession
) => {
  const { filters: filtersRequest, ...pagination } =
    getFiltersAndPaginationFromBody<DiscussionFiltersParams>(req);
  const { roles, user } = res.locals;

  let filters: DiscussionFilters = {};
  let sortOptions: Record<string, 1 | -1> = { updatedAt: -1 };

  const {
    ids,
    userId,
    userIds,
    discussionId,
    search,
    isArchived,
    sortBy,
    sortOrder,
    fetchAll,
  } = filtersRequest ?? {};

  if (ids) {
    filters = { ...filters, _id: { $in: ensureArrayQueryFilter(ids) } };
  }

  if (discussionId) {
    filters = { ...filters, discussionId };
  }

  if (typeof isArchived !== 'undefined') {
    filters = { ...filters, isArchived: isArchived === 'true' };
  }

  if (userId) {
    filters = { ...filters, userId: userId };
  }

  if (userIds) {
    filters = { ...filters, userId: { $in: ensureArrayQueryFilter(userIds) } };
  }

  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filters = {
      ...filters,
      $or: [
        { discussionId: searchRegex },
        { title: searchRegex },
        // search within messages content
        { 'messages.content': searchRegex },
      ],
    } as DiscussionFilters;
  }

  if (sortBy && sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
    sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  }

  // Enforce user scope for non-admins
  const isAdmin = roles.includes('admin');
  if (!isAdmin && user?.id) {
    filters = { ...filters, userId: user.id };
  } else if (isAdmin && fetchAll !== 'true' && user?.id) {
    // by default, even admins see their own discussions unless fetchAll=true
    filters = { ...filters, userId: user.id };
  }

  return { filters, sortOptions, ...pagination };
};
