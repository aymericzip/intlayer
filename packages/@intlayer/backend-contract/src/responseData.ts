import { z } from 'zod/mini';
import type { $ZodType } from 'zod/v4/core';

/** Error payload attached to failed responses. */
export const errorDataSchema = z.looseObject({
  code: z.string(),
  title: z.string(),
  message: z.string(),
});

/** Wraps a data schema in the backend `ResponseData<T>` envelope. */
export const responseDataSchema = <DataSchema extends $ZodType>(
  data: DataSchema
) =>
  z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.optional(z.string()),
    description: z.optional(z.string()),
    data: z.nullable(data),
    error: z.optional(z.union([errorDataSchema, z.array(errorDataSchema)])),
  });

/** Wraps an item schema in the backend `PaginatedResponse<T>` envelope. */
export const paginatedResponseSchema = <ItemSchema extends $ZodType>(
  item: ItemSchema
) =>
  z.object({
    ...responseDataSchema(z.array(item)).shape,
    page: z.nullable(z.number()),
    page_size: z.nullable(z.number()),
    total_pages: z.nullable(z.number()),
    total_items: z.nullable(z.number()),
  });

/** Error payload attached to failed responses. */
export type ErrorData = z.output<typeof errorDataSchema>;

/** Envelope of every backend response. */
export type ResponseData<Data = null> = {
  message?: string;
  description?: string;
  success: boolean;
  status: number;
  data: Data | null;
  error?: ErrorData | ErrorData[];
};

/** Envelope of paginated list responses. */
export type PaginatedResponse<Item = undefined> = Omit<
  ResponseData<Item>,
  'data'
> & {
  data: Item[] | null;
  page: number | null;
  page_size: number | null;
  total_pages: number | null;
  total_items: number | null;
};
