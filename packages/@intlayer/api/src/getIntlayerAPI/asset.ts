import type {
  DeleteAssetResult,
  GetAssetByIdResult,
  GetAssetsResult,
  UpdateAssetResult,
  UploadAssetResult,
} from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getAssetAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL = intlayerConfig?.editor?.backendURL ?? editor.backendURL;

  const ASSET_API_ROUTE = `${backendURL}/api/assets`;

  /**
   * Retrieves all assets for the current session project, paginated.
   * @param page - Page number (1-based).
   * @param pageSize - Number of items per page.
   * @returns Paginated list of assets.
   */
  const getAssets = async (
    page?: number,
    pageSize?: number,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAssetsResult>(
      ASSET_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        params: {
          ...(page !== undefined && { page: String(page) }),
          ...(pageSize !== undefined && { pageSize: String(pageSize) }),
        },
      }
    );

  /**
   * Retrieves a single asset by ID.
   * @param assetId - The asset document ID.
   * @returns The asset.
   */
  const getAssetById = async (
    assetId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAssetByIdResult>(
      `${ASSET_API_ROUTE}/${assetId}`,
      authAPIOptions,
      otherOptions,
      { cache: 'no-store' }
    );

  /**
   * Uploads a new asset image.
   * @param file - The image File object.
   * @param alt - Optional alt text.
   * @param caption - Optional caption.
   * @returns The created asset record with its public URL.
   */
  const uploadAsset = async (
    file: File,
    alt?: string,
    caption?: string,
    otherOptions: FetcherOptions = {}
  ) => {
    const buffer = await file.arrayBuffer();

    const headers: Record<string, string> = {
      'Content-Type': file.type || 'image/jpeg',
      'X-File-Name': file.name,
    };

    if (alt) headers['X-Alt-Text'] = alt;
    if (caption) headers['X-Caption'] = caption;

    const authHeaders =
      (authAPIOptions.headers as Record<string, string> | undefined) ?? {};

    const response = await fetch(ASSET_API_ROUTE, {
      method: 'POST',
      credentials: 'include',
      headers: { ...authHeaders, ...headers },
      body: buffer,
      signal: otherOptions.signal as AbortSignal | undefined,
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(JSON.stringify(result.error) ?? 'Asset upload failed');
    }

    return (await response.json()) as UploadAssetResult;
  };

  /**
   * Updates mutable metadata (name, alt text, caption) of an asset.
   * @param assetId - The asset document ID.
   * @param data - Fields to update.
   * @returns The updated asset record.
   */
  const updateAsset = async (
    assetId: string,
    data: { originalName?: string; alt?: string; caption?: string },
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<UpdateAssetResult>(
      `${ASSET_API_ROUTE}/${assetId}`,
      authAPIOptions,
      otherOptions,
      { method: 'PATCH', body: data as unknown as Record<string, unknown> }
    );

  /**
   * Deletes an asset by ID.
   * @param assetId - The asset document ID.
   * @returns Confirmation response.
   */
  const deleteAsset = async (
    assetId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<DeleteAssetResult>(
      `${ASSET_API_ROUTE}/${assetId}`,
      authAPIOptions,
      otherOptions,
      { method: 'DELETE' }
    );

  return {
    getAssets,
    getAssetById,
    uploadAsset,
    updateAsset,
    deleteAsset,
  };
};

/**
 * Authenticated `asset` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const assetEndpoint = createEndpoint(getAssetAPI);
