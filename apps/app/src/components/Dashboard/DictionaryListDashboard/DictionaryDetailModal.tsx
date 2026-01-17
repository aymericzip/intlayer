'use client';

import { DictionaryFieldEditor, Loader, Modal } from '@intlayer/design-system';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hasCloseButton
      size="lg"
      className="h-full"
    >
      <Loader isLoading={!dictionary || isPending}>
        <EditorConfigurationProvider>
          <div className="flex h-full min-h-0 w-full flex-1 flex-col">
            {dictionary && (
              <DictionaryFieldEditor
                dictionary={dictionary}
                isDarkMode={resolvedTheme === 'dark'}
                mode={['remote']}
                onDelete={onClose}
                showReturnButton={false}
              />
            )}
          </div>
        </EditorConfigurationProvider>
      </Loader>
    </Modal>
  );
};
