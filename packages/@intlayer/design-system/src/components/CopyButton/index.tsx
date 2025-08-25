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

type CopyButtonProps = {
  content: string;
} & Partial<ButtonProps>;

export const CopyButton: FC<CopyButtonProps> = ({ content, ...props }) => {
  const [copied, setCopied] = useState(false);
  const { label } = useIntlayer('copy-button');

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
      variant={ButtonVariant.HOVERABLE}
      color={ButtonColor.TEXT}
      size={ButtonSize.ICON_SM}
      {...props}
      label={props.label ?? label.value}
    />
  );
};
