import {
  deleteAsset,
  getAssetById,
  getAssets,
  updateAsset,
  uploadAsset,
} from '@controllers/asset.controller';
import { assetContract } from '@intlayer/backend-contract/asset';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const assetRoute = assetContract.prefix;

export const assetRouter = async (fastify: FastifyInstance) => {
  // Accept raw image buffers for asset upload
  fastify.addContentTypeParser(
    /^image\//,
    { parseAs: 'buffer' },
    (_request, body, done) => done(null, body)
  );

  registerContractRoutes(fastify, assetContract, {
    getAssets,
    getAssetById,
    uploadAsset,
    updateAsset,
    deleteAsset,
  });
};
