'use client';

import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Select } from '../Select';
import type { CodeFormat } from './CodeContext';
import { useCodeContext } from './CodeContext';

type CodeFormatSelectorProps = {
  /** When provided, only the listed formats are shown as options. */
  availableFormats?: CodeFormat[];
};

export const CodeFormatSelector: FC<CodeFormatSelectorProps> = ({
  availableFormats,
}) => {
  const { codeFormat, setCodeFormat, setContentDeclarationFormat } =
    useCodeContext();
  const content = useIntlayer('code-selectors');

  const show = (format: CodeFormat) =>
    !availableFormats || availableFormats.includes(format);

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
        {show('typescript') && (
          <Select.Item value="typescript">TypeScript</Select.Item>
        )}
        {show('esm') && <Select.Item value="esm">ESM</Select.Item>}
        {show('commonjs') && (
          <Select.Item value="commonjs">CommonJS</Select.Item>
        )}
      </Select.Content>
    </Select>
  );
};
