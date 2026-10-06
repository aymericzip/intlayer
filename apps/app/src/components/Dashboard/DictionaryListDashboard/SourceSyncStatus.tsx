import type { DictionarySourceSync } from '@intlayer/backend-contract/dictionary';
import {
  CircleCheck,
  GitCommitHorizontal,
  GitPullRequest,
  TriangleAlert,
} from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type SourceSyncStatusProps = {
  sourceSync?: DictionarySourceSync;
};

/**
 * Outcome of the last commit of the dictionary CMS edits to its `.content`
 * file. Links to the commit or pull request when there is one.
 */
export const SourceSyncStatus: FC<SourceSyncStatusProps> = ({ sourceSync }) => {
  const { sourceSyncStatus } = useIntlayer('dictionary-list');

  if (!sourceSync) return null;

  const { status, url, message } = sourceSync;

  const { Icon, label, className } = {
    committed: {
      Icon: GitCommitHorizontal,
      label: sourceSyncStatus.committed.value,
      className: 'text-success',
    },
    'pull-request': {
      Icon: GitPullRequest,
      label: sourceSyncStatus.pullRequest.value,
      className: 'text-success',
    },
    'up-to-date': {
      Icon: CircleCheck,
      label: sourceSyncStatus.upToDate.value,
      className: 'text-neutral',
    },
    'file-not-found': {
      Icon: TriangleAlert,
      label: sourceSyncStatus.error.value,
      className: 'text-warning',
    },
    unsupported: {
      Icon: TriangleAlert,
      label: sourceSyncStatus.error.value,
      className: 'text-warning',
    },
    error: {
      Icon: TriangleAlert,
      label: sourceSyncStatus.error.value,
      className: 'text-error',
    },
  }[status];

  const title = message ? `${label}: ${message}` : label;

  if (!url) {
    return (
      <span role="img" title={title} aria-label={title} className={className}>
        <Icon className="size-4" />
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={title}
      className={className}
      onClick={(event) => event.stopPropagation()}
    >
      <Icon className="size-4" />
    </a>
  );
};
