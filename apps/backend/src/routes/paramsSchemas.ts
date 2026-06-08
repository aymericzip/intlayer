/**
 * Shared JSON Schema fragments for URL `params` validation.
 *
 * These are consumed by Fastify's built-in ajv validator via the
 * `{ schema: { params: ... } }` option on route definitions. Invalid
 * requests are rejected with a 400 response before the handler runs.
 */

const OBJECT_ID_PATTERN = '^[a-fA-F0-9]{24}$';

const objectIdProperty = {
  type: 'string',
  pattern: OBJECT_ID_PATTERN,
} as const;

export const userIdParamsSchema = {
  type: 'object',
  required: ['userId'],
  properties: { userId: objectIdProperty },
} as const;

export const emailParamsSchema = {
  type: 'object',
  required: ['email'],
  properties: { email: { type: 'string', format: 'email' } },
} as const;

export const organizationIdParamsSchema = {
  type: 'object',
  required: ['organizationId'],
  properties: { organizationId: objectIdProperty },
} as const;

export const projectIdParamsSchema = {
  type: 'object',
  required: ['projectId'],
  properties: { projectId: objectIdProperty },
} as const;

export const dictionaryIdParamsSchema = {
  type: 'object',
  required: ['dictionaryId'],
  properties: { dictionaryId: objectIdProperty },
} as const;

export const dictionaryKeyParamsSchema = {
  type: 'object',
  required: ['dictionaryKey'],
  properties: {
    dictionaryKey: { type: 'string', minLength: 1, maxLength: 255 },
  },
} as const;

export const environmentIdParamsSchema = {
  type: 'object',
  required: ['environmentId'],
  properties: { environmentId: objectIdProperty },
} as const;

export const tagIdParamsSchema = {
  type: 'object',
  required: ['tagId'],
  properties: { tagId: objectIdProperty },
} as const;

export const jobIdParamsSchema = {
  type: 'object',
  required: ['jobId'],
  properties: { jobId: { type: 'string', minLength: 1 } },
} as const;

export const accessTokenParamsSchema = {
  type: 'object',
  required: ['accessToken'],
  properties: { accessToken: { type: 'string', minLength: 1 } },
} as const;
