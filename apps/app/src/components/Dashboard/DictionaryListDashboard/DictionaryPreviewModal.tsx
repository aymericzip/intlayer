import { Container } from '@intlayer/design-system/container';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Modal } from '@intlayer/design-system/modal';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useTheme } from '#/providers/ThemeProvider';

type DictionaryPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  dictionary: Dictionary | null;
};

export const DictionaryPreviewModal: FC<DictionaryPreviewModalProps> = ({
  isOpen,
  onClose,
  dictionary,
}) => {
  const { resolvedTheme } = useTheme();
  const content = useIntlayer('dictionary-list');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        dictionary
          ? `${content.previewModal.title.value} — ${dictionary.key}`
          : content.previewModal.title.value
      }
      size="lg"
      padding="md"
      hasCloseButton
      isScrollable
    >
      {dictionary && (
        <Container
          roundedSize="2xl"
          className="max-h-full min-h-0 w-full flex-1 overflow-auto overflow-scroll bg-text/80 p-2"
        >
          <CodeBlock lang="json" isDarkMode={resolvedTheme !== 'dark'}>
            {JSON.stringify(dictionary, null, 2)}
          </CodeBlock>
        </Container>
      )}
    </Modal>
  );
};
