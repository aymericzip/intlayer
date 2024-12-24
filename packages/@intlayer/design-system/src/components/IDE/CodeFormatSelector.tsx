'use client';

import type { FC } from 'react';
import { Select } from '../Select';
import { useCodeContext } from './CodeContext';

export const CodeFormatSelector: FC = () => {
  const { codeFormat, setCodeFormat, setContentDeclarationFormat } =
    useCodeContext();

  return (
    <Select
      value={codeFormat}
      onValueChange={(value) => {
        setCodeFormat(value as typeof codeFormat);
        setContentDeclarationFormat(value as typeof codeFormat);
      }}
    >
      <Select.Trigger>
        <Select.Value placeholder="Code Format" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="typescript">TypeScript</Select.Item>
        <Select.Item value="esm">ESM</Select.Item>
        <Select.Item value="commonjs">CommonJS</Select.Item>
      </Select.Content>
    </Select>
  );
};
