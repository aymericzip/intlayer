'use client';

import type { RepositoryProvider } from '@intlayer/backend';
import {
  Button,
  CodeBlock,
  Loader,
  Modal,
  useCopyToClipboard,
} from '@intlayer/design-system';
import { usePushCIConfig } from '@intlayer/design-system/hooks';
import { Copy, CopyCheck, GitCommit, XCircle } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { Link } from '@/components/Link/Link';

type CIWorkflowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  provider?: RepositoryProvider;
  ciStatus?: {
    exists: boolean;
    content: string;
    path: string;
    fileUrl?: string;
    allowAutoPush: boolean;
  };
};

export const CIWorkflowModal: FC<CIWorkflowModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  ciStatus,
  provider,
}) => {
  const { ciModal, ciTemplates } = useIntlayer('build-settings');
  const { resolvedTheme } = useTheme();
  const { mutate: pushConfig, isPending: isPushing } = usePushCIConfig();

  const handlePush = () => {
    pushConfig(undefined);
  };

  // Use actual content from server if available, otherwise fallback to default template
  const displayContent =
    ciStatus?.content || (provider ? ciTemplates[provider].value : '');
  const hasContent = !!displayContent;

  const { isCopied, copy } = useCopyToClipboard(displayContent ?? '');

  const handleCopy = () => {
    if (displayContent) {
      copy();
    }
  };

  const title = ciStatus?.exists
    ? ciModal.titleExisting.value
    : ciModal.titleMissing.value;

  const description = ciStatus?.exists
    ? ciModal.descriptionExisting.value
    : ciModal.descriptionMissing.value;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      hasCloseButton
      padding="lg"
    >
      <div className="flex flex-col gap-4">
        <p className="text-neutral text-sm">{description}</p>

        <div className="relative max-h-96 overflow-auto rounded-md bg-neutral/5 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          ) : hasContent ? (
            <CodeBlock lang="yaml" isDarkMode={resolvedTheme === 'dark'}>
              {displayContent}
            </CodeBlock>
          ) : (
            <div className="flex items-center justify-center gap-2 py-8 text-error">
              <XCircle className="size-5" />
              <p>{ciModal.failedToLoad}</p>
            </div>
          )}
        </div>

        {ciStatus?.fileUrl && (
          <Link
            href={ciStatus.fileUrl}
            isExternalLink
            variant="default"
            color="primary"
            underlined
            size="sm"
            label={ciModal.viewFileLink.value}
          >
            {ciModal.viewFileLink} →
          </Link>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            color="text"
            onClick={handleCopy}
            Icon={isCopied ? CopyCheck : Copy}
            label={ciModal.copyButtonLabel.value}
            disabled={!hasContent}
          >
            {ciModal.buttons.copy}
          </Button>

          {!ciStatus?.exists && ciStatus?.allowAutoPush && (
            <Button
              onClick={handlePush}
              isLoading={isPushing}
              Icon={GitCommit}
              label={ciModal.pushButtonLabel.value}
            >
              {ciModal.buttons.push}
            </Button>
          )}
        </div>

        {/* Show manual install message if file is missing AND (auto-push is not allowed OR we are in fallback mode) */}
        {(!ciStatus?.exists || !ciStatus) &&
          (!ciStatus?.allowAutoPush || !ciStatus) && (
            <div className="flex items-center gap-2 rounded-lg border border-warning/20 bg-warning/10 px-4 py-2">
              <XCircle className="size-4 text-warning" />
              <p className="text-sm text-warning">
                {ciModal.manualInstallMessage}
              </p>
            </div>
          )}
      </div>
    </Modal>
  );
};
