import type { $ZodType, input, output } from 'zod/v4/core';

/** HTTP methods exposed by the Intlayer backend. */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Zod schemas describing one route's input and output. */
export type RouteSchemas = {
  params?: $ZodType;
  querystring?: $ZodType;
  body?: $ZodType;
  /** Response schemas keyed by HTTP status code. */
  response?: Partial<Record<number, $ZodType>>;
};

/** One REST route: method, path relative to its group prefix, and schemas. */
export type RouteDefinition<
  Method extends HttpMethod = HttpMethod,
  Path extends string = string,
  Schemas extends RouteSchemas = RouteSchemas,
> = {
  method: Method;
  /** Fastify-style path, relative to the group prefix (ex: `/:projectId`). */
  path: Path;
  /** One-line summary shown in the OpenAPI documentation. */
  summary: string;
  description?: string;
  schemas: Schemas;
};

/** A set of routes sharing a URL prefix and an OpenAPI tag. */
export type RouteGroup<
  Prefix extends string = string,
  Routes extends Record<string, RouteDefinition> = Record<
    string,
    RouteDefinition
  >,
> = {
  /** Absolute prefix mounted on the backend (ex: `/api/project`). */
  prefix: Prefix;
  /** OpenAPI tag grouping the routes in the documentation. */
  tag: string;
  routes: Routes;
};

/** Identity helper preserving literal types of a route definition. */
export const defineRoute = <
  const Method extends HttpMethod,
  const Path extends string,
  const Schemas extends RouteSchemas,
>(
  route: RouteDefinition<Method, Path, Schemas>
): RouteDefinition<Method, Path, Schemas> => route;

/** Identity helper preserving literal types of a route group. */
export const defineRouteGroup = <
  const Prefix extends string,
  const Routes extends Record<string, RouteDefinition>,
>(
  group: RouteGroup<Prefix, Routes>
): RouteGroup<Prefix, Routes> => group;

type SchemaOutput<Schema> = Schema extends $ZodType ? output<Schema> : never;
type SchemaInput<Schema> = Schema extends $ZodType ? input<Schema> : never;

/** Request body as parsed by the backend (after validation). */
export type RouteBody<Route extends RouteDefinition> = SchemaOutput<
  Route['schemas']['body']
>;
/** Request body as sent by a client (before validation). */
export type RouteBodyInput<Route extends RouteDefinition> = SchemaInput<
  Route['schemas']['body']
>;
/** URL params as parsed by the backend. */
export type RouteParams<Route extends RouteDefinition> = SchemaOutput<
  Route['schemas']['params']
>;
/** Query string as parsed by the backend. */
export type RouteQuerystring<Route extends RouteDefinition> = SchemaOutput<
  Route['schemas']['querystring']
>;
/** Successful (200) response payload. */
export type RouteResponse<Route extends RouteDefinition> =
  Route['schemas']['response'] extends Record<200, infer Schema>
    ? SchemaOutput<Schema>
    : unknown;

/** Method and path of every route, for clients that must not load the schemas. */
export type RouteEndpoints<Routes extends Record<string, RouteDefinition>> = {
  [Name in keyof Routes]: Pick<Routes[Name], 'method' | 'path'>;
};

/** Extracts `{ name: string }` from a `/:name` path pattern. */
export type PathParams<Path extends string> =
  Path extends `${string}:${infer Name}/${infer Rest}`
    ? { [Key in Name]: string } & PathParams<`/${Rest}`>
    : Path extends `${string}:${infer Name}`
      ? { [Key in Name]: string }
      : Record<never, never>;

/** Untyped implementation of {@link buildRouteURL}. */
const joinRouteURL = (
  backendURL: string,
  prefix: string,
  path: string,
  params?: Record<string, string>
): string => {
  const resolvedPath = path.replace(
    /:([A-Za-z0-9_]+)/g,
    (_match, name: string) => {
      const value = params?.[name];

      if (value === undefined) {
        throw new Error(`Missing route param "${name}" for ${path}`);
      }

      return encodeURIComponent(value);
    }
  );
  const normalizedPath = resolvedPath === '/' ? '' : resolvedPath;

  return `${backendURL}${prefix}${normalizedPath}`;
};

/**
 * Builds the absolute URL of a route by joining the backend URL, the group
 * prefix and the path, with `:param` segments replaced and URI-encoded.
 */
export const buildRouteURL = <Prefix extends string, Path extends string>(
  backendURL: string,
  group: Pick<RouteGroup<Prefix>, 'prefix'>,
  route: Pick<RouteDefinition<HttpMethod, Path>, 'path'>,
  ...[params]: keyof PathParams<Path> extends never
    ? []
    : [params: PathParams<Path>]
): string =>
  joinRouteURL(
    backendURL,
    group.prefix,
    route.path,
    params as Record<string, string> | undefined
  );
