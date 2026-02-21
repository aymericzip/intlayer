import { DictionaryCreationForm, Modal } from '@intlayer/design-system';
import type { FC } from 'react';
import { DeleteDictionaryModal } from './DeleteDictionaryModal';
import { DictionaryDetailModal } from './DictionaryDetailModal';
import { FiltersModal } from './FiltersModal';
import type { useDictionaryDashboard } from './useDictionaryDashboard';

interface DictionaryModalsProps {
  dashboard: ReturnType<typeof useDictionaryDashboard>;
}

export const DictionaryModals: FC<DictionaryModalsProps> = ({ dashboard }) => {
  const { state, actions, content, params, setParam, setParams } = dashboard;

  return (
    <>
      <Modal
        isOpen={state.isCreationModalOpen}
        onClose={() => state.setIsCreationModalOpen(false)}
        padding="md"
        hasCloseButton
      >
        <DictionaryCreationForm
          onDictionaryCreated={() => {
            state.setIsCreationModalOpen(false);
            actions.refetch();
          }}
        />
      </Modal>

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
      />

      <DictionaryDetailModal
        isOpen={!!state.editingDictionaryKey}
        onClose={() => state.setEditingDictionaryKey(null)}
        dictionaryKey={state.editingDictionaryKey}
      />

      <FiltersModal
        isOpen={state.isFiltersModalOpen}
        onClose={() => state.setIsFiltersModalOpen(false)}
        params={params}
        setParam={setParam}
        setParams={setParams}
        locationOptions={content.locationOptions}
        tableHeaders={content.tableHeaders}
        filterLabels={content.filterLabels}
      />
    </>
  );
};
