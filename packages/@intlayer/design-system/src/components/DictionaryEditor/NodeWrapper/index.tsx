'use client';

import type { Locales } from '@intlayer/config/client';
import {
  type EnumerationContent,
  type TranslationContent,
  NodeType,
  type KeyPath,
  type DictionaryValue,
} from '@intlayer/core';
import type { FC } from 'react';
import type { FileContent } from '../';
import { ArrayWrapper } from './ArrayWrapper';
import { EnumerationWrapper } from './EnumerationWrapper';
import { NestedObjectWrapper } from './NestedObjectWrapper';
import { StringWrapper } from './StringWrapper';
import { TranslationWrapper } from './TranslationWrapper';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

export interface NodeWrapperProps {
  keyPath: KeyPath[];
  section: DictionaryValue;
  onContentChange: (content: { keyPath: KeyPath[]; newValue: string }) => void;
  locale: Locales;
  editedContent?: FileContent[];
  focusedKeyPath: KeyPath[] | undefined;
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
}

export const NodeWrapper: FC<NodeWrapperProps> = (props) => {
  const { section } = props;

  if (typeof section === 'object') {
    if (
      (section as TranslationContent<DictionaryValue>).nodeType ===
      NodeType.Translation
    ) {
      return (
        <TranslationWrapper
          {...props}
          section={section as TranslationContent<DictionaryValue>}
        />
      );
    }

    if (
      (section as EnumerationContent<DictionaryValue>).nodeType ===
      NodeType.Enumeration
    ) {
      return (
        <EnumerationWrapper
          {...props}
          section={section as EnumerationContent<DictionaryValue>}
        />
      );
    }

    if (Array.isArray(section)) {
      return <ArrayWrapper {...props} section={section as DictionaryValue[]} />;
    }

    return (
      <NestedObjectWrapper
        {...props}
        section={section as Record<string, DictionaryValue>}
      />
    );
  }

  if (typeof section === 'string') {
    return <StringWrapper {...props} section={section} />;
  }
};
