import {
  deleteAsset,
  getAssetById,
  getAssets,
  updateAsset,
  uploadAsset,
} from '@controllers/asset.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const assetRoute = '/api/assets';

const baseURL = () => `${process.env.BACKEND_URL}${assetRoute}`;

export const getAssetRoutes = () =>
  ({
    getAssets: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    getAssetById: {
      urlModel: '/:assetId',
      url: ({ assetId }: { assetId: string }) => `${baseURL()}/${assetId}`,
      method: 'GET',
    },
    uploadAsset: {
      urlModel: '/',
      url: baseURL(),
      method: 'POST',
    },
    updateAsset: {
      urlModel: '/:assetId',
      url: ({ assetId }: { assetId: string }) => `${baseURL()}/${assetId}`,
      method: 'PATCH',
    },
    deleteAsset: {
      urlModel: '/:assetId',
      url: ({ assetId }: { assetId: string }) => `${baseURL()}/${assetId}`,
      method: 'DELETE',
    },
  }) satisfies Routes;

export const assetRouter = async (fastify: FastifyInstance) => {
  // Accept raw image buffers for asset upload
  fastify.addContentTypeParser(
    /^image\//,
    { parseAs: 'buffer' },
    (_req, body, done) => done(null, body)
  );

  fastify.get(getAssetRoutes().getAssets.urlModel, getAssets);
  fastify.get(getAssetRoutes().getAssetById.urlModel, getAssetById);
  fastify.post(getAssetRoutes().uploadAsset.urlModel, uploadAsset);
  fastify.patch(getAssetRoutes().updateAsset.urlModel, updateAsset);
  fastify.delete(getAssetRoutes().deleteAsset.urlModel, deleteAsset);
};
