'use client';

import type {
  AssetAPI,
  GetAssetByIdResult,
  GetAssetsResult,
} from '@intlayer/backend';
import {
  type UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useAssetAPI } from '../useIntlayerAPI';
import { useAuthEnable } from './utils';

/**
 * Query hook — returns all assets for the current session project.
 */
export const useGetAssets = (
  page?: number,
  pageSize?: number,
  options?: Partial<UseQueryOptions<GetAssetsResult>>
) => {
  const assetAPI = useAssetAPI();
  const { enable } = useAuthEnable({ requireUser: true });

  return useQuery<GetAssetsResult>({
    queryKey: ['assets', page, pageSize],
    queryFn: () => assetAPI.getAssets(page, pageSize),
    enabled: options?.enabled === false ? false : enable,
    ...options,
  });
};

/**
 * Query hook — returns a single asset by ID.
 */
export const useGetAssetById = (
  assetId: string,
  options?: Partial<UseQueryOptions<GetAssetByIdResult>>
) => {
  const assetAPI = useAssetAPI();
  const { enable } = useAuthEnable({ requireUser: true });

  return useQuery<GetAssetByIdResult>({
    queryKey: ['assets', assetId],
    queryFn: () => assetAPI.getAssetById(assetId),
    enabled: options?.enabled === false ? false : enable,
    ...options,
  });
};

/**
 * Mutation hook — uploads a new asset image.
 */
export const useUploadAsset = () => {
  const assetAPI = useAssetAPI();

  return useMutation({
    mutationKey: ['assets', 'upload'],
    mutationFn: ({
      file,
      alt,
      caption,
    }: {
      file: File;
      alt?: string;
      caption?: string;
    }) => assetAPI.uploadAsset(file, alt, caption),
    meta: {
      invalidateQueries: [['assets']],
    },
  });
};

/**
 * Mutation hook — updates asset metadata (name, alt text, caption).
 */
export const useUpdateAsset = () => {
  const assetAPI = useAssetAPI();

  return useMutation({
    mutationKey: ['assets', 'update'],
    mutationFn: ({
      assetId,
      originalName,
      alt,
      caption,
    }: {
      assetId: string;
      originalName?: string;
      alt?: string;
      caption?: string;
    }) => assetAPI.updateAsset(assetId, { originalName, alt, caption }),
    meta: {
      invalidateQueries: [['assets']],
    },
  });
};

/**
 * Mutation hook — deletes an asset by ID.
 */
export const useDeleteAsset = () => {
  const assetAPI = useAssetAPI();

  return useMutation({
    mutationKey: ['assets'],
    mutationFn: (assetId: string) => assetAPI.deleteAsset(assetId),
    meta: {
      invalidateQueries: [['assets']],
    },
  });
};
