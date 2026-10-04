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
  type RouteParams,
  type RouteQuerystring,
} from './defineRoute';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
  type ResponseData,
  responseDataSchema,
} from './responseData';

/** Billing plan tiers. */
export const planTypeSchema = z.enum([
  'FREE',
  'PREMIUM',
  'ENTERPRISE',
  'LIFETIME',
]);

/** Subscription of an organization. Only Stripe webhooks change it. */
export const planSchema = z.looseObject({
  id: z.string(),
  type: planTypeSchema,
  creatorId: z.optional(z.string()),
  subscriptionId: z.optional(z.string()),
  customerId: z.optional(z.string()),
  priceId: z.optional(z.string()),
  status: z.optional(
    z.enum([
      'active',
      'canceled',
      'past_due',
      'unpaid',
      'incomplete',
      'incomplete_expired',
      'paused',
      'trialing',
    ])
  ),
  period: z.optional(z.enum(['MONTHLY', 'YEARLY', 'LIFETIME'])),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

/** Transactional email providers of a per-organization mailer. */
export const mailerProviderSchema = z.enum(['resend', 'smtp']);

/**
 * Per-organization mailer as returned by the API: secrets are never sent,
 * the `has*` flags tell whether one is stored.
 */
export const organizationMailerConfigSchema = z.object({
  isActive: z.boolean(),
  provider: mailerProviderSchema,
  fromName: z.optional(z.string()),
  fromEmail: z.optional(z.string()),
  resend: z.optional(z.object({ hasApiKey: z.optional(z.boolean()) })),
  smtp: z.optional(
    z.object({
      host: z.optional(z.string()),
      port: z.optional(z.number()),
      secure: z.optional(z.boolean()),
      user: z.optional(z.string()),
      hasPassword: z.optional(z.boolean()),
    })
  ),
});

/**
 * Mailer update payload. Secrets are plaintext and optional: an omitted or
 * empty secret keeps the stored one.
 */
export const organizationMailerConfigInputSchema = z.object({
  isActive: z.boolean(),
  provider: mailerProviderSchema,
  fromName: z.optional(z.string()),
  fromEmail: z.optional(z.string()),
  resend: z.optional(z.object({ apiKey: z.optional(z.string()) })),
  smtp: z.optional(
    z.object({
      host: z.optional(z.string()),
      port: z.optional(z.number()),
      secure: z.optional(z.boolean()),
      user: z.optional(z.string()),
      password: z.optional(z.string()),
    })
  ),
});

/** Organization as returned by the API. */
export const organizationSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  membersIds: z.array(z.string()),
  adminsIds: z.array(z.string()),
  /** Whether SSO is configured (managed by better-auth). */
  ssoEnabled: z.boolean(),
  /** Primary domain, used for SSO provider lookup. */
  domain: z.string(),
  mailerConfig: z.optional(organizationMailerConfigSchema),
  creatorId: z.string(),
  plan: z.optional(planSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

const organizationIdParamsSchema = z.object({ organizationId: objectIdSchema });

/** Members and admins of an organization, replaced as a whole. */
const organizationMembersBodySchema = z.object({
  membersIds: z.optional(z.array(objectIdSchema)),
  adminsIds: z.optional(z.array(objectIdSchema)),
});

const organizationResponseSchema = responseDataSchema(organizationSchema);

/** REST contract of the `/api/organization` routes. */
export const organizationContract = defineRouteGroup({
  prefix: '/api/organization',
  tag: 'Organization',
  routes: {
    getOrganizations: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'List the organizations of the signed-in user',
      schemas: {
        querystring: z.looseObject({
          ...paginationQueryShape,
          ids: z.optional(repeatableQueryValueSchema),
          name: z.optional(z.string()),
          search: z.optional(z.string()),
          membersIds: z.optional(repeatableQueryValueSchema),
          sortBy: z.optional(z.string()),
          sortOrder: z.optional(z.string()),
          /** Admin only: list every organization. */
          fetchAll: z.optional(z.enum(['true', 'false'])),
        }),
        response: { 200: paginatedResponseSchema(organizationSchema) },
      },
    }),
    addOrganization: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Create an organization',
      schemas: {
        body: z.object({ name: z.string().check(z.minLength(1)) }),
        response: { 200: organizationResponseSchema },
      },
    }),
    updateOrganization: defineRoute({
      method: 'PUT',
      path: '/',
      summary: 'Rename the selected organization',
      schemas: {
        /**
         * Allow-list: plan, SSO, domain, mailer and membership fields only
         * change through their dedicated flows.
         */
        body: z.object({ name: z.string().check(z.minLength(1)) }),
        response: { 200: organizationResponseSchema },
      },
    }),
    updateOrganizationMailerConfig: defineRoute({
      method: 'PUT',
      path: '/mailer-config',
      summary: 'Configure the transactional mailer of the organization',
      schemas: {
        body: organizationMailerConfigInputSchema,
        response: { 200: organizationResponseSchema },
      },
    }),
    updateOrganizationMembers: defineRoute({
      method: 'PUT',
      path: '/members',
      summary: 'Replace the members of the selected organization',
      schemas: {
        body: organizationMembersBodySchema,
        response: { 200: organizationResponseSchema },
      },
    }),
    updateOrganizationMembersById: defineRoute({
      method: 'PUT',
      path: '/:organizationId/members',
      summary: 'Admin only: replace the members of any organization',
      schemas: {
        params: organizationIdParamsSchema,
        body: organizationMembersBodySchema,
        response: { 200: organizationResponseSchema },
      },
    }),
    addOrganizationMember: defineRoute({
      method: 'POST',
      path: '/member',
      summary: 'Invite a user to the selected organization by email',
      schemas: {
        body: z.object({ userEmail: z.string().check(z.minLength(1)) }),
        response: { 200: organizationResponseSchema },
      },
    }),
    deleteOrganization: defineRoute({
      method: 'DELETE',
      path: '/',
      summary: 'Delete the selected organization',
      schemas: {
        response: { 200: organizationResponseSchema },
      },
    }),
    selectOrganization: defineRoute({
      method: 'PUT',
      path: '/:organizationId',
      summary: 'Select an organization for the current session',
      schemas: {
        params: organizationIdParamsSchema,
        response: { 200: organizationResponseSchema },
      },
    }),
    unselectOrganization: defineRoute({
      method: 'POST',
      path: '/logout',
      summary: 'Unselect the organization of the current session',
      schemas: {
        response: { 200: responseDataSchema(z.null()) },
      },
    }),
    deleteOrganizationByIdAdmin: defineRoute({
      method: 'DELETE',
      path: '/:organizationId/admin',
      summary: 'Admin only: delete any organization',
      schemas: {
        params: organizationIdParamsSchema,
        response: { 200: organizationResponseSchema },
      },
    }),
  },
});

