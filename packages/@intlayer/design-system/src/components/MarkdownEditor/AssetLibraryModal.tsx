'use client';

import { useGetAssets, useUploadAsset } from '@api/index';
import type { AssetAPI } from '@intlayer/backend-contract/asset';
import { cn } from '@utils/cn';
import { Upload } from 'lucide-react';
import { type ChangeEvent, type FC, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { Modal } from '../Modal';
import { Pagination } from '../Pagination';

const ASSET_PAGE_SIZE = 12;

const ACCEPTED_IMAGE_TYPES =
  'image/jpeg,image/png,image/webp,image/gif,image/svg+xml';

export type AssetLibraryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Called with the picked asset. The modal does not close by itself. */
  onSelect: (asset: AssetAPI) => void;
};

/**
 * Modal listing the project's uploaded assets (the dashboard "Assets" page),
 * letting the user pick one or upload a new one.
 */
export const AssetLibraryModal: FC<AssetLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const {
    assetLibraryTitle,
    assetLibraryEmpty,
    assetLibraryUpload,
    assetLibraryUploading,
  } = useIntlayer('markdown-editor');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);

  const { data: assetsResponse, isLoading } = useGetAssets(
    page,
    ASSET_PAGE_SIZE,
    { enabled: isOpen }
  );
  const uploadMutation = useUploadAsset();

  const assets: AssetAPI[] = assetsResponse?.data ?? [];
  const totalPages = assetsResponse?.total_pages ?? 1;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    uploadMutation.mutate(
      { file },
      {
        onSuccess: (response) => {
          if (response.data) onSelect(response.data);
        },
      }
    );
  };

  const uploadLabel = uploadMutation.isPending
    ? assetLibraryUploading.value
    : assetLibraryUpload.value;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={assetLibraryTitle.value}
      hasCloseButton
      size="lg"
      padding="md"
      isScrollable
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            color="text"
            size="sm"
            Icon={Upload}
            label={uploadLabel}
            isLoading={uploadMutation.isPending}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadLabel}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex min-h-40 items-center justify-center">
            <Loader />
          </div>
        ) : assets.length === 0 ? (
          <p className="py-10 text-center text-neutral text-sm dark:text-neutral-dark">
            {assetLibraryEmpty}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {assets.map((asset) => (
              <button
                key={String(asset.id)}
                type="button"
                title={asset.originalName}
                onClick={() => onSelect(asset)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral text-start transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-text"
              >
                <span className="flex h-28 w-full items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-900">
                  <img
                    src={asset.publicUrl}
                    alt={asset.alt ?? asset.originalName}
                    loading="lazy"
                    className={cn(
                      'size-full',
                      asset.mimeType === 'image/svg+xml'
                        ? 'object-contain p-2'
                        : 'object-cover'
                    )}
                  />
                </span>
                <span className="truncate p-2 font-medium text-xs">
                  {asset.originalName}
                </span>
              </button>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mx-auto"
          />
        )}
      </div>
    </Modal>
  );
};
