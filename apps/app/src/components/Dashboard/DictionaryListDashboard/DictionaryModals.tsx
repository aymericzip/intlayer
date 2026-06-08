import { Modal } from '@intlayer/design-system/modal';
import { type FC, lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { useDictionaryDashboard } from './useDictionaryDashboard';

const DictionaryCreationForm = lazy(() =>
  import('@intlayer/design-system/dictionary-field-editor').then((m) => ({
    default: m.DictionaryCreationForm,
  }))
);

const DeleteDictionaryModal = lazy(() =>
  import('./DeleteDictionaryModal').then((m) => ({
    default: m.DeleteDictionaryModal,
  }))
);

const DictionaryDetailModal = lazy(() =>
  import('./DictionaryDetailModal').then((m) => ({
    default: m.DictionaryDetailModal,
  }))
);

const FiltersModal = lazy(() =>
  import('./FiltersModal').then((m) => ({ default: m.FiltersModal }))
);

const MergeDictionariesModal = lazy(() =>
  import('./MergeDictionariesModal').then((m) => ({
    default: m.MergeDictionariesModal,
  }))
);

type DictionaryModalsProps = {
  dashboard: ReturnType<typeof useDictionaryDashboard>;
};

export const DictionaryModals: FC<DictionaryModalsProps> = ({ dashboard }) => {
  const content = useIntlayer('dictionary-list');
  const { state, actions, params, setParam, setParams } = dashboard;

  return (
    <>
      <Modal
        isOpen={state.isCreationModalOpen}
        onClose={() => state.setIsCreationModalOpen(false)}
        padding="md"
        hasCloseButton
        title={content.createDictionaryButton.label.value}
      >
        <Suspense>
          <DictionaryCreationForm
            onDictionaryCreated={() => {
              state.setIsCreationModalOpen(false);
              actions.refetch();
            }}
          />
        </Suspense>
      </Modal>

      <Suspense>
        <DeleteDictionaryModal
          isOpen={!!state.dictionaryToDelete}
          onClose={() => state.setDictionaryToDelete(null)}
          onConfirm={actions.onConfirmDelete}
          isDeleting={state.isDeleting}
          count={
            Array.isArray(state.dictionaryToDelete)
              ? state.dictionaryToDelete.length
              : 1
          }
          dictionaryKeys={
            state.dictionaryToDelete
              ? (Array.isArray(state.dictionaryToDelete)
                  ? state.dictionaryToDelete
                  : [state.dictionaryToDelete]
                )
                  .map((idOrKey) => {
                    const dict = dashboard.data.dictionaries.find(
                      (d: { id?: string; key: string }) =>
                        d.id === idOrKey || d.key === idOrKey
                    );
                    return dict ? dict.key : idOrKey;
                  })
                  .filter(Boolean)
                  .join(', ')
              : ''
          }
        />
      </Suspense>

      <Suspense>
        <DictionaryDetailModal
          isOpen={!!state.editingDictionaryKey}
          onClose={() => state.setEditingDictionaryKey(null)}
          dictionaryKey={state.editingDictionaryKey}
        />
      </Suspense>

      <Suspense>
        <FiltersModal
          isOpen={state.isFiltersModalOpen}
          onClose={() => state.setIsFiltersModalOpen(false)}
          params={params}
          setParam={setParam}
          setParams={setParams}
        />
      </Suspense>

      <Suspense>
        <MergeDictionariesModal
          isOpen={state.isMergeModalOpen}
          onClose={() => state.setIsMergeModalOpen(false)}
          pairs={dashboard.data.duplicatePairs}
          onConfirm={actions.onConfirmMerge}
          isMerging={state.isMerging}
        />
      </Suspense>
    </>
  );
};
