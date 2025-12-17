'use client';

import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Select } from '../Select';
import { useCodeContext } from './CodeContext';

export const PackageManagerSelector: FC = () => {
  const { packageManager, setPackageManager } = useCodeContext();
  const { packageManager: packageManagerContent } =
    useIntlayer('code-selectors');

  return (
    <Select value={packageManager} onValueChange={setPackageManager}>
      <Select.Trigger className="py-1" aria-label={packageManagerContent.label}>
        <Select.Value placeholder="Package Manager" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="npm">npm</Select.Item>
        <Select.Item value="pnpm">pnpm</Select.Item>
        <Select.Item value="yarn">yarn</Select.Item>
        <Select.Item value="bun">bun</Select.Item>
      </Select.Content>
    </Select>
  );
};
