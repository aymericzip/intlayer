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

/** Rejects repository URLs, which belong in the `githubUrl` field. */
const isNotRepositoryURL = z.refine<string>(
  (value: string) => !/github\.com|gitlab\.com|bitbucket\.org/.test(value),
  { message: 'Repository URLs should be placed in the GitHub URL field' }
);

/** Optional URL where an empty string means "not provided". */
const optionalURLSchema = z.pipe(
  z.union([z.optional(z.url()), z.literal('')]),
  z.transform((value) => (value === '' ? undefined : value))
);

/** Up to three use cases describing the project. */
const useCasesSchema = z.optional(z.array(z.string()).check(z.maxLength(3)));

/** Votes of a showcase project, with the session's own vote. */
const votesSchema = z.object({
  upvotes: z.number(),
  isUpVoted: z.boolean(),
  downvotes: z.number(),
  isDownVoted: z.boolean(),
});

/** i18n SEO checks run on the showcased website. */
export const showcaseScanDetailsSchema = z.object({
  score: z.number(),
  langTag: z.string(),
  htmlDir: z.string(),
  hreflangs: z.array(z.string()),
  hasXDefault: z.boolean(),
  hasCanonical: z.boolean(),
  hasLocalizedLinks: z.boolean(),
  allAnchorsLocalized: z.boolean(),
  robotsTxt: z.object({
    accessible: z.boolean(),
    disallowWithoutLocaleAlternates: z.boolean(),
  }),
  sitemapXml: z.object({
    urlsDiscoveredCount: z.number(),
    alternatesPresent: z.boolean(),
    xDefaultPresent: z.boolean(),
  }),
});

/** Showcase project as returned by the API. */
export const showcaseProjectSchema = z.looseObject({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  logoUrl: z.optional(z.string()),
  websiteUrl: z.string(),
  githubUrl: z.optional(z.nullable(z.string())),
  tags: z.array(z.string()),
  isOpenSource: z.boolean(),
  intlayerVersion: z.optional(z.string()),
  libsUsed: z.array(z.string()),
  packageDetails: z.optional(z.record(z.string(), z.string())),
  lastScanDate: z.optional(dateTimeSchema),
  scanDetails: z.optional(showcaseScanDetailsSchema),
  owner: z.optional(z.string()),
  status: z.optional(z.enum(['pending_scan', 'active', 'scan_failed'])),
  createdAt: dateTimeSchema,
  isOwner: z.optional(z.boolean()),
  ...votesSchema.shape,
});

const projectIdParamsSchema = z.object({ projectId: objectIdSchema });
const projectIdBodySchema = z.object({ projectId: objectIdSchema });

