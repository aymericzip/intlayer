import { z } from 'zod/mini';
import {
  dateTimeSchema,
  objectIdSchema,
  paginationQueryShape,
  repeatableQueryValueSchema,
} from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
  type RouteQuerystring,
} from './defineRoute';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
  type ResponseData,
  responseDataSchema,
} from './responseData';

/** Number sent in a query string (parsed by the handler). */
const numericQueryValueSchema = z.union([z.string(), z.number()]);

export const reviewerStatusSchema = z.enum(['pending', 'active', 'suspended']);

export const reviewerCategorySchema = z.enum([
  'copywriter',
  'translator',
  'proofreader',
  'technical_writer',
  'marketing',
  'seo',
]);

/** Reviewer categories, usable as values. */
export const REVIEWER_CATEGORIES = reviewerCategorySchema.options;

export const missionStatusSchema = z.enum([
  'pending',
  'accepted',
  'in_progress',
  'reviewer_review',
  'client_review',
  'completed',
  'canceled',
]);

const languagePairSchema = z.object({ from: z.string(), to: z.string() });

const socialLinksSchema = z.object({
  github: z.optional(z.string()),
  linkedin: z.optional(z.string()),
  portfolio: z.optional(z.string()),
});

/** Public reviewer profile (marketplace). */
export const reviewerProfileSchema = z.looseObject({
  id: z.string(),
  userId: z.string(),
  /** Public name and avatar of the linked user. */
  name: z.optional(z.string()),
  avatar: z.optional(z.string()),
  bio: z.optional(z.string()),
  mainPicture: z.optional(z.string()),
  coverPicture: z.optional(z.string()),
  languagePairs: z.array(languagePairSchema),
  categories: z.array(reviewerCategorySchema),
  /** In cents (5000 = $50/hour). */
  pricePerHour: z.number(),
  status: reviewerStatusSchema,
  totalMissions: z.number(),
  /** 0 to 5. */
  averageRating: z.number(),
  reviewCount: z.number(),
  socialLinks: z.optional(socialLinksSchema),
  isHidden: z.optional(z.boolean()),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

/** Booked review/translation work. */
export const translationMissionSchema = z.looseObject({
  id: z.string(),
  reviewerId: z.string(),
  clientUserId: z.string(),
  projectId: z.optional(z.string()),
  dictionaryIds: z.array(z.string()),
  sourceLocale: z.optional(z.string()),
  targetLocales: z.array(z.string()),
  wordCount: z.number(),
  estimatedHours: z.number(),
  /** Snapshot of the reviewer price at booking time, in cents. */
  pricePerHour: z.number(),
  /** In cents. */
  totalPrice: z.number(),
  currency: z.string(),
  status: missionStatusSchema,
  notes: z.optional(z.string()),
  aiPreGeneratedAt: z.optional(dateTimeSchema),
  completedAt: z.optional(dateTimeSchema),
  canceledAt: z.optional(dateTimeSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

export const reviewerReviewSchema = z.looseObject({
  id: z.string(),
  missionId: z.string(),
  reviewerId: z.string(),
  /** 1 to 5. */
  rating: z.number(),
  comment: z.optional(z.string()),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

export const reviewerMessageSchema = z.looseObject({
  id: z.string(),
  missionId: z.string(),
  senderId: z.string(),
  content: z.string(),
  readAt: z.optional(dateTimeSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

export const missionEstimateSchema = z.object({
  wordCount: z.number(),
  estimatedHours: z.number(),
  /** In cents. */
  totalPrice: z.number(),
  currency: z.string(),
});

export const priceDistributionSchema = z.object({
  buckets: z.array(
    z.object({ min: z.number(), max: z.number(), count: z.number() })
  ),
  globalMin: z.number(),
  globalMax: z.number(),
});

const marketplaceFiltersShape = {
  fromLocale: z.optional(z.string()),
  toLocale: z.optional(z.string()),
  minRating: z.optional(numericQueryValueSchema),
  categories: z.optional(repeatableQueryValueSchema),
};

const reviewerProfileBodyShape = {
  bio: z.optional(z.string()),
  languagePairs: z.array(languagePairSchema),
  categories: z.optional(z.array(reviewerCategorySchema)),
  /** In cents. */
  pricePerHour: z.number(),
  socialLinks: z.optional(socialLinksSchema),
};

const reviewerIdParamsSchema = z.object({ reviewerId: objectIdSchema });
const missionIdParamsSchema = z.object({ missionId: objectIdSchema });
const profileResponseSchema = responseDataSchema(reviewerProfileSchema);
const missionResponseSchema = responseDataSchema(translationMissionSchema);
const paginatedQuerySchema = z.object(paginationQueryShape);

/** REST contract of the `/api/reviewer` routes (translator marketplace). */
export const reviewerContract = defineRouteGroup({
  prefix: '/api/reviewer',
  tag: 'Reviewer',
  routes: {
    getMarketplace: defineRoute({
      method: 'GET',
      path: '/marketplace',
      summary: 'Search the reviewer marketplace',
      schemas: {
        querystring: z.object({
          ...paginationQueryShape,
          ...marketplaceFiltersShape,
          maxPricePerHour: z.optional(numericQueryValueSchema),
          minPricePerHour: z.optional(numericQueryValueSchema),
        }),
        response: { 200: paginatedResponseSchema(reviewerProfileSchema) },
      },
    }),
    getPriceDistribution: defineRoute({
      method: 'GET',
      path: '/marketplace/price-distribution',
      summary: 'Price histogram of the marketplace (filter slider)',
      schemas: {
        querystring: z.object(marketplaceFiltersShape),
        response: { 200: responseDataSchema(priceDistributionSchema) },
      },
    }),
    getMyReviewerProfile: defineRoute({
      method: 'GET',
      path: '/me',
      summary: 'Reviewer profile of the signed-in user',
      schemas: {
        response: {
          200: responseDataSchema(z.nullable(reviewerProfileSchema)),
        },
      },
    }),
    getReviewerReviews: defineRoute({
      method: 'GET',
      path: '/:reviewerId/reviews',
      summary: 'Reviews left on a reviewer',
      schemas: {
        params: reviewerIdParamsSchema,
        querystring: paginatedQuerySchema,
        response: { 200: paginatedResponseSchema(reviewerReviewSchema) },
      },
    }),
    getReviewerById: defineRoute({
      method: 'GET',
      path: '/:reviewerId',
      summary: 'Public profile of a reviewer',
      schemas: {
        params: reviewerIdParamsSchema,
        response: { 200: profileResponseSchema },
      },
    }),
    registerAsReviewer: defineRoute({
      method: 'POST',
      path: '/register',
      summary: 'Create the reviewer profile of the signed-in user',
      schemas: {
        body: z.object(reviewerProfileBodyShape),
        response: { 200: profileResponseSchema },
      },
    }),
    updateReviewerProfile: defineRoute({
      method: 'PUT',
      path: '/',
      summary: 'Update the reviewer profile of the signed-in user',
      schemas: {
        body: z.object({
          ...z.partial(z.object(reviewerProfileBodyShape)).shape,
          isHidden: z.optional(z.boolean()),
        }),
        response: { 200: profileResponseSchema },
      },
    }),
    deleteReviewerProfile: defineRoute({
      method: 'DELETE',
      path: '/',
      summary: 'Delete the reviewer profile of the signed-in user',
      schemas: {
        response: { 200: responseDataSchema(z.null()) },
      },
    }),
    uploadMainPicture: defineRoute({
      method: 'POST',
      path: '/me/picture/main',
      summary: 'Upload the main picture (raw `image/*` body)',
      schemas: { response: { 200: profileResponseSchema } },
    }),
    uploadCoverPicture: defineRoute({
      method: 'POST',
      path: '/me/picture/cover',
      summary: 'Upload the cover picture (raw `image/*` body)',
      schemas: { response: { 200: profileResponseSchema } },
    }),
    estimateMission: defineRoute({
      method: 'POST',
      path: '/mission/estimate',
      summary: 'Estimate the price of a mission',
      schemas: {
        body: z.object({
          dictionaryIds: z.array(z.string()),
          sourceLocale: z.optional(z.string()),
          /** In cents. */
          pricePerHour: z.number(),
        }),
        response: { 200: responseDataSchema(missionEstimateSchema) },
      },
    }),
    createMission: defineRoute({
      method: 'POST',
      path: '/mission',
      summary: 'Book a reviewer',
      schemas: {
        body: z.object({
          reviewerId: objectIdSchema,
          dictionaryIds: z.optional(z.array(z.string())),
          /** Optional: non-translation missions (ex: SEO review) have no locales. */
          sourceLocale: z.optional(z.string()),
          targetLocales: z.optional(z.array(z.string())),
          projectId: z.optional(z.string()),
          notes: z.optional(z.string()),
        }),
        response: { 200: missionResponseSchema },
      },
    }),
    getMyMissions: defineRoute({
      method: 'GET',
      path: '/mission',
      summary: 'Missions of the signed-in user (as client or reviewer)',
      schemas: {
        querystring: z.object({
          ...paginationQueryShape,
          role: z.optional(z.enum(['client', 'reviewer'])),
        }),
        response: { 200: paginatedResponseSchema(translationMissionSchema) },
      },
    }),
    getMissionById: defineRoute({
      method: 'GET',
      path: '/mission/:missionId',
      summary: 'Get a mission (client or reviewer only)',
      schemas: {
        params: missionIdParamsSchema,
        response: { 200: missionResponseSchema },
      },
    }),
    updateMissionStatus: defineRoute({
      method: 'PUT',
      path: '/mission/:missionId/status',
      summary: 'Move a mission through its workflow',
      schemas: {
        params: missionIdParamsSchema,
        body: z.object({ status: missionStatusSchema }),
        response: { 200: missionResponseSchema },
      },
    }),
    submitReview: defineRoute({
      method: 'POST',
      path: '/mission/:missionId/review',
      summary: 'Rate the reviewer of a completed mission',
      schemas: {
        params: missionIdParamsSchema,
        body: z.object({
          rating: z.number().check(z.gte(1), z.lte(5)),
          comment: z.optional(z.string()),
        }),
        response: { 200: responseDataSchema(reviewerReviewSchema) },
      },
    }),
    getChatHistory: defineRoute({
      method: 'GET',
      path: '/mission/:missionId/chat/history',
      summary: 'Messages of a mission chat',
      schemas: {
        params: missionIdParamsSchema,
        response: {
          200: responseDataSchema(z.array(reviewerMessageSchema)),
        },
      },
    }),
    sendMessage: defineRoute({
      method: 'POST',
      path: '/mission/:missionId/chat',
      summary: 'Send a message in a mission chat',
      schemas: {
        params: missionIdParamsSchema,
        body: z.object({ content: z.string().check(z.minLength(1)) }),
        response: { 200: responseDataSchema(reviewerMessageSchema) },
      },
    }),
    chatSSE: defineRoute({
      method: 'GET',
      path: '/mission/:missionId/chat/stream',
      summary: 'Mission chat (server-sent events stream)',
      schemas: { params: missionIdParamsSchema },
    }),
    createPaymentIntent: defineRoute({
      method: 'POST',
      path: '/mission/:missionId/payment/intent',
      summary: 'Payment intent of a mission (not available yet)',
      schemas: { params: missionIdParamsSchema },
    }),
    confirmPayment: defineRoute({
      method: 'POST',
      path: '/mission/:missionId/payment/confirm',
      summary: 'Confirm the payment of a mission (not available yet)',
      schemas: { params: missionIdParamsSchema },
    }),
    requestPayout: defineRoute({
      method: 'POST',
      path: '/payout',
      summary: 'Request a payout (not available yet)',
      schemas: {},
    }),
    contactReviewer: defineRoute({
      method: 'POST',
      path: '/:reviewerId/contact',
      summary: 'Send a message to a reviewer before booking',
      schemas: {
        params: reviewerIdParamsSchema,
        body: z.object({ message: z.string().check(z.minLength(1)) }),
        response: { 200: responseDataSchema(z.unknown()) },
      },
    }),
    getAdminReviewers: defineRoute({
      method: 'GET',
      path: '/admin/reviewers',
      summary: 'Admin only: list reviewer profiles by status',
      schemas: {
        querystring: z.object({
          ...paginationQueryShape,
          status: z.optional(z.string()),
        }),
        response: { 200: paginatedResponseSchema(reviewerProfileSchema) },
      },
    }),
    validateReviewerProfile: defineRoute({
      method: 'PUT',
      path: '/:reviewerId/validate',
      summary: 'Admin only: activate a reviewer profile',
      schemas: {
        params: reviewerIdParamsSchema,
        response: { 200: profileResponseSchema },
      },
    }),
  },
});

/** Route definitions of the `/api/reviewer` group, by name. */
export type ReviewerRoutes = (typeof reviewerContract)['routes'];

export type ReviewerStatus = z.output<typeof reviewerStatusSchema>;
export type ReviewerCategory = z.output<typeof reviewerCategorySchema>;
export type MissionStatus = z.output<typeof missionStatusSchema>;
export type ReviewerProfileAPI = z.output<typeof reviewerProfileSchema>;
export type TranslationMissionAPI = z.output<typeof translationMissionSchema>;
export type ReviewerReviewAPI = z.output<typeof reviewerReviewSchema>;
export type ReviewerMessageAPI = z.output<typeof reviewerMessageSchema>;
export type MissionEstimate = z.output<typeof missionEstimateSchema>;
export type PriceDistributionData = z.output<typeof priceDistributionSchema>;
export type PriceDistributionBucket = PriceDistributionData['buckets'][number];

type MarketplaceNumericFilter =
  | 'page'
  | 'pageSize'
  | 'minRating'
  | 'minPricePerHour'
  | 'maxPricePerHour';

/** Marketplace query as built by clients (numbers are serialized). */
export type GetMarketplaceQuery = Omit<
  RouteQuerystring<ReviewerRoutes['getMarketplace']>,
  MarketplaceNumericFilter
> & { [Filter in MarketplaceNumericFilter]?: number };
export type RegisterReviewerBody = RouteBodyInput<
  ReviewerRoutes['registerAsReviewer']
>;
export type UpdateReviewerBody = RouteBodyInput<
  ReviewerRoutes['updateReviewerProfile']
>;
export type UploadReviewerPictureResult = ResponseData<ReviewerProfileAPI>;
export type SubmitReviewBody = RouteBodyInput<ReviewerRoutes['submitReview']>;
export type EstimateMissionBody = RouteBodyInput<
  ReviewerRoutes['estimateMission']
>;
export type CreateMissionBody = RouteBodyInput<ReviewerRoutes['createMission']>;
export type UpdateMissionStatusBody = RouteBodyInput<
  ReviewerRoutes['updateMissionStatus']
>;
export type SendMessageBody = RouteBodyInput<ReviewerRoutes['sendMessage']>;
export type ContactReviewerBody = RouteBodyInput<
  ReviewerRoutes['contactReviewer']
>;
export type GetMarketplaceResult = PaginatedResponse<ReviewerProfileAPI>;
