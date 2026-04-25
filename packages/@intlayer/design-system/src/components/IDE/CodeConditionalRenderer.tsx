'use client';

import type { FC, PropsWithChildren } from 'react';
import type { CodeCompAttributes } from './Code';
import type { CodeFormat } from './CodeContext';
import { useCodeContext } from './CodeContext';

/** Parse a codeFormat prop that may be a single value or a JSON array string. */
const parseCodeFormats = (
  raw: string | undefined
): CodeFormat[] | undefined => {
  if (raw === undefined) return undefined;
  // JSON array string: `["typescript","esm","commonjs"]`
  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as CodeFormat[];
    } catch {
      // fall through
    }
  }
  return [raw as CodeFormat];
};

export const CodeConditionalRender: FC<
  PropsWithChildren<CodeCompAttributes>
> = ({ children, ...props }) => {
  const { packageManager, codeFormat, contentDeclarationFormat } =
    useCodeContext();

  const isPackageManagerUndefined = typeof props.packageManager === 'undefined';
  const isPackageManagerSelected = packageManager === props.packageManager;

  const formats = parseCodeFormats(props.codeFormat as string | undefined);
  const isCodeFormatUndefined = formats === undefined;
  const isCodeFormatSelected = formats ? formats.includes(codeFormat) : false;

  const contentFormats = parseCodeFormats(
    props.contentDeclarationFormat as string | undefined
  );
  const isContentDeclarationFormatUndefined = contentFormats === undefined;
  const isContentDeclarationFormatSelected = contentFormats
    ? contentFormats.includes(contentDeclarationFormat as CodeFormat)
    : false;

  if (
    (isPackageManagerUndefined || isPackageManagerSelected) &&
    (isCodeFormatUndefined || isCodeFormatSelected) &&
    (isContentDeclarationFormatUndefined || isContentDeclarationFormatSelected)
  ) {
    return children;
  }

  return <></>;
};
