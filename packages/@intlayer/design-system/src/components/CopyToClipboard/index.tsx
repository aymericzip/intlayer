'use client';

import { cn } from '@utils/cn';
import { CopyCheck, CopyIcon } from 'lucide-react';
import {
  type FC,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
  useState,
} from 'react';

/**
 * Props for the CopyToClipboard component
 */
export interface CopyToClipboardProps extends PropsWithChildren {
  /**
   * The text to copy to the clipboard when clicked
   * @example "Hello World"
   * @example "npm install @intlayer/design-system"
   */
  text: string;

  /**
   * Additional CSS classes for the wrapper element
   * @example "bg-blue-100 text-blue-800"
   */
  className?: string;

  /**
   * Accessible label for screen readers when copy operation is available
   * @default "Copy to clipboard"
   */
  'aria-label'?: string;

  /**
   * Accessible label for screen readers when content has been copied
   * @default "Copied to clipboard"
   */
  'aria-copied-label'?: string;

  /**
   * Duration in milliseconds to show the "copied" state
   * @default 2000
   */
  feedbackDuration?: number;

  /**
   * Callback function called when copy operation succeeds
   */
  onCopySuccess?: () => void;

  /**
   * Callback function called when copy operation fails
   */
  onCopyError?: (error: Error) => void;

  /**
   * Disable the copy to clipboard functionality and return the children
   * @default false
   */
  disable?: boolean;

  /**
   * Prevent the default behavior of the link when clicked
   * @default true
   */
  preventDefault?: boolean;
}

export const useCopyToClipboard = (
  text?: string,
  feedbackDuration = 2000,
  onCopySuccess?: () => void,
  onCopyError?: (error: Error) => void
) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    if (!text) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        onCopyError?.(new Error('Clipboard API not supported in this browser'));
        return;
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), feedbackDuration);
      onCopySuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to copy to clipboard';
      onCopyError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  };

  return { isCopied, copy };
};

/**
 * CopyToClipboard Component
 *
 * A versatile component that allows users to copy text to their clipboard with visual feedback.
 * Provides accessibility features, customizable feedback duration, and error handling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CopyToClipboard text="Hello World">
 *   <span>Click to copy</span>
 * </CopyToClipboard>
 *
 * // With custom styling and callbacks
 * <CopyToClipboard
 *   text="npm install @intlayer/design-system"
 *   className="bg-gray-100 p-2"
 *   feedbackDuration={3000}
 *   onCopySuccess={() => console.log('Copied!')}
 * >
 *   <code>npm install @intlayer/design-system</code>
 * </CopyToClipboard>
 * ```
 *
 * @component
 * @accessibility
 * - Uses proper ARIA labels for copy and copied states
 * - Supports keyboard navigation (Enter and Space keys)
 * - Announces state changes to screen readers
 * - Provides visual focus indicators
 */
export const CopyToClipboard: FC<CopyToClipboardProps> = ({
  text,
  children,
  className,
  'aria-label': ariaLabel = 'Copy to clipboard',
  'aria-copied-label': ariaCopiedLabel = 'Copied to clipboard',
  feedbackDuration = 2000,
  onCopySuccess,
  onCopyError,
  disable,
  preventDefault = true,
}) => {
  const { isCopied, copy } = useCopyToClipboard(
    text,
    feedbackDuration,
    onCopySuccess,
    onCopyError
  );

  if (disable) return <span className={className}>{children}</span>;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCopy(event);
    }
  };

  const handleCopy = (event: MouseEvent | KeyboardEvent) => {
    if (preventDefault) event.preventDefault();

    copy();
  };

  const currentAriaLabel = isCopied ? ariaCopiedLabel : ariaLabel;

  const IconComponent = isCopied ? CopyCheck : CopyIcon;

  return (
    <span
      className={cn(
        'inline-flex max-w-full cursor-pointer items-center gap-2 rounded-md p-0.5 hover:bg-neutral/10',
        className
      )}
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={currentAriaLabel}
      aria-pressed={isCopied}
      data-testid="copy-to-clipboard"
    >
      <span className="min-w-0 break-all">{children}</span>

      {text && (
        <IconComponent
          className="ml-1 ml-auto size-4 min-w-4 shrink-0"
          aria-hidden="true"
        />
      )}
    </span>
  );
};
