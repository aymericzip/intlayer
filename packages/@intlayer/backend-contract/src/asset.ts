import { z } from 'zod/mini';
import { dateTimeSchema, objectIdSchema, paginationQueryShape } from './common';
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

/** Image uploaded to a project (served from the CDN). */
export const assetSchema = z.looseObject({
  id: z.string(),
  projectId: z.string(),
  /** Original file name as provided by the uploader. */
  originalName: z.string(),
  /** MIME type (ex: `image/jpeg`). */
  mimeType: z.string(),
  /** File size in bytes. */
  size: z.number(),
  /** S3 object key. */
  s3Key: z.string(),
  /** Publicly accessible CDN URL. */
  publicUrl: z.string(),
  alt: z.optional(z.string()),
  caption: z.optional(z.string()),
  uploadedBy: z.string(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
});

const assetIdParamsSchema = z.object({ assetId: objectIdSchema });
const assetResponseSchema = responseDataSchema(assetSchema);

/** REST contract of the `/api/assets` routes (scoped to the selected project). */
export const assetContract = defineRouteGroup({
  prefix: '/api/assets',
  tag: 'Asset',
  routes: {
    getAssets: defineRoute({
      method: 'GET',
      path: '/',
      summary: 'List the assets of the selected project',
      schemas: {
        querystring: z.object(paginationQueryShape),
        response: { 200: paginatedResponseSchema(assetSchema) },
      },
    }),
    getAssetById: defineRoute({
      method: 'GET',
      path: '/:assetId',
      summary: 'Get an asset',
      schemas: {
        params: assetIdParamsSchema,
        response: { 200: assetResponseSchema },
      },
    }),
    uploadAsset: defineRoute({
      method: 'POST',
      path: '/',
      summary: 'Upload an image (raw `image/*` body)',
      schemas: {
        response: { 200: assetResponseSchema },
      },
    }),
    updateAsset: defineRoute({
      method: 'PATCH',
      path: '/:assetId',
      summary: 'Update the metadata of an asset',
      schemas: {
        params: assetIdParamsSchema,
        body: z.object({
          originalName: z.optional(z.string()),
          alt: z.optional(z.string()),
          caption: z.optional(z.string()),
        }),
        response: { 200: assetResponseSchema },
      },
    }),
    deleteAsset: defineRoute({
      method: 'DELETE',
      path: '/:assetId',
      summary: 'Delete an asset (database and CDN)',
      schemas: {
        params: assetIdParamsSchema,
        response: { 200: responseDataSchema(z.null()) },
      },
    }),
  },
});

/** Route definitions of the `/api/assets` group, by name. */
export type AssetRoutes = (typeof assetContract)['routes'];

export type AssetAPI = z.output<typeof assetSchema>;
export type GetAssetsResult = PaginatedResponse<AssetAPI>;
export type GetAssetByIdResult = ResponseData<AssetAPI>;
export type UploadAssetResult = ResponseData<AssetAPI>;
export type UpdateAssetBody = RouteBodyInput<AssetRoutes['updateAsset']>;
export type UpdateAssetResult = ResponseData<AssetAPI>;
export type DeleteAssetResult = ResponseData<null>;