/** REST contract of the `/api/showcase-project` routes. */
export const showcaseProjectContract = defineRouteGroup({
  prefix: '/api/showcase-project',
  tag: 'Showcase project',
  routes: {
    getShowcaseProjects: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'List the projects showcased on intlayer.org',
      schemas: {
        querystring: z.object({
          ...paginationQueryShape,
          search: z.optional(z.string()),
          selectedUseCases: z.optional(repeatableQueryValueSchema),
          isOpenSource: z.optional(z.string()),
        }),
        response: { 200: paginatedResponseSchema(showcaseProjectSchema) },
      },
    }),
    submitShowcaseProject: defineRoute({
      method: 'POST',
      path: '/submit',
      summary: 'Submit a project to the showcase (scanned before listing)',
      schemas: {
        body: z.object({
          name: z.string().check(z.minLength(1)),
          url: z.url().check(isNotRepositoryURL),
          githubUrl: optionalURLSchema,
          useCases: useCasesSchema,
        }),
        response: { 200: responseDataSchema(showcaseProjectSchema) },
      },
    }),
    getOtherShowcaseProjects: defineRoute({
      method: 'GET',
      path: '/others',
      summary: 'Other showcase projects, for "see also" sections',
      schemas: {
        querystring: z.object({
          excludeId: z.string(),
          limit: z.optional(z.string()),
        }),
        response: {
          200: responseDataSchema(z.array(showcaseProjectSchema)),
        },
      },
    }),
    toggleShowcaseUpvote: defineRoute({
      method: 'POST',
      path: '/upvote',
      summary: 'Toggle the upvote of the signed-in user',
      schemas: {
        body: projectIdBodySchema,
        response: { 200: responseDataSchema(votesSchema) },
      },
    }),
    toggleShowcaseDownvote: defineRoute({
      method: 'POST',
      path: '/downvote',
      summary: 'Toggle the downvote of the signed-in user',
      schemas: {
        body: projectIdBodySchema,
        response: { 200: responseDataSchema(votesSchema) },
      },
    }),
    getShowcaseProjectById: defineRoute({
      method: 'GET',
      path: '/:projectId',
      summary: 'Get a showcase project',
      schemas: {
        params: projectIdParamsSchema,
        response: { 200: responseDataSchema(showcaseProjectSchema) },
      },
    }),
    scanShowcaseProject: defineRoute({
      method: 'GET',
      path: '/:projectId/scan',
      summary: 'Owner only: re-scan the project (server-sent events stream)',
      schemas: {
        params: projectIdParamsSchema,
      },
    }),
    deleteShowcaseProject: defineRoute({
      method: 'DELETE',
      path: '/:projectId',
      summary: 'Owner only: delete a showcase project',
      schemas: {
        params: projectIdParamsSchema,
        response: {
          200: responseDataSchema(z.object({ success: z.boolean() })),
        },
      },
    }),
    updateShowcaseProject: defineRoute({
      method: 'PATCH',
      path: '/:projectId',
      summary: 'Owner only: update a showcase project',
      schemas: {
        params: projectIdParamsSchema,
        body: z.object({
          name: z.optional(z.string().check(z.minLength(1), z.maxLength(255))),
          url: z.optional(z.url().check(isNotRepositoryURL)),
          /** Normalized to an `https://` URL; empty clears it (`null`). */
          githubUrl: z.pipe(
            z.optional(z.string()),
            z.transform((value) => {
              if (!value) return null;
              if (value.startsWith('http://') || value.startsWith('https://'))
                return value;
              return `https://${value}`;
            })
          ),
          tagline: z.optional(
            z.string().check(z.minLength(1), z.maxLength(500))
          ),
          description: z.optional(z.string()),
          useCases: useCasesSchema,
        }),
        response: { 200: responseDataSchema(showcaseProjectSchema) },
      },
    }),
  },
});

/** Route definitions of the `/api/showcase-project` group, by name. */
export type ShowcaseProjectRoutes = (typeof showcaseProjectContract)['routes'];

type ShowcaseVotes = z.output<typeof votesSchema>;

export type ShowcaseScanDetails = z.output<typeof showcaseScanDetailsSchema>;
export type ShowcaseProjectAPI = z.output<typeof showcaseProjectSchema>;
export type GetShowcaseProjectsQuery = RouteQuerystring<
  ShowcaseProjectRoutes['getShowcaseProjects']
>;
export type GetShowcaseProjectsResult = PaginatedResponse<ShowcaseProjectAPI>;
export type SubmitShowcaseProjectBody = RouteBodyInput<
  ShowcaseProjectRoutes['submitShowcaseProject']
>;
export type SubmitShowcaseProjectResult = ResponseData<ShowcaseProjectAPI>;
export type GetOtherShowcaseProjectsQuery = RouteQuerystring<
  ShowcaseProjectRoutes['getOtherShowcaseProjects']
>;
export type GetOtherShowcaseProjectsResult = ResponseData<ShowcaseProjectAPI[]>;
export type ToggleShowcaseUpvoteBody = RouteBodyInput<
  ShowcaseProjectRoutes['toggleShowcaseUpvote']
>;
export type ToggleShowcaseUpvoteResult = ResponseData<ShowcaseVotes>;
export type ToggleShowcaseDownvoteBody = RouteBodyInput<
  ShowcaseProjectRoutes['toggleShowcaseDownvote']
>;
export type ToggleShowcaseDownvoteResult = ResponseData<ShowcaseVotes>;
export type GetShowcaseProjectByIdParams = RouteParams<
  ShowcaseProjectRoutes['getShowcaseProjectById']
>;
export type GetShowcaseProjectByIdResult = ResponseData<ShowcaseProjectAPI>;
export type UpdateShowcaseProjectParams = RouteParams<
  ShowcaseProjectRoutes['updateShowcaseProject']
>;
export type UpdateShowcaseProjectBody = RouteBodyInput<
  ShowcaseProjectRoutes['updateShowcaseProject']
>;
export type UpdateShowcaseProjectResult = ResponseData<ShowcaseProjectAPI>;
export type DeleteShowcaseProjectParams = RouteParams<
  ShowcaseProjectRoutes['deleteShowcaseProject']
>;
