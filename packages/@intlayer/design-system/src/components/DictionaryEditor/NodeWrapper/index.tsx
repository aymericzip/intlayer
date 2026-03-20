'use client';

import {
  getContentNodeByKeyPath,
  getNodeType,
} from '@intlayer/core/dictionaryManipulator';
import type {
  ConditionContent,
  EnumerationContent,
  FileContent,
  HTMLContent,
  InsertionContent,
  MarkdownContent,
  TranslationContent,
} from '@intlayer/core/transpiler';
import { useEditorLocale } from '@intlayer/editor-react';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { type FC, memo, type ReactNode, useMemo } from 'react';
import { ArrayWrapper } from './ArrayWrapper';
import { BooleanWrapper } from './BooleanWrapper';
import { ConditionWrapper } from './ConditionWrapper';
import { EnumerationWrapper } from './EnumerationWrapper';
import { FileWrapper } from './FileWrapper';
import { HtmlWrapper } from './HtmlWrapper';
import { InsertionWrapper } from './InsertionWrapper';
import { MarkdownWrapper } from './MarkdownWrapper';
import { NestedObjectWrapper } from './NestedObjectWrapper';
import { NumberWrapper } from './NumberWrapper';
import { StringWrapper } from './StringWrapper';
import { TranslationWrapper } from './TranslationWrapper';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

export type NodeWrapperProps = {
  keyPath: KeyPath[];
  dictionary: Dictionary;
  section: ContentNode;
  onContentChange: (content: { keyPath: KeyPath[]; newValue: string }) => void;
  locale: Locale;
  editedContent: ContentNode;
  focusedKeyPath: KeyPath[] | undefined;
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
  onClickEdit?: (keyPath: KeyPath[]) => void;
  renderSection?: (content: string) => ReactNode;
};

export const NodeWrapper: FC<NodeWrapperProps> = memo((props) => {
  const currentLocale = useEditorLocale();
  const section = useMemo(() => {
    const editedContentValue = getContentNodeByKeyPath(
      props.editedContent,
      props.keyPath,
      currentLocale
    );
    return editedContentValue ?? props.section;
  }, [props.editedContent, props.keyPath, props.section]);

  const nodeType = useMemo(() => getNodeType(section), [section]);

  if (typeof section === 'object') {
    if (nodeType === NodeTypes.REACT_NODE) {
      return (
        <span className="text-neutral text-xs">React node not editable</span>
      );
    }

    if (nodeType === NodeTypes.NESTED) {
      return (
        <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
          [Nested] Dictionary
        </div>
      );
    }

    if (nodeType === NodeTypes.MARKDOWN) {
      return (
        <MarkdownWrapper
          {...props}
          section={section as MarkdownContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeTypes.HTML) {
      return (
        <HtmlWrapper {...props} section={section as HTMLContent<ContentNode>} />
      );
    }

    if (nodeType === NodeTypes.TRANSLATION) {
      return (
        <TranslationWrapper
          {...props}
          section={section as TranslationContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeTypes.ENUMERATION) {
      return (
        <EnumerationWrapper
          {...props}
          section={section as EnumerationContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeTypes.CONDITION) {
      return (
        <ConditionWrapper
          {...props}
          section={section as ConditionContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeTypes.INSERTION) {
      return (
        <InsertionWrapper
          {...props}
          section={section as InsertionContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeTypes.ARRAY) {
      return (
        <ArrayWrapper
          {...props}
          section={section as unknown as ContentNode[]}
        />
      );
    }

    if (nodeType === NodeTypes.FILE) {
      return <FileWrapper {...props} section={section as FileContent} />;
    }

    return (
      <NestedObjectWrapper
        {...props}
        section={section as unknown as Record<string, ContentNode>}
      />
    );
  }

  if (typeof section === 'string') {
    return <StringWrapper {...props} section={section} />;
  }

  if (typeof section === 'number') {
    return <NumberWrapper {...props} section={section} />;
  }

  if (typeof section === 'boolean') {
    return <BooleanWrapper {...props} section={section} />;
  }
});