/** Route definitions of the `/api/organization` group, by name. */
export type OrganizationRoutes = (typeof organizationContract)['routes'];

export type PlanType = z.output<typeof planTypeSchema>;
export type PlanAPI = z.output<typeof planSchema>;
export type MailerProvider = z.output<typeof mailerProviderSchema>;
export type OrganizationMailerConfigAPI = z.output<
  typeof organizationMailerConfigSchema
>;
export type OrganizationMailerConfigInput = z.output<
  typeof organizationMailerConfigInputSchema
>;
export type OrganizationAPI = z.output<typeof organizationSchema>;

export type GetOrganizationsParams = RouteQuerystring<
  OrganizationRoutes['getOrganizations']
>;
export type GetOrganizationsResult = PaginatedResponse<OrganizationAPI>;
export type GetOrganizationParam = { organizationId: string };
export type GetOrganizationResult = ResponseData<OrganizationAPI>;
export type AddOrganizationBody = RouteBodyInput<
  OrganizationRoutes['addOrganization']
>;
export type AddOrganizationResult = ResponseData<OrganizationAPI>;
export type UpdateOrganizationBody = RouteBodyInput<
  OrganizationRoutes['updateOrganization']
>;
export type UpdateOrganizationResult = ResponseData<OrganizationAPI>;
export type UpdateOrganizationMailerConfigBody = RouteBodyInput<
  OrganizationRoutes['updateOrganizationMailerConfig']
>;
export type UpdateOrganizationMailerConfigResult =
  ResponseData<OrganizationAPI>;
export type AddOrganizationMemberBody = RouteBodyInput<
  OrganizationRoutes['addOrganizationMember']
>;
export type AddOrganizationMemberResult = ResponseData<OrganizationAPI>;
export type UpdateOrganizationMembersBody = RouteBodyInput<
  OrganizationRoutes['updateOrganizationMembers']
>;
export type UpdateOrganizationMembersResult = ResponseData<OrganizationAPI>;
export type UpdateOrganizationMembersByIdParams = RouteParams<
  OrganizationRoutes['updateOrganizationMembersById']
>;
export type UpdateOrganizationMembersByIdBody = UpdateOrganizationMembersBody;
export type UpdateOrganizationMembersByIdResult = ResponseData<OrganizationAPI>;
export type DeleteOrganizationResult = ResponseData<OrganizationAPI>;
export type DeleteOrganizationByIdAdminParams = RouteParams<
  OrganizationRoutes['deleteOrganizationByIdAdmin']
>;
export type DeleteOrganizationByIdAdminResult = ResponseData<OrganizationAPI>;
export type SelectOrganizationParam = RouteParams<
  OrganizationRoutes['selectOrganization']
>;
export type SelectOrganizationResult = ResponseData<OrganizationAPI>;
export type UnselectOrganizationResult = ResponseData<null>;
