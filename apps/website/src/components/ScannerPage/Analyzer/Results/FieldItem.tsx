'use client';

import { CodeBlock, Loader, Popover } from '@intlayer/design-system';
import {
  AlertTriangle,
  CheckCircle2,
  CircleQuestionMark,
  Info,
  XCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import type { AuditEvent, AuditStatus } from './types';

export const StatusIcon: FC<{ status?: AuditStatus; isLoading?: boolean }> = ({
  status,
  isLoading,
}) => {
  if (isLoading && typeof status === 'undefined') {
    return <Loader className="size-4" />;
  }

  switch (status) {
    case 'success':
      return <CheckCircle2 size={16} className="text-success" />;
    case 'warning':
      return <AlertTriangle size={16} className="text-warning" />;
    case 'error':
      return <XCircle size={16} className="text-error" />;

    default:
      return <CircleQuestionMark className="size-4 text-neutral/30" />;
  }
};

export const InformationTag: FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => (
  <Popover identifier={`information-tag-${id}`}>
    <Info className="size-3 text-neutral/50" />
    <Popover.Detail
      identifier={`information-tag-${id}`}
      className="flex min-w-[400px] flex-col gap-4 bg-background/50 p-4 text-left text-sm"
      isFocusable
      isOverable
    >
      {children}
    </Popover.Detail>
  </Popover>
);

export const EventTag: FC<{
  id: string;
  event?: AuditEvent;
  isLoading?: boolean;
}> = ({ event, id, isLoading }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const details =
    event?.data?.errorsDetails ??
    event?.data?.warningsDetails ??
    event?.data?.successDetails;

  if (details) {
    return (
      <Popover identifier={`information-tag-${id}`}>
        <StatusIcon status={event?.status} />
        <Popover.Detail
          identifier={`information-tag-${id}`}
          className="flex max-h-80 w-auto max-w-[400px] flex-col gap-4 overflow-auto bg-background/50 px-4 text-left text-sm"
          isFocusable
          isOverable
        >
          <CodeBlock lang="json" isDarkMode={isDarkMode}>
            {JSON.stringify(details, null, 2)}
          </CodeBlock>
        </Popover.Detail>
      </Popover>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <StatusIcon status={event?.status} isLoading={isLoading} />
    </div>
  );
};

export type FieldItemProps = {
  id: string;
  icon: ReactNode;
  details?: string;
  label: ReactNode;
  event?: AuditEvent;
  isLoading?: boolean;
};

export const FieldItem: FC<FieldItemProps> = ({
  id,
  icon,
  label,
  event,
  details,
  isLoading,
}) => (
  <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 rounded-lg px-2 py-1 text-neutral">
    {icon}
    <strong className="min-w-28">{label}:</strong>
    <span className="flex items-center justify-end gap-2 text-left text-text/70">
      <EventTag id={`${id}-success`} event={event} isLoading={isLoading} />

      {details && <InformationTag id={id}>{details}</InformationTag>}
    </span>
  </div>
);
