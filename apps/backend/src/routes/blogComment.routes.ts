import {
  deleteBlogComment,
  getAdminBlogComments,
  getApprovedBlogComments,
  submitBlogComment,
  updateBlogCommentStatus,
} from '@controllers/blogComment.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const blogCommentRoute = '/api/blog-comments';

const baseURL = () => `${process.env.BACKEND_URL}${blogCommentRoute}`;

export const getBlogCommentRoutes = () =>
  ({
    submitBlogComment: {
      urlModel: '/',
      url: `${baseURL()}/`,
      method: 'POST',
    },
    getApprovedBlogComments: {
      urlModel: '/:blogSlug',
      url: (blogSlug: string) => `${baseURL()}/${blogSlug}`,
      method: 'GET',
    },
    getAdminBlogComments: {
      urlModel: '/admin',
      url: `${baseURL()}/admin`,
      method: 'GET',
    },
    updateBlogCommentStatus: {
      urlModel: '/:commentId/status',
      url: (commentId: string) => `${baseURL()}/${commentId}/status`,
      method: 'PATCH',
    },
    deleteBlogComment: {
      urlModel: '/:commentId',
      url: (commentId: string) => `${baseURL()}/${commentId}`,
      method: 'DELETE',
    },
  }) satisfies Routes;

export const blogCommentRouter = async (fastify: FastifyInstance) => {
  fastify.post(
    getBlogCommentRoutes().submitBlogComment.urlModel,
    submitBlogComment
  );
  fastify.get(
    getBlogCommentRoutes().getAdminBlogComments.urlModel,
    getAdminBlogComments
  );
  fastify.get(
    getBlogCommentRoutes().getApprovedBlogComments.urlModel,
    getApprovedBlogComments
  );
  fastify.patch(
    getBlogCommentRoutes().updateBlogCommentStatus.urlModel,
    updateBlogCommentStatus
  );
  fastify.delete(
    getBlogCommentRoutes().deleteBlogComment.urlModel,
    deleteBlogComment
  );
};
