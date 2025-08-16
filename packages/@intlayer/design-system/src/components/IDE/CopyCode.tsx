'use client';

import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { CopyButton } from '../CopyButton';
import { Popover, PopoverXAlign } from '../Popover';
import copyContentContent from './copyCode.content';

type CopyCodeProps = {
  code: string;
};

export const CopyCode: FC<CopyCodeProps> = ({ code }) => {
  const { title, description } = useDictionary(copyContentContent);

  return (
    <Popover identifier="copy">
      <CopyButton content={code} />

      <Popover.Detail
        identifier="copy"
        className="flex flex-col gap-3 p-3 min-w-64 text-sm"
        xAlign={PopoverXAlign.END}
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
      </Popover.Detail>
    </Popover>
  );
};
