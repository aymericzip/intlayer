'use client';

import { CodeBlock, Loader, Popover } from '@intlayer/design-system';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Package,
  XCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import type { AuditEvent } from './types';

type BundleSummary = {
  currentLocale: string;
  dictionariesFound: number;
  totalContentSize: string;
  currentLocaleSize: string;
  unusedLocaleSize: string;
  optimizablePercentage: string;
  unusedLocaleBreakdown: Record<string, string>;
};

function parseSummary(event?: AuditEvent): BundleSummary | null {
  const details =
    event?.data?.errorsDetails ??
    event?.data?.warningsDetails ??
    event?.data?.successDetails;
  if (!details || typeof details !== 'object' || Array.isArray(details))
    return null;
  const d = details as Record<string, unknown>;
  if (typeof d.optimizablePercentage !== 'string') return null;
  return d as unknown as BundleSummary;
}

type BundleContentFieldProps = {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  event?: AuditEvent;
  isLoading?: boolean;
};

export const BundleContentField: FC<BundleContentFieldProps> = ({
  id,
  label,
  description,
  event,
  isLoading,
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const summary = parseSummary(event);
  const status = event?.status;

  const renderStatusIcon = () => {
    if (isLoading && !status) return <Loader className="size-4" />;
    switch (status) {
      case 'success':
        return <CheckCircle2 size={16} className="text-success" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-warning" />;
      case 'error':
        return <XCircle size={16} className="text-error" />;
      default:
        return null;
    }
  };

  const inlineLabel = (() => {
    if (!summary) return null;
    const pct = parseInt(summary.optimizablePercentage, 10);
    if (pct === 0) return null;
    return (
      <span className="font-mono text-neutral/60 text-xs">
        {summary.optimizablePercentage} waste · {summary.unusedLocaleSize}
      </span>
    );
  })();

  const detailsContent = summary ? (
    <CodeBlock lang="json" isDarkMode={isDarkMode}>
      {JSON.stringify(summary, null, 2)}
    </CodeBlock>
  ) : null;

  return (
    <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 rounded-lg px-2 py-1 text-neutral">
      <Package size={16} />
      <strong className="min-w-28">{label}:</strong>
      <span className="flex items-center justify-end gap-2 text-left text-text/70">
        {detailsContent ? (
          <Popover identifier={`bundle-content-${id}`}>
            <span className="flex cursor-pointer items-center gap-1.5">
              {renderStatusIcon()}
              {inlineLabel}
            </span>
            <Popover.Detail
              identifier={`bundle-content-${id}`}
              className="flex max-h-80 w-auto max-w-125 flex-col gap-4 overflow-auto bg-background/50 p-4 text-left text-sm"
              isFocusable
              isOverable
            >
              {detailsContent}
            </Popover.Detail>
          </Popover>
        ) : (
          <span className="flex items-center gap-1.5">
            {renderStatusIcon()}
            {inlineLabel}
          </span>
        )}
      </span>
      {description && (
        <Popover identifier={`bundle-content-info-${id}`}>
          <Info className="size-3 text-neutral/50" />
          <Popover.Detail
            identifier={`bundle-content-info-${id}`}
            className="flex min-w-[400px] flex-col gap-4 bg-background/50 p-4 text-left text-sm"
            isFocusable
            isOverable
          >
            {description}
          </Popover.Detail>
        </Popover>
      )}
    </div>
  );
};
