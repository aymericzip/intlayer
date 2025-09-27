'use client';

import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  Button,
  ButtonColor,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from '../Button';

/**
 * Props for the CopyButton component
 */
type CopyButtonProps = {
  /**
   * The text content to copy to the clipboard
   * @example
   * ```tsx
   * <CopyButton content="Hello World!" />
   * ```
   */
  content: string;
} & Partial<ButtonProps>;

/**
 * CopyButton - A specialized button component for copying text to the clipboard
 *
 * This component provides a user-friendly way to copy text content to the system clipboard
 * with visual feedback and accessibility features. It uses the modern Clipboard API with
 * fallback error handling, and provides clear visual indication of successful copy operations.
 *
 * ## Key Features
 * - **Clipboard Integration**: Uses modern Clipboard API for reliable text copying
 * - **Visual Feedback**: Icon changes from copy to check mark on successful copy
 * - **Auto-Reset**: Automatically reverts to copy icon after 1 second
 * - **Error Handling**: Graceful error handling with console logging
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Internationalization**: Multi-language support via Intlayer
 *
 * ## Use Cases
 * - Code snippet copying in documentation
 * - Sharing URLs or links
 * - Copying configuration values
 * - Form data duplication
 * - API key or token copying
 * - Text content sharing in interfaces
 *
 * ## Accessibility
 * - Uses semantic button element with proper ARIA labeling
 * - Keyboard accessible (Tab, Enter, Space)
 * - Screen reader announces copy actions
 * - Focus management with visible indicators
 * - Proper error state handling for assistive technologies
 *
 * ## Browser Compatibility
 * - Requires modern browsers with Clipboard API support
 * - Falls back gracefully with error logging for unsupported browsers
 * - Works in secure contexts (HTTPS) as required by Clipboard API
 *
 * @example
 * Basic usage:
 * ```tsx
 * <CopyButton content="Text to copy" />
 * ```
 *
 * @example
 * With custom styling and label:
 * ```tsx
 * <CopyButton
 *   content="https://example.com/api/endpoint"
 *   label="Copy API endpoint"
 *   variant={ButtonVariant.OUTLINE}
 *   color={ButtonColor.PRIMARY}
 *   size={ButtonSize.ICON_MD}
 * />
 * ```
 *
 * @example
 * In a code block context:
 * ```tsx
 * <div className="relative">
 *   <pre className="bg-gray-100 p-4 rounded">
 *     <code>npm install @intlayer/design-system</code>
 *   </pre>
 *   <CopyButton
 *     content="npm install @intlayer/design-system"
 *     className="absolute top-2 right-2"
 *     label="Copy installation command"
 *   />
 * </div>
 * ```
 */

export const CopyButton: FC<CopyButtonProps> = ({ content, ...props }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const { label } = useIntlayer('copy-button');

  const handleCopy = async () => {
    try {
      setError(false);
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy text: ', error);
      setError(true);
    }
  };

  useEffect(() => {
    if (copied || error) {
      const timer = setTimeout(() => {
        setCopied(false);
        setError(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copied, error]);

  // Determine the current state for accessibility
  const getAriaLabel = () => {
    if (copied) return 'Content copied to clipboard';
    if (error) return 'Failed to copy content';
    return props.label ?? label.value;
  };

  return (
    <Button
      Icon={copied ? CopyCheckIcon : CopyIcon}
      onClick={handleCopy}
      variant={ButtonVariant.HOVERABLE}
      color={ButtonColor.TEXT}
      size={ButtonSize.ICON_SM}
      tabIndex={0}
      title={getAriaLabel()}
      {...props}
      label={getAriaLabel()}
      aria-describedby={
        copied ? 'copy-success' : error ? 'copy-error' : undefined
      }
      className={`${props.className || ''} ${error ? 'text-red-500' : copied ? 'text-green-500' : ''}`}
    />
  );
};
