import {
  deleteBlogComment,
  getAdminBlogComments,
  getApprovedBlogComments,
  submitBlogComment,
  updateBlogCommentStatus,
} from '@controllers/blogComment.controller';
import { blogCommentContract } from '@intlayer/backend-contract/blogComment';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const blogCommentRoute = blogCommentContract.prefix;

export const blogCommentRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, blogCommentContract, {
    submitBlogComment,
    getAdminBlogComments,
    getApprovedBlogComments,
    updateBlogCommentStatus,
    deleteBlogComment,
  });
};
