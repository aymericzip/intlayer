'use client';

import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Select } from '../Select';

export type NumberItemsSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  min?: number;
  max?: number;
};

export const NumberItemsSelector: FC<NumberItemsSelectorProps> = ({
  value,
  onValueChange,
  min = 5,
  max = 500,
}) => {
  const { numberItemsSelector, selectPageSize } = useIntlayer('pagination');

  const items = [
    1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 100000,
  ].filter((item) => item >= min && item <= max);

  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-600 text-sm dark:text-neutral-400">
        {numberItemsSelector}
      </span>
      <Select value={value} onValueChange={onValueChange}>
        <Select.Trigger className="w-20">
          <Select.Value placeholder={selectPageSize} />
        </Select.Trigger>
        <Select.Content>
          {items.map((item) => (
            <Select.Item key={item} value={item.toString()}>
              {item}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};
