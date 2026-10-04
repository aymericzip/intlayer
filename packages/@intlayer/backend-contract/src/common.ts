import { z } from 'zod/mini';

/** 24-character hexadecimal MongoDB ObjectId, serialized as a string. */
export const objectIdSchema = z.string().check(z.regex(/^[a-fA-F0-9]{24}$/));

/**
 * Query string value that may be repeated (`?id=a&id=b`): Fastify parses it
 * as a single string or as an array of strings.
 */
export const repeatableQueryValueSchema = z.union([
  z.string(),
  z.array(z.string()),
]);

/** Pagination fields shared by every paginated list endpoint. */
export const paginationQueryShape = {
  page: z.optional(z.union([z.string(), z.number()])),
  pageSize: z.optional(z.union([z.string(), z.number()])),
};

/** Date serialized by `JSON.stringify` (ISO 8601). */
export const dateTimeSchema = z.string();

/**
 * String narrowed to a type owned by another package (ex: `Locale` from
 * `@intlayer/types`), without duplicating its values. Validated and
 * documented as a plain string.
 */
export const typedStringSchema = <Value extends string>() =>
  z.custom<Value>((value) => typeof value === 'string');

/**
 * Value whose type is owned by another package (ex: AI configuration or
 * dictionaries from `@intlayer/types`), documented as any JSON value.
 * @param isValid - Optional shallow runtime check (defaults to accept all).
 */
export const typedValueSchema = <Value>(
  isValid: (value: unknown) => boolean = () => true
) => z.custom<Value>(isValid);

/** Whether a value is a plain JSON object (not null, not an array). */
export const isJSONObject = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
