'use client';

import { CopyCheck, CopyIcon } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { cn } from '../../utils/cn';

export type CopyToClipboardProps = PropsWithChildren<{
  text: string;
  className?: string;
}>;

export const CopyToClipboard: FC<CopyToClipboardProps> = ({
  text,
  children,
  className,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  };

  return (
    <span className={cn('gap-2', className)}>
      {children}

      <span className="inline-flex">
        {text &&
          (isCopied ? (
            <CopyCheck
              size={12}
              aria-label="copied"
              role="button"
              data-testid="copy-to-clipboard"
              className="ml-1 mt-1"
            />
          ) : (
            <CopyIcon
              size={12}
              onClick={handleCopy}
              aria-label="copy"
              role="button"
              data-testid="copy-to-clipboard"
              className="ml-1 mt-1 cursor-pointer"
            />
          ))}
      </span>
    </span>
  );
};
