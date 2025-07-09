'use client';

import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button, ButtonProps } from '../Button';
import { copyContentContent } from '../IDE/CopyButton.content';

type CopyButtonProps = {
  content: string;
} & Partial<ButtonProps>;

export const CopyButton: FC<CopyButtonProps> = ({ content, ...props }) => {
  const [copied, setCopied] = useState(false);
  const { label } = useDictionary(copyContentContent);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      Icon={copied ? CopyCheckIcon : CopyIcon}
      onClick={handleCopy}
      variant="hoverable"
      color="text"
      size="icon-sm"
      {...props}
      label={props.label ?? label.value}
    />
  );
};
