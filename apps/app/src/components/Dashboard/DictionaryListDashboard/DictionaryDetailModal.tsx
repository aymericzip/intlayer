import { DictionaryFieldEditor } from '@intlayer/design-system/dictionary-field-editor';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useTheme } from '#/providers/ThemeProvider';
import { Skeleton } from '#components/Skeleton';

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
      {!dictionary || isPending ? (
        <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-6 p-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </Modal>
  );
};
