import { usePushDictionaries, useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Checkbox, SearchInput } from '@intlayer/design-system/input';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  type DictionaryContent,
  type EditorStateManager,
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from '@intlayer/editor';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { Blend, Columns, Filter, Plus, Trash2, Upload } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import {
  DashboardRightPanelId,
  useDashboardRightPanel,
} from '#hooks/useDashboardRightPanel';
import type { DataTableInstance } from '#utils/reactTable';
import type { useDictionaryDashboard } from './useDictionaryDashboard';

interface DictionaryToolbarProps {
  dashboard: ReturnType<typeof useDictionaryDashboard>;
  table: DataTableInstance<Dictionary>;
}

export const DictionaryToolbar: FC<DictionaryToolbarProps> = ({
  dashboard,
  table,
}) => {
  const content = useIntlayer('dictionary-list');
  const { params, setParam, state } = dashboard;
  const { session } = useSession();
  const hasDictionaryWritePermission =
    (session?.permissions?.includes('dictionary:admin') ||
      session?.permissions?.includes('dictionary:write')) ??
    false;

  const { register } = useForm({ defaultValues: { search: params.search } });

  const { isOpen: checkIsOpen } = useDashboardRightPanel();
  const isEditorSidebarOpen = checkIsOpen(DashboardRightPanelId.VisualEditor);

  const [editorManager, setEditorManager] = useState<EditorStateManager | null>(
    () => getGlobalEditorManager()
  );
  const [unmergedDictionaries, setUnmergedDictionaries] = useState<
    Dictionary[]
  >(() => {
    const mgr = getGlobalEditorManager();
    return mgr?.localeDictionaries.value
      ? (Object.values(mgr.localeDictionaries.value) as unknown as Dictionary[])
      : [];
  });

  const { mutateAsync: pushDictionaries, isPending: isPushing } =
    usePushDictionaries();

  useEffect(() => {
    const updateFromManager = (mgr: EditorStateManager | null) => {
      setEditorManager(mgr);
      setUnmergedDictionaries(
        mgr?.localeDictionaries.value
          ? (Object.values(
              mgr.localeDictionaries.value
            ) as unknown as Dictionary[])
          : []
      );
    };

    updateFromManager(getGlobalEditorManager());

    return onGlobalEditorManagerChange(updateFromManager);
  }, []);

  useEffect(() => {
    if (!editorManager) return;

    const handleDictionariesChange = (e: Event) => {
      const detail = (e as CustomEvent<DictionaryContent>).detail;
      setUnmergedDictionaries(
        detail ? (Object.values(detail) as unknown as Dictionary[]) : []
      );
    };

    editorManager.localeDictionaries.addEventListener(
      'change',
      handleDictionariesChange
    );

    return () => {
      editorManager.localeDictionaries.removeEventListener(
        'change',
        handleDictionariesChange
      );
    };
  }, [editorManager]);

  const hasLoadedDictionaries = unmergedDictionaries.length > 0;
  const isPushUnmergedVisible = isEditorSidebarOpen && hasLoadedDictionaries;

  const handlePushUnmergedDictionaries = async () => {
    if (!unmergedDictionaries.length) return;

    try {
      const dictionariesToPush = unmergedDictionaries.map((dictionary) => {
        const edited =
          editorManager?.editedContent.value?.[
            dictionary.localId as LocalDictionaryId
          ];
        return edited
          ? ({ ...dictionary, ...edited } as Dictionary)
          : dictionary;
      });

      await pushDictionaries({
        dictionaries: dictionariesToPush,
      });

      if (editorManager) {
        editorManager.editedContent.set({});
      }

      dashboard.actions.refetch();
    } catch {
      // Error toasts are handled globally by ReactQueryProvider
    }
  };

  const selectedCount = Object.keys(state.rowSelection).length;

  const hasAppliedFilters =
    params.location !== 'none' ||
    (!dashboard.fixedTag && !!params.tags) ||
    !!params.type;
  const activeTags =
    !dashboard.fixedTag && params.tags
      ? (params.tags as string).split(',')
      : [];
  const activeLocations =
    params.location === 'none'
      ? []
      : params.location === 'both'
        ? ['remote', 'local']
        : params.location === 'remote'
          ? ['remote']
          : ['local'];
  const appliedFiltersCount = activeTags.length + activeLocations.length;

  return (
    <div className="flex items-center justify-between gap-4 px-10">
      <div className="flex max-w-md flex-1 items-center gap-4">
        <SearchInput
          placeholder={content.searchPlaceholder.value}
          {...register('search', {
            onChange: (e) => setParam('search', e.target.value),
          })}
        />

        <div className="flex items-center gap-0.5">
          <PopoverStatic identifier="dictionary-filters">
            <Button
              variant="hoverable"
              color="text"
              size="icon-lg"
              onClick={() => state.setIsFiltersModalOpen(true)}
              Icon={Filter}
              label={content.filterLabels.button.value}
            />
            <PopoverStatic.Detail identifier="dictionary-filters">
              <Container className="p-3" roundedSize="xl">
                <p>{content.filterLabels.popover}</p>
              </Container>
            </PopoverStatic.Detail>
          </PopoverStatic>
          {hasAppliedFilters && (
            <span className="absolute -inset-e-1 -top-1 flex size-4 items-center justify-center rounded-full bg-text text-card text-xs">
              {appliedFiltersCount}
            </span>
          )}

          <PopoverStatic identifier="dictionary-columns">
            <Button
              variant="hoverable"
              color="text"
              size="icon-lg"
              Icon={Columns}
              label={content.selectColumns.value}
            />
            <PopoverStatic.Detail identifier="dictionary-columns">
              <Container className="flex flex-col gap-2 p-3" roundedSize="xl">
                <p className="mb-2 font-bold">{content.visibleColumns}</p>
                {table
                  .getAllLeafColumns()
                  .filter((column: any) => column.getCanHide())
                  .map((column: any) => (
                    <div
                      key={column.id}
                      className="flex items-center gap-2 p-2"
                    >
                      <Checkbox
                        id={`col-${column.id}`}
                        name={`col-${column.id}`}
                        color="text"
                        checked={column.getIsVisible()}
                        onChange={() => column.toggleVisibility()}
                        size="sm"
                      />
                      <label
                        htmlFor={`col-${column.id}`}
                        className="cursor-pointer"
                      >
                        {column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                      </label>
                    </div>
                  ))}
              </Container>
            </PopoverStatic.Detail>
          </PopoverStatic>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <Button
            color="error"
            variant="outline"
            Icon={Trash2}
            label={content.deleteSelectedButton.label.value}
            disabled={!hasDictionaryWritePermission}
            onClick={() => {
              const ids = table
                .getSelectedRowModel()
                .rows.map((r: any) => r.original.id || r.original.key);
              state.setDictionaryToDelete(ids);
            }}
          >
            {content.deleteSelectedButton.text} ({selectedCount})
          </Button>
        )}

        {dashboard.data.duplicatePairs.length > 0 && (
          <PopoverStatic identifier="merge-duplicates-toolbar">
            <Button
              Icon={Blend}
              color="text"
              variant="outline"
              label={content.mergeDuplicatesButton.label.value}
              disabled={!hasDictionaryWritePermission}
              onClick={() => state.setIsMergeModalOpen(true)}
            >
              {content.mergeDuplicatesButton.text({
                count: dashboard.data.duplicatePairs.length,
              })}
            </Button>
            <PopoverStatic.Detail
              xAlign="end"
              identifier="merge-duplicates-toolbar"
            >
              <Container className="p-3">
                <p>{content.mergeDuplicatesButton.popover}</p>
              </Container>
            </PopoverStatic.Detail>
          </PopoverStatic>
        )}

        {isPushUnmergedVisible && (
          <PopoverStatic identifier="push-dictionaries-toolbar">
            <Button
              Icon={Upload}
              color="text"
              variant="outline"
              label={content.pushUnmergedDictionariesButton.label.value}
              disabled={!hasDictionaryWritePermission || isPushing}
              isLoading={isPushing}
              onClick={handlePushUnmergedDictionaries}
            >
              {content.pushUnmergedDictionariesButton.text} (
              {unmergedDictionaries.length})
            </Button>
            <PopoverStatic.Detail
              xAlign="end"
              identifier="push-dictionaries-toolbar"
            >
              <Container className="p-3">
                <p>{content.pushUnmergedDictionariesButton.popover}</p>
              </Container>
            </PopoverStatic.Detail>
          </PopoverStatic>
        )}

        <PopoverStatic identifier="create-dictionary-toolbar">
          <Button
            Icon={Plus}
            color="text"
            label={content.createDictionaryButton.label.value}
            disabled={!hasDictionaryWritePermission}
            onClick={() => state.setIsCreationModalOpen(true)}
          >
            {content.createDictionaryButton.text}
          </Button>
          <PopoverStatic.Detail
            xAlign="end"
            identifier="create-dictionary-toolbar"
          >
            <Container className="p-3">
              <p>{content.createDictionaryButton.popover}</p>
            </Container>
          </PopoverStatic.Detail>
        </PopoverStatic>
      </div>
    </div>
  );
};
