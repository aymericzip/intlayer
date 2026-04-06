import { CodeBlock } from '@intlayer/design-system/ide';
import { Loader } from '@intlayer/design-system/loader';
import { Popover } from '@intlayer/design-system/popover';
import {
  AlertTriangle,
  CheckCircle2,
  CircleQuestionMark,
  Info,
  XCircle,
} from 'lucide-react';
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

export const EventTag: FC<
  PropsWithChildren<{
    id: string;
    event?: AuditEvent;
    isLoading?: boolean;
  }>
> = ({ event, id, isLoading, children }) => {
  const isDarkMode = true;
  const details =
    event?.data?.errorsDetails ??
    event?.data?.warningsDetails ??
    event?.data?.successDetails;

  if (details) {
    const isObject =
      typeof details === 'object' &&
      details !== null &&
      !Array.isArray(details);
    const detailsObj = isObject ? (details as Record<string, any>) : null;
    const hasLinks = detailsObj && Array.isArray(detailsObj.links);

    return (
      <Popover identifier={`information-tag-${id}`}>
        <span className="flex cursor-pointer items-center gap-1.5">
          <StatusIcon status={event?.status} />
          {children}
        </span>
        <Popover.Detail
          identifier={`information-tag-${id}`}
          className="flex max-h-80 w-auto max-w-125 flex-col gap-4 overflow-auto bg-background/50 p-4 text-left text-sm"
          isFocusable
          isOverable
        >
          {hasLinks ? (
            <div className="flex flex-col gap-2">
              {detailsObj.message && (
                <p className="font-semibold">{detailsObj.message}</p>
              )}
              <div className="flex flex-col gap-1">
                <CodeBlock lang="html" isDarkMode={isDarkMode}>
                  {detailsObj.links
                    .map((link: any) =>
                      String(link).replace(/````html\n?|```/g, '')
                    )
                    .join('\n')}
                </CodeBlock>
              </div>
            </div>
          ) : (
            <CodeBlock lang="json" isDarkMode={isDarkMode}>
              {JSON.stringify(details, null, 2)}
            </CodeBlock>
          )}
        </Popover.Detail>
      </Popover>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <StatusIcon status={event?.status} isLoading={isLoading} />
      {children}
    </div>
  );
};

export type FieldItemProps = PropsWithChildren<{
  id: string;
  icon: ReactNode;
  details?: ReactNode;
  label: ReactNode;
  event?: AuditEvent;
  isLoading?: boolean;
}>;

export const FieldItem: FC<FieldItemProps> = ({
  id,
  icon,
  label,
  event,
  details,
  isLoading,
  children,
}) => (
  <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 rounded-lg px-2 py-1 text-neutral">
    {icon}
    <strong className="min-w-28">{label}:</strong>
    <span className="flex items-center justify-end gap-2 text-left text-text/70">
      <EventTag id={`${id}-success`} event={event} isLoading={isLoading}>
        {children}
      </EventTag>

      {details && <InformationTag id={id}>{details}</InformationTag>}
    </span>
  </div>
);
