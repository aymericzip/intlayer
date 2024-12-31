'use client';

import { FC, PropsWithChildren } from 'react';
import type { CodeCompAttributes } from './Code';
import { useCodeContext } from './CodeContext';

export const CodeConditionalRender: FC<
  PropsWithChildren<CodeCompAttributes>
> = ({ children, ...props }) => {
  const { packageManager, codeFormat, contentDeclarationFormat } =
    useCodeContext();

  const isPackageManagerUndefined = typeof props.packageManager === 'undefined';
  const isPackageManagerSelected = packageManager === props.packageManager;

  const isCodeFormatUndefined = typeof props.codeFormat === 'undefined';
  const isCodeFormatSelected = codeFormat === props.codeFormat;

  const isContentDeclarationFormatUndefined =
    typeof props.contentDeclarationFormat === 'undefined';
  const isContentDeclarationFormatSelected =
    contentDeclarationFormat === props.contentDeclarationFormat;

  if (
    (isPackageManagerUndefined || isPackageManagerSelected) &&
    (isCodeFormatUndefined || isCodeFormatSelected) &&
    (isContentDeclarationFormatUndefined || isContentDeclarationFormatSelected)
  ) {
    return children;
  }

  return <></>;
};
