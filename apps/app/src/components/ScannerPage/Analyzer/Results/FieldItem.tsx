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
    return <Loader className="size-5" />;
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
      className="flex min-w-100 flex-col gap-4 bg-background/50 p-4 text-start text-sm"
      isFocusable
      isOverable
    >
      {children}
    </Popover.Detail>
  </Popover>
);

/**
 * Split check details into a message, the listed links (rendered as HTML) and
 * other listed items (issues, alternates, URLs). Other shapes (bundle
 * summaries, hreflang lists…) return nothing and are rendered as JSON.
 */
const getDetailsLists = (
  details: unknown
): { message?: string; links?: string[]; listedItems?: string[] } => {
  if (typeof details === 'string') return { message: details };
  if (Array.isArray(details)) return { listedItems: details.map(String) };
  if (!details || typeof details !== 'object') return {};

  const { message, links, issues, alternates, urls } = details as Record<
    string,
    unknown
  >;
  const listedItems = [issues, alternates, urls].find(Array.isArray) as
    | unknown[]
    | undefined;

  return {
    message: typeof message === 'string' ? message : undefined,
    links: Array.isArray(links)
      ? links.map((link) => String(link).replace(/````html\n?|```/g, ''))
      : undefined,
    listedItems: listedItems?.map(String),
  };
};

export const EventTag: FC<
  PropsWithChildren<{
    id: string;
    event?: AuditEvent;
    isLoading?: boolean;
  }>
> = ({ event, id, isLoading, children }) => {
  const details =
    event?.data?.errorsDetails ??
    event?.data?.warningsDetails ??
    event?.data?.successDetails;

  if (details) {
    const { message, links, listedItems } = getDetailsLists(details);

    return (
      <Popover identifier={`information-tag-${id}`}>
        <span className="flex cursor-pointer items-center gap-1.5">
          <StatusIcon status={event?.status} />
          {children}
        </span>
        <Popover.Detail
          identifier={`information-tag-${id}`}
          className="flex max-h-80 w-auto max-w-125 flex-col gap-4 overflow-auto bg-background/50 p-4 text-start text-sm"
          isFocusable
          isOverable
        >
          {message || links || listedItems ? (
            <div className="flex flex-col gap-2">
              {message && <p className="font-semibold">{message}</p>}
              {links && links.length > 0 && (
                <CodeBlock lang="html">{links.join('\n')}</CodeBlock>
              )}
              {listedItems && (
                <ul className="list-disc ps-4">
                  {listedItems.map((item) => (
                    <li key={item} className="break-all">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <CodeBlock lang="json">
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
    <span className="flex items-center justify-end gap-2 text-start text-text/70">
      <EventTag id={`${id}-success`} event={event} isLoading={isLoading}>
        {children}
      </EventTag>

      {details && <InformationTag id={id}>{details}</InformationTag>}
    </span>
  </div>
);
