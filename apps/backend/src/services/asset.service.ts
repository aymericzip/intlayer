import { AssetModel } from '@schemas/asset.schema';
import { GenericError } from '@utils/errors';
import type { Asset, AssetDocument } from '@/types/asset.types';

export type CreateAssetData = Pick<
  Asset,
  | 'projectId'
  | 'originalName'
  | 'mimeType'
  | 'size'
  | 's3Key'
  | 'publicUrl'
  | 'uploadedBy'
> &
  Partial<Pick<Asset, 'alt' | 'caption'>>;

export type FindAssetsFilters = {
  projectId: string;
  page?: number;
  pageSize?: number;
};

/**
 * Creates a new asset record after the file has been uploaded to S3.
 */
export const createAsset = async (
  data: CreateAssetData
): Promise<AssetDocument> => {
  const asset = await AssetModel.create(data);
  return asset as unknown as AssetDocument;
};

/**
 * Returns paginated assets belonging to a project.
 */
export const findAssets = async (
  filters: FindAssetsFilters
): Promise<{
  data: AssetDocument[];
  totalItems: number;
  totalPages: number;
}> => {
  const { projectId, page = 1, pageSize = 20 } = filters;

  const query = { projectId };
  const totalItems = await AssetModel.countDocuments(query);
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const data = await AssetModel.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean();

  return {
    data: data as unknown as AssetDocument[],
    totalItems,
    totalPages,
  };
};

/**
 * Returns a single asset by ID, scoped to a project for safety.
 */
export const getAssetById = async (
  assetId: string,
  projectId: string
): Promise<AssetDocument> => {
  const asset = await AssetModel.findOne({
    _id: assetId,
    projectId,
  }).lean();

  if (!asset) {
    throw new GenericError('BLOG_ASSET_NOT_FOUND', { assetId });
  }

  return asset as unknown as AssetDocument;
};

export type UpdateAssetData = Partial<
  Pick<Asset, 'originalName' | 'alt' | 'caption'>
>;

/**
 * Updates mutable metadata fields (name, alt, caption) for an asset.
 */
export const updateAsset = async (
  assetId: string,
  projectId: string,
  data: UpdateAssetData
): Promise<AssetDocument> => {
  const asset = await AssetModel.findOneAndUpdate(
    { _id: assetId, projectId },
    { $set: data },
    { new: true }
  ).lean();

  if (!asset) {
    throw new GenericError('BLOG_ASSET_NOT_FOUND', { assetId });
  }

  return asset as unknown as AssetDocument;
};

/**
 * Deletes an asset record from MongoDB and returns its s3Key so the
 * caller can remove the file from S3.
 */
export const deleteAsset = async (
  assetId: string,
  projectId: string
): Promise<{ s3Key: string }> => {
  const asset = await AssetModel.findOneAndDelete({
    _id: assetId,
    projectId,
  });

  if (!asset) {
    throw new GenericError('BLOG_ASSET_NOT_FOUND', { assetId });
  }

  return { s3Key: (asset as unknown as Asset).s3Key };
};
