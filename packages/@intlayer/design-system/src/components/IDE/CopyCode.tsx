'use client';

import type { ButtonProps } from '@components/Button';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { CopyButton } from '../CopyButton';
import { Popover, PopoverXAlign } from '../Popover';

type CopyCodeProps = {
  code: string;
} & Partial<Omit<ButtonProps, 'children'>>;

export const CopyCode: FC<CopyCodeProps> = ({ code, ...props }) => {
  const { title, description } = useIntlayer('code');

  return (
    <Popover identifier="copy">
      <CopyButton content={code} {...props} />

      <Popover.Detail
        identifier="copy"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
        xAlign={PopoverXAlign.END}
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
      </Popover.Detail>
    </Popover>
  );
};
