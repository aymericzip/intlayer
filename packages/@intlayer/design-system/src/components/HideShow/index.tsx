'use client';

import { Eye, EyeOff } from 'lucide-react';
import { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

/**
 * Props for the HideShow component
 */
export interface HideShowProps {
  /**
   * Sensitive text to display masked. Copy is only allowed when revealed.
   */
  text: string;

  /** Wrapper classes */
  className?: string;

  /** Number of prefix characters to keep visible when masked. Default: 6 */
  visiblePrefixChars?: number;

  /** Character used to mask hidden portion. Default: '•' */
  maskChar?: string;

  /** Reveal duration in ms before auto-hiding. Default: 10000 (10s) */
  revealDurationMs?: number;

  /** Copy error callback */
  onCopyError?: (error: Error) => void;
}

// Insert zero-width spaces every N chars so Safari can wrap long runs
const insertBreaks = (str: string, groupSize = 6) =>
  str.replace(new RegExp(`.{1,${groupSize}}`, 'g'), '$&\u200b');

export const HideShow: FC<HideShowProps> = ({
  text,
  className,
  visiblePrefixChars = 6,
  maskChar = '•',
  revealDurationMs = 10000,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  const maskedText = useMemo(() => {
    if (!text) return '';
    if (visiblePrefixChars <= 0) return maskChar.repeat(text.length);
    const prefix = text.slice(0, visiblePrefixChars);
    const remaining = Math.max(0, text.length - visiblePrefixChars);
    return insertBreaks(`${prefix}${maskChar.repeat(remaining)}`);
  }, [text, visiblePrefixChars, maskChar]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, []);

  const reveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    hideTimerRef.current = window.setTimeout(() => {
      setIsRevealed(false);
    }, revealDurationMs);
  };

  const hide = () => {
    setIsRevealed(false);

    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const IconComponent = isRevealed ? EyeOff : Eye;

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-2 rounded-md p-0.5 hover:cursor-pointer hover:bg-neutral/10',
        className
      )}
      onClick={isRevealed ? hide : reveal}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          isRevealed ? hide() : reveal();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <span className="min-w-0 break-all">
        {isRevealed ? text : maskedText}
      </span>
      <IconComponent className="ml-1 ml-auto size-4 min-w-4 shrink-0" />
    </span>
  );
};
