import { DictionaryCreationForm, Modal } from '@intlayer/design-system';
import type { FC } from 'react';
import { DeleteDictionaryModal } from './DeleteDictionaryModal';
import { DictionaryDetailModal } from './DictionaryDetailModal';
import { FiltersModal } from './FiltersModal';

interface DictionaryModalsProps {
  isCreationModalOpen: boolean;
  setIsCreationModalOpen: (open: boolean) => void;
  refetch: () => void;
  isDeleteModalOpen: boolean;
  setDictionaryToDelete: (val: any) => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
  dictionaryToDelete: any;
  editingDictionaryKey: string | null;
  setEditingDictionaryKey: (key: string | null) => void;
  isFiltersModalOpen: boolean;
  setIsFiltersModalOpen: (open: boolean) => void;
  params: any;
  setParam: any;
  setParams: any;
  locationOptions: any;
  tableHeaders: any;
  filterLabels: any;
}

export const DictionaryModals: FC<DictionaryModalsProps> = ({
  isCreationModalOpen,
  setIsCreationModalOpen,
  refetch,
  isDeleteModalOpen,
  setDictionaryToDelete,
  onConfirmDelete,
  isDeleting,
  dictionaryToDelete,
  editingDictionaryKey,
  setEditingDictionaryKey,
  isFiltersModalOpen,
  setIsFiltersModalOpen,
  params,
  setParam,
  setParams,
  locationOptions,
  tableHeaders,
  filterLabels,
}) => (
  <>
    <Modal
      isOpen={isCreationModalOpen}
      onClose={() => setIsCreationModalOpen(false)}
      padding="md"
      hasCloseButton
    >
      <DictionaryCreationForm
        onDictionaryCreated={() => {
          setIsCreationModalOpen(false);
          refetch();
        }}
      />
    </Modal>

    <DeleteDictionaryModal
      isOpen={isDeleteModalOpen}
      onClose={() => setDictionaryToDelete(null)}
      onConfirm={onConfirmDelete}
      isDeleting={isDeleting}
      count={Array.isArray(dictionaryToDelete) ? dictionaryToDelete.length : 1}
    />

    <DictionaryDetailModal
      isOpen={!!editingDictionaryKey}
      onClose={() => setEditingDictionaryKey(null)}
      dictionaryKey={editingDictionaryKey}
    />

    <FiltersModal
      isOpen={isFiltersModalOpen}
      onClose={() => setIsFiltersModalOpen(false)}
      params={params}
      setParam={setParam}
      setParams={setParams}
      locationOptions={locationOptions}
      tableHeaders={tableHeaders}
      filterLabels={filterLabels}
    />
  </>
);
