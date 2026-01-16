'use client';

import { DictionaryFieldEditor, Loader, Modal } from '@intlayer/design-system';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { useTheme } from 'next-themes';
import { type FC, Suspense } from 'react';
import { EditorConfigurationProvider } from '../ContentDashboard/ConfigurationProvider';

type DictionaryDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dictionaryKey: string | null;
};

export const DictionaryDetailModal: FC<DictionaryDetailModalProps> = ({
  isOpen,
  onClose,
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { data: dictionaryResult, isPending } = useGetDictionary(
    dictionaryKey ?? ''
  );

  const dictionary = dictionaryResult?.data;

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="md">
      <Loader isLoading={!dictionary || isPending}>
        <EditorConfigurationProvider>
          {dictionary && (
            <DictionaryFieldEditor
              dictionary={dictionary}
              isDarkMode={resolvedTheme === 'dark'}
              mode={['remote']}
              onDelete={onClose}
            />
          )}
        </EditorConfigurationProvider>
      </Loader>
    </Modal>
  );
};
