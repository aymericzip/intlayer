import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import {
  createJsonSchemaTransform,
  createJsonSchemaTransformObject,
} from 'fastify-type-provider-zod';
import { $ZodType } from 'zod/v4/core';

/** Path of the Swagger UI; the spec is served at `${path}/json` and `/yaml`. */
export const openAPIRoutePrefix = '/docs';

/**
 * Values typed from other packages (`typedStringSchema`, `typedValueSchema`)
 * are zod customs: documented as strings / any value instead of failing.
 */
const zodToJsonConfig = { unrepresentable: 'any' } as const;

const jsonSchemaTransform = createJsonSchemaTransform({ zodToJsonConfig });
const jsonSchemaTransformObject = createJsonSchemaTransformObject({
  zodToJsonConfig,
});

type TransformInput = Parameters<typeof jsonSchemaTransform>[0];

const requestSchemaKeys = ['params', 'querystring', 'body', 'headers'] as const;

/** Whether a route schema declares at least one zod schema. */
const hasZodSchema = (schema: TransformInput['schema']): boolean => {
  if (!schema) return false;

  const record = schema as Record<string, unknown>;
  const responses = Object.values(
    (record.response as Record<string, unknown> | undefined) ?? {}
  );

  return [...requestSchemaKeys.map((key) => record[key]), ...responses].some(
    (value) => value instanceof $ZodType
  );
};

/**
 * Converts zod route schemas to JSON Schema; routes still declaring plain
 * JSON Schema (or nothing) are documented as-is.
 */
const mixedSchemaTransform = (document: TransformInput) =>
  hasZodSchema(document.schema)
    ? jsonSchemaTransform(document)
    : { schema: document.schema, url: document.url };

/**
 * Serves the OpenAPI 3.1 document and Swagger UI. Must be registered before
 * the routers so their routes are collected.
 */
export const registerOpenAPI = async (app: FastifyInstance): Promise<void> => {
  await app.register(fastifySwagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Intlayer API',
        description:
          'REST API of the Intlayer CMS. Routes are progressively described with typed schemas from `@intlayer/backend-contract`.',
        version: '1.0.0',
      },
      servers: process.env.BACKEND_URL
        ? [{ url: process.env.BACKEND_URL }]
        : [],
    },
    transform: mixedSchemaTransform,
    transformObject: jsonSchemaTransformObject,
  });

  await app.register(fastifySwaggerUI, { routePrefix: openAPIRoutePrefix });
};
