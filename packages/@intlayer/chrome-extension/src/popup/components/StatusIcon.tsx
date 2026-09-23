import { cn } from '@intlayer/design-system/utils';
import type { FunctionComponent } from 'preact';
import type { AuditStatus } from '../../scan/types';

/** Status as displayed — a started (or not yet streamed) check is pending. */
type DisplayedStatus = Exclude<AuditStatus, 'started'> | 'pending';

const statusStyles: Record<
  DisplayedStatus,
  { symbol: string; className: string }
> = {
  success: { symbol: '✓', className: 'text-success' },
  warning: { symbol: '⚠', className: 'text-warning' },
  error: { symbol: '✗', className: 'text-error' },
  pending: { symbol: '•', className: 'text-neutral' },
};

/** Colored ✓ / ⚠ / ✗ (or pending dot) matching an audit check status. */
export const StatusIcon: FunctionComponent<{ status?: AuditStatus }> = ({
  status,
}) => {
  const displayedStatus: DisplayedStatus =
    !status || status === 'started' ? 'pending' : status;
  const { symbol, className } = statusStyles[displayedStatus];

  return (
    <span className={cn('w-3.5 shrink-0 text-center font-bold', className)}>
      {symbol}
    </span>
  );
};
