'use client';

import { cn } from '@utils/cn';
import { Check, Lock, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { CellStatus } from './cellStatus';

export type StatusDotProps = {
  status: CellStatus;
  className?: string;
};

/**
 * AI accent, built from palette tokens only (no off-palette hue): AI states
 * are told apart by the Sparkles icon, not by colour.
 */
export const AI_TEXT_CLASS_NAME = 'text-text';
/** Hover background of AI actions. */
export const AI_HOVER_CLASS_NAME = 'hover:bg-text/10';
/** Border of AI actions and surfaces. */
export const AI_BORDER_CLASS_NAME = 'border-text/30';
/** Background of AI surfaces (review banners). */
export const AI_SURFACE_CLASS_NAME = 'bg-text/5';

/**
 * One attention marker per status. Each status has its own shape, so the
 * marker still reads without colour (colour-blind users, greyscale).
 */
export const StatusDot: FC<StatusDotProps> = ({ status, className }) => {
  const {
    statusMissing,
    statusEdited,
    statusAI,
    statusDone,
    statusIdentical,
    statusLocked,
    statusReadonly,
  } = useIntlayer('content-grid');

  const labels: Record<CellStatus, string> = {
    missing: statusMissing.value,
    edited: statusEdited.value,
    ai: statusAI.value,
    done: statusDone.value,
    identical: statusIdentical.value,
    locked: statusLocked.value,
    readonly: statusReadonly.value,
  };

  const renderMarker = () => {
    switch (status) {
      case 'missing':
        return (
          <span className="block size-2.5 rounded-full border-2 border-warning bg-text-opposite" />
        );
      case 'edited':
        return (
          <span className="block size-2.5 rounded-full border-2 border-warning bg-text-opposite" />
        );
      case 'ai':
        return <Sparkles className={cn('size-3.5', AI_TEXT_CLASS_NAME)} />;
      case 'done':
        return <Check className="size-3.5 text-text" />;
      case 'identical':
        return (
          <span className="font-bold font-mono text-warning text-xs leading-none">
            =
          </span>
        );
      case 'locked':
        return <Lock className="size-3 text-neutral" />;
      default:
        return null;
    }
  };

  if (status === 'readonly') return null;

  return (
    <span
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center',
        className
      )}
      title={labels[status]}
    >
      {renderMarker()}
      <span className="sr-only">{labels[status]}</span>
    </span>
  );
};
