'use client';

import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Select } from '../Select';
import { useCodeContext } from './CodeContext';

export const ContentDeclarationFormatSelector: FC = () => {
  const { contentDeclarationFormat, setContentDeclarationFormat } =
    useCodeContext();
  const content = useIntlayer('code-selectors');

  return (
    <Select
      value={contentDeclarationFormat}
      onValueChange={setContentDeclarationFormat}
    >
      <Select.Trigger
        className="py-1!"
        aria-label={content.contentDeclarationFormat.label.value}
      >
        <Select.Value
          placeholder={content.contentDeclarationFormat.placeholder.value}
        />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="typescript">TypeScript</Select.Item>
        <Select.Item value="commonjs">CommonJS</Select.Item>
        <Select.Item value="esm">ESM</Select.Item>
        <Select.Item value="json">JSON</Select.Item>
      </Select.Content>
    </Select>
  );
};
