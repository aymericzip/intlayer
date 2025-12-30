'use client';

import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Select } from '../Select';
import { useCodeContext } from './CodeContext';

export const CodeFormatSelector: FC = () => {
  const { codeFormat, setCodeFormat, setContentDeclarationFormat } =
    useCodeContext();
  const content = useIntlayer('code-selectors');

  return (
    <Select
      value={codeFormat}
      onValueChange={(value) => {
        setCodeFormat(value as typeof codeFormat);
        setContentDeclarationFormat(value as typeof codeFormat);
      }}
    >
      <Select.Trigger
        className="py-1!"
        aria-label={content.codeFormat.label.value}
      >
        <Select.Value placeholder={content.codeFormat.placeholder.value} />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="typescript">TypeScript</Select.Item>
        <Select.Item value="esm">ESM</Select.Item>
        <Select.Item value="commonjs">CommonJS</Select.Item>
      </Select.Content>
    </Select>
  );
};
