import type {
  RouteDefinition,
  RouteGroup,
} from '@intlayer/backend-contract/defineRoute';
import { logger } from '@logger';
import { ErrorHandler } from '@utils/errors';
import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifySchemaCompiler,
  FastifySerializerCompiler,
  RouteOptions,
} from 'fastify';
import { validatorCompiler } from 'fastify-type-provider-zod';
import { type $ZodType, type output, safeParse } from 'zod/v4/core';

type SchemaOutputOrUnknown<Schema> = Schema extends $ZodType
  ? output<Schema>
  : unknown;

/** Fastify request typed from the zod schemas of a contract route. */
export type ContractRequest<Route extends RouteDefinition> = FastifyRequest<{
  Params: SchemaOutputOrUnknown<Route['schemas']['params']>;
  Querystring: SchemaOutputOrUnknown<Route['schemas']['querystring']>;
  Body: SchemaOutputOrUnknown<Route['schemas']['body']>;
}>;

/** Handler of a contract route. */
export type ContractHandler<Route extends RouteDefinition> = (
  request: ContractRequest<Route>,
  reply: FastifyReply
) => Promise<void> | void;

/** Fastify route options a contract route may add (rate limits, hooks). */
export type ContractRouteOptions = Pick<
  RouteOptions,
  'config' | 'preHandler' | 'onRequest' | 'bodyLimit'
>;

/** A handler, or a handler with route options. */
export type ContractHandlerEntry<Route extends RouteDefinition> =
  | ContractHandler<Route>
  | { handler: ContractHandler<Route>; options: ContractRouteOptions };

/**
 * One entry per route of the group: a missing route fails to compile.
 * `null` explicitly leaves a route unregistered (ex: cloud-only features on
 * a self-hosted instance).
 */
export type ContractHandlers<Routes extends Record<string, RouteDefinition>> = {
  [Name in keyof Routes]: ContractHandlerEntry<Routes[Name]> | null;
};

/**
 * Serializes with `JSON.stringify` and never alters the payload. Outside
 * production, the wire payload is checked against the response schema and
 * drift is logged, so a schema bug can never break a live response.
 */
const contractSerializerCompiler: FastifySerializerCompiler<FastifySchema> =
  ({ schema, method, url }) =>
  (data) => {
    const serialized = JSON.stringify(data);

    if (process.env.NODE_ENV !== 'production') {
      const result = safeParse(
        schema as unknown as $ZodType,
        JSON.parse(serialized)
      );

      if (!result.success) {
        logger.warn(
          `Response of ${method} ${url} does not match its contract: ${JSON.stringify(result.error.issues)}`
        );
      }
    }

    return serialized;
  };

/**
 * Answers request validation failures with the backend error envelope
 * (`INVALID_REQUEST_BODY`) instead of Fastify's default payload, so clients
 * read every error the same way. Other errors keep the default handling.
 */
const contractErrorHandler = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
): void => {
  if (!error.validation) {
    reply.send(error);
    return;
  }

  const message = error.validation
    .map(
      ({ instancePath, message: issueMessage }) =>
        `${error.validationContext ?? ''}${instancePath}: ${issueMessage}`
    )
    .join(', ');

  ErrorHandler.handleGenericErrorResponse(reply, 'INVALID_REQUEST_BODY', {
    message,
  });
};

/**
 * Registers every route of a contract group on the (prefixed) Fastify scope,
 * with zod request validation and OpenAPI metadata.
 */
export const registerContractRoutes = <
  Routes extends Record<string, RouteDefinition>,
>(
  fastify: FastifyInstance,
  group: RouteGroup<string, Routes>,
  handlers: ContractHandlers<Routes>
): void => {
  for (const [name, route] of Object.entries(group.routes)) {
    const entry = handlers[
      name
    ] as ContractHandlerEntry<RouteDefinition> | null;

    if (entry === null) continue;

    const { handler, options } =
      typeof entry === 'function' ? { handler: entry, options: {} } : entry;

    fastify.route({
      ...options,
      method: route.method,
      url: route.path,
      schema: {
        operationId: name,
        tags: [group.tag],
        summary: route.summary,
        description: route.description,
        ...route.schemas,
      },
      // Contract schemas are zod, not JSON Schema: Fastify's types assume the latter
      validatorCompiler:
        validatorCompiler as unknown as FastifySchemaCompiler<FastifySchema>,
      serializerCompiler: contractSerializerCompiler,
      errorHandler: contractErrorHandler,
      handler,
    });
  }
};
