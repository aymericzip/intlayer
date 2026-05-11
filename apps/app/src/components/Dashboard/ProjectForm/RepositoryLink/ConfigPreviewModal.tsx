import { Button } from '@intlayer/design-system/button';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { Check, XCircle } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useTheme } from '#/providers/ThemeProvider';
import type { ConfigPreviewState } from './types';

type ConfigPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  configPreview: ConfigPreviewState;
  viewOnlyConfigContent: string | null;
  isLoadingConfigContent: boolean;
  isUpdatingProject: boolean;
  detectedConfigs: string[];
  onConfirm: () => void;
  onBackToSelection: () => void;
  onBackToList: () => void;
};

export const ConfigPreviewModal: FC<ConfigPreviewModalProps> = ({
  isOpen,
  onClose,
  configPreview,
  viewOnlyConfigContent,
  isLoadingConfigContent,
  isUpdatingProject,
  detectedConfigs,
  onConfirm,
  onBackToSelection,
  onBackToList,
}) => {
  const content = useIntlayer('repository-link');
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const isImportMode = !!configPreview;
  const hasContent = !!configPreview?.content || !!viewOnlyConfigContent;

  const title = isImportMode
    ? content.modal?.confirmTitle?.value
    : content.modal?.viewConfigTitle?.value;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hasCloseButton
      size="lg"
      padding="2xl"
      isScrollable={false}
      className="max-h-[90vh]"
      title={title}
    >
      <div className="flex size-full flex-col gap-4">
        <div className="flex max-h-156 min-h-0 flex-1 flex-col overflow-auto rounded-xl bg-text-opposite/80">
          {isLoadingConfigContent && !hasContent ? (
            <div className="flex min-h-20 items-center justify-center gap-2">
              <Loader className="size-4" />
            </div>
          ) : hasContent ? (
            <div className="p-6">
              <CodeBlock lang="typescript" isDarkMode={isDarkMode}>
                {configPreview?.content ?? viewOnlyConfigContent ?? ''}
              </CodeBlock>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-error">
              <XCircle className="mr-2 size-6" />
              <p>{content.modal?.failedToLoad}</p>
            </div>
          )}
        </div>

        {isImportMode && (
          <div className="flex shrink-0 justify-end gap-2 pt-4">
            <Button
              variant="outline"
              color="text"
              onClick={() => {
                if (detectedConfigs.length > 1) {
                  onBackToSelection();
                } else {
                  onBackToList();
                }
              }}
              label={content.actions?.cancel?.value}
            >
              {content.actions?.cancel}
            </Button>
            <Button
              onClick={onConfirm}
              color="text"
              Icon={Check}
              isLoading={isUpdatingProject}
              label={content.actions?.useThisFile?.value}
            >
              {content.actions?.useThisFile}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
