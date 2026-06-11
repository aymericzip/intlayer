import { BlogCommentModel } from '@schemas/blogComment.schema';
import { GenericError } from '@utils/errors';
import type {
  BlogComment,
  BlogCommentDocument,
  BlogCommentStatus,
} from '@/types/blogComment.types';

export type CreateBlogCommentData = Pick<
  BlogComment,
  'blogSlug' | 'authorName' | 'authorEmail' | 'content'
>;

export type FindBlogCommentsFilters = {
  blogSlug?: string;
  status?: BlogCommentStatus;
  page?: number;
  pageSize?: number;
};

/**
 * Creates a new blog comment in pending state.
 */
export const createBlogComment = async (
  data: CreateBlogCommentData
): Promise<BlogCommentDocument> => {
  const comment = await BlogCommentModel.create({ ...data, status: 'pending' });

  return comment as unknown as BlogCommentDocument;
};

/**
 * Returns approved comments for a given blog slug (public endpoint).
 */
export const getApprovedCommentsBySlug = async (
  blogSlug: string
): Promise<BlogCommentDocument[]> => {
  const comments = await BlogCommentModel.find({ blogSlug, status: 'approved' })
    .sort({ createdAt: 1 })
    .lean();

  return comments as unknown as BlogCommentDocument[];
};

/**
 * Returns paginated comments with optional status/slug filter (admin endpoint).
 */
export const findBlogComments = async (
  filters: FindBlogCommentsFilters
): Promise<{
  data: BlogCommentDocument[];
  totalItems: number;
  totalPages: number;
}> => {
  const { blogSlug, status, page = 1, pageSize = 20 } = filters;

  const query: Record<string, unknown> = {};
  if (blogSlug) query.blogSlug = blogSlug;
  if (status) query.status = status;

  const totalItems = await BlogCommentModel.countDocuments(query);
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const data = await BlogCommentModel.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean();

  return {
    data: data as unknown as BlogCommentDocument[],
    totalItems,
    totalPages,
  };
};

/**
 * Updates the moderation status of a single comment.
 */
export const updateBlogCommentStatus = async (
  commentId: string,
  status: BlogCommentStatus
): Promise<BlogCommentDocument> => {
  const comment = await BlogCommentModel.findByIdAndUpdate(
    commentId,
    { status },
    { new: true }
  ).lean();

  if (!comment) {
    throw new GenericError('BLOG_COMMENT_NOT_FOUND', { commentId });
  }

  return comment as unknown as BlogCommentDocument;
};

/**
 * Hard-deletes a single comment.
 */
export const deleteBlogComment = async (commentId: string): Promise<void> => {
  const result = await BlogCommentModel.findByIdAndDelete(commentId);

  if (!result) {
    throw new GenericError('BLOG_COMMENT_NOT_FOUND', { commentId });
  }
};
