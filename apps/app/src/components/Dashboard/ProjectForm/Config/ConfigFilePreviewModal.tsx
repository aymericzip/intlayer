import { Button } from '@intlayer/design-system/button';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Modal } from '@intlayer/design-system/modal';
import { Check } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useTheme } from '#/providers/ThemeProvider';

type ConfigFilePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fileContent: string;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const ConfigFilePreviewModal: FC<ConfigFilePreviewModalProps> = ({
  isOpen,
  onClose,
  fileContent,
  onConfirm,
  isLoading,
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const content = useIntlayer('repository-link');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hasCloseButton
      size="lg"
      padding="2xl"
      isScrollable={false}
      className="max-h-[90vh]"
      title={content.modal?.confirmTitle}
    >
      <div className="flex size-full flex-col gap-4">
        <div className="min-h-0 flex-1 overflow-auto">
          <div className="max-h-[60vh] overflow-auto rounded-xl bg-text-opposite/80 p-6">
            <CodeBlock lang="typescript" isDarkMode={isDarkMode}>
              {fileContent}
            </CodeBlock>
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-2 pt-4">
          <Button
            variant="outline"
            color="text"
            onClick={onClose}
            label={content.actions?.cancel}
          >
            {content.actions?.cancel}
          </Button>
          <Button
            onClick={onConfirm}
            color="text"
            Icon={Check}
            isLoading={isLoading}
            label={content.actions?.useThisFile}
          >
            {content.actions?.useThisFile}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
