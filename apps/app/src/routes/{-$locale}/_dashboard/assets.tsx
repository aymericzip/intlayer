import type { AssetAPI } from '@intlayer/backend';
import {
  useDeleteAsset,
  useGetAssets,
  useUpdateAsset,
  useUploadAsset,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyButton } from '@intlayer/design-system/copy-button';
import { Input } from '@intlayer/design-system/input';
import { Loader } from '@intlayer/design-system/loader';
import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  App_Dashboard,
  App_Dashboard_Assets_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { Pencil, Trash2, Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { useSearchParamState } from '#hooks/useSearchParamState';

const searchParams = {
  page: { type: 'number', fallbackValue: 1 },
  pageSize: { type: 'number', fallbackValue: 20 },
} as const;

export const Route = createFileRoute('/{-$locale}/_dashboard/assets')({
  component: AssetsPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('assets-dashboard-page', locale);

    return {
      links: [
        {
          rel: 'canonical',
          href: getLocalizedUrl(App_Dashboard_Assets_Path, locale),
        },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(App_Dashboard_Assets_Path, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(App_Dashboard_Assets_Path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
        { name: 'description', content: content.metadata.description },
      ],
    };
  },
});

const ACCEPTED_TYPES =
  'image/jpeg,image/png,image/webp,image/gif,image/svg+xml';

function AssetsPage() {
  const {
    title,
    uploadButton,
    deleteConfirm,
    cancelLabel,
    confirmLabel,
    emptyState,
    uploading,
  } = useIntlayer('assets-dashboard-page');
  const { locale } = useLocale();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { params, setParam, setParams } = useSearchParamState(searchParams);

  const { data: assetsResponse, isLoading } = useGetAssets(
    params.page,
    params.pageSize
  );
  const uploadMutation = useUploadAsset();
  const deleteMutation = useDeleteAsset();
  const updateMutation = useUpdateAsset();

  const assets: AssetAPI[] =
    (assetsResponse?.data as AssetAPI[] | null | undefined) ?? [];

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      uploadMutation.mutate({ file });
      event.target.value = '';
    },
    [uploadMutation]
  );

  const handleDeleteRequest = useCallback((assetId: string) => {
    setPendingDeleteId(assetId);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!pendingDeleteId) return;
    deleteMutation.mutate(pendingDeleteId);
    setPendingDeleteId(null);
  }, [deleteMutation, pendingDeleteId]);

  const handleDeleteCancel = useCallback(() => {
    setPendingDeleteId(null);
  }, []);

  const handleRename = useCallback(
    (assetId: string, originalName: string) => {
      updateMutation.mutate({ assetId, originalName });
    },
    [updateMutation]
  );

  return (
    <AuthenticationBarrier
      accessRule={['authenticated', 'project-required']}
      locale={locale}
      redirectionRoute={App_Dashboard}
    >
      <DashboardContentLayout title={title}>
        <div className="flex w-full flex-1 flex-col gap-6 p-6 md:p-10">
          {/* Upload bar */}
          <div className="flex items-center justify-between">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES}
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="default"
              size="md"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadMutation.isPending}
              label={
                uploadMutation.isPending
                  ? String(uploading)
                  : String(uploadButton)
              }
              Icon={Upload}
            >
              {uploadMutation.isPending
                ? String(uploading)
                : String(uploadButton)}
            </Button>
          </div>

          {/* Inline delete confirmation banner */}
          {pendingDeleteId && (
            <Container
              border
              borderColor="error"
              roundedSize="lg"
              padding="md"
              className="flex-row items-center justify-between gap-4"
            >
              <span className="text-sm">{deleteConfirm}</span>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  color="error"
                  size="sm"
                  label={String(confirmLabel)}
                  onClick={handleDeleteConfirm}
                  isLoading={deleteMutation.isPending}
                >
                  {confirmLabel}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  label={String(cancelLabel)}
                  onClick={handleDeleteCancel}
                >
                  {cancelLabel}
                </Button>
              </div>
            </Container>
          )}

          {/* Asset grid */}
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader />
            </div>
          ) : assets.length === 0 ? (
            <div className="flex-1 items-center justify-center">
              <p className="text-neutral text-sm dark:text-neutral-dark">
                {emptyState}
              </p>
            </div>
          ) : (
            <>
              <div className="mt-10 grid grid-cols-2 gap-4 px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {assets.map((asset) => {
                  const assetId = String(asset.id);
                  return (
                    <AssetCard
                      key={assetId}
                      asset={asset}
                      isDeleting={
                        deleteMutation.isPending &&
                        deleteMutation.variables === assetId
                      }
                      isRenaming={
                        updateMutation.isPending &&
                        updateMutation.variables?.assetId === assetId
                      }
                      onDelete={handleDeleteRequest}
                      onRename={handleRename}
                    />
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="mt-6 flex w-full flex-row items-end justify-between px-10">
                <div className="flex flex-col gap-4">
                  <ShowingResultsNumberItems
                    currentPage={params.page}
                    pageSize={params.pageSize}
                    totalItems={assetsResponse?.total_items ?? 0}
                  />
                  <NumberItemsSelector
                    value={params.pageSize.toString()}
                    onValueChange={(val) =>
                      setParams({ pageSize: Number(val), page: 1 })
                    }
                  />
                </div>
                <Pagination
                  currentPage={params.page}
                  totalPages={assetsResponse?.total_pages ?? 1}
                  onPageChange={(page) => setParam('page', page)}
                />
              </div>
            </>
          )}
        </div>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}

