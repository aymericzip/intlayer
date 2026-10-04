import { z } from 'zod/mini';
import { objectIdSchema, paginationQueryShape } from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
} from './defineRoute';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
  type ResponseData,
  responseDataSchema,
} from './responseData';

/** Moderation status of a blog comment. */
export const blogCommentStatusSchema = z.enum([
  'pending',
  'approved',
  'rejected',
]);

/** Comment as shown publicly (author email stripped). */
export const blogCommentPublicSchema = z.looseObject({
  id: z.string(),
  blogSlug: z.string(),
  authorName: z.string(),
  content: z.string(),
  status: blogCommentStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

/** Comment as shown to admins. */
export const blogCommentSchema = z.looseObject({
  ...blogCommentPublicSchema.shape,
  authorEmail: z.string(),
});

const commentIdParamsSchema = z.object({ commentId: objectIdSchema });

/** REST contract of the `/api/blog-comments` routes. */
export const blogCommentContract = defineRouteGroup({
  prefix: '/api/blog-comments',
  tag: 'Blog comment',
  routes: {
    submitBlogComment: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Submit a comment on a blog post (moderated)',
      schemas: {
        body: z.object({
          blogSlug: z.string().check(z.minLength(1)),
          authorName: z.string().check(z.minLength(1)),
          authorEmail: z.string().check(z.minLength(1)),
          content: z.string().check(z.minLength(1)),
        }),
        response: { 201: responseDataSchema(blogCommentPublicSchema) },
      },
    }),
    getAdminBlogComments: defineRoute({
      method: 'GET',
      path: '/admin',
      summary: 'Admin only: list comments by status or post',
      schemas: {
        querystring: z.object({
          ...paginationQueryShape,
          blogSlug: z.optional(z.string()),
          status: z.optional(blogCommentStatusSchema),
        }),
        response: { 200: paginatedResponseSchema(blogCommentSchema) },
      },
    }),
    getApprovedBlogComments: defineRoute({
      method: 'GET',
      path: '/:blogSlug',
      summary: 'Approved comments of a blog post',
      schemas: {
        params: z.object({ blogSlug: z.string() }),
        response: {
          200: responseDataSchema(z.array(blogCommentPublicSchema)),
        },
      },
    }),
    updateBlogCommentStatus: defineRoute({
      method: 'PATCH',
      path: '/:commentId/status',
      summary: 'Admin only: approve or reject a comment',
      schemas: {
        params: commentIdParamsSchema,
        body: z.object({ status: blogCommentStatusSchema }),
        response: { 200: responseDataSchema(blogCommentSchema) },
      },
    }),
    deleteBlogComment: defineRoute({
      method: 'DELETE',
      path: '/:commentId',
      summary: 'Admin only: delete a comment',
      schemas: {
        params: commentIdParamsSchema,
        response: { 200: responseDataSchema(z.null()) },
      },
    }),
  },
});

/** Route definitions of the `/api/blog-comments` group, by name. */
export type BlogCommentRoutes = (typeof blogCommentContract)['routes'];

export type BlogCommentStatus = z.output<typeof blogCommentStatusSchema>;
export type BlogCommentPublicAPI = z.output<typeof blogCommentPublicSchema>;
export type BlogCommentAPI = z.output<typeof blogCommentSchema>;
export type SubmitBlogCommentBody = RouteBodyInput<
  BlogCommentRoutes['submitBlogComment']
>;
export type SubmitBlogCommentResult = ResponseData<BlogCommentPublicAPI>;
export type GetBlogCommentsResult = ResponseData<BlogCommentPublicAPI[]>;
export type GetAdminBlogCommentsResult = PaginatedResponse<BlogCommentAPI>;
export type UpdateBlogCommentStatusBody = RouteBodyInput<
  BlogCommentRoutes['updateBlogCommentStatus']
>;
export type UpdateBlogCommentStatusResult = ResponseData<BlogCommentAPI>;