type AssetCardProps = {
  asset: AssetAPI;
  isDeleting: boolean;
  isRenaming: boolean;
  onDelete: (assetId: string) => void;
  onRename: (assetId: string, originalName: string) => void;
};

const AssetCard = ({
  asset,
  isDeleting,
  isRenaming,
  onDelete,
  onRename,
}: AssetCardProps) => {
  const { renameLabel, deleteLabel } = useIntlayer('assets-dashboard-page');

  const assetId = String(asset.id);
  const sizeKb = Math.round(asset.size / 1024);

  const [renameValue, setRenameValue] = useState(asset.originalName);
  const [isEditingName, setIsEditingName] = useState(false);

  const handleRenameSubmit = useCallback(() => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== asset.originalName) {
      onRename(assetId, trimmed);
    }
    setIsEditingName(false);
  }, [renameValue, asset.originalName, onRename, assetId]);

  const handleRenameKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') handleRenameSubmit();
      if (event.key === 'Escape') {
        setRenameValue(asset.originalName);
        setIsEditingName(false);
      }
    },
    [handleRenameSubmit, asset.originalName]
  );

  return (
    <PopoverStatic identifier={`asset-${assetId}`}>
      <Container
        border
        borderColor="neutral"
        roundedSize="2xl"
        className="w-full overflow-hidden p-0.5 transition-shadow hover:shadow-md"
      >
        {/* Thumbnail */}
        <Container
          roundedSize="xl"
          transparency="none"
          className="flex h-36 items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-900"
        >
          <img
            src={asset.publicUrl}
            alt={asset.alt ?? asset.originalName}
            className={
              asset.mimeType === 'image/svg+xml'
                ? 'h-full w-full object-contain p-2'
                : 'h-full w-full object-cover'
            }
            loading="lazy"
          />
        </Container>

        {/* Info */}
        <div className="flex flex-col gap-1 p-2">
          {isEditingName ? (
            <Input
              autoFocus
              value={renameValue}
              size="sm"
              variant="invisible"
              className="w-full truncate font-medium text-xs"
              onChange={(event) => setRenameValue(event.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleRenameKeyDown}
            />
          ) : (
            <p
              className="truncate font-medium text-xs"
              title={asset.originalName}
            >
              {isRenaming ? renameValue : asset.originalName}
            </p>
          )}
          <p className="text-neutral text-xs dark:text-neutral-dark">
            {sizeKb} KB
          </p>
        </div>
      </Container>

      {/* Hover actions popover */}
      <PopoverStatic.Detail
        identifier={`asset-${assetId}`}
        xAlign="center"
        yAlign="above"
        displayArrow={false}
        padding="sm"
        gap="sm"
        className="flex-row"
      >
        <CopyButton
          content={asset.publicUrl}
          variant="hoverable"
          color="text"
          size="icon-md"
        />
        <Button
          variant="hoverable"
          color="text"
          size="icon-md"
          Icon={Pencil}
          label={String(renameLabel)}
          isLoading={isRenaming}
          onClick={() => setIsEditingName(true)}
        />
        <Button
          variant="hoverable"
          color="error"
          size="icon-md"
          Icon={Trash2}
          label={String(deleteLabel)}
          isLoading={isDeleting}
          onClick={() => onDelete(assetId)}
        />
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
