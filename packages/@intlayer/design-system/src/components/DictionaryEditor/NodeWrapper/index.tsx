'use client';

import {
  type ConditionContent,
  type EnumerationContent,
  type FileContent,
  getContentNodeByKeyPath,
  getNodeType,
  type InsertionContent,
  type MarkdownContent,
  type TranslationContent,
} from '@intlayer/core';
import { useEditorLocale } from '@intlayer/editor-react';
import {
  type ContentNode,
  type Dictionary,
  type KeyPath,
  type Locale,
  NodeType,
} from '@intlayer/types';
import { type FC, memo, type ReactNode, useMemo } from 'react';
import { ArrayWrapper } from './ArrayWrapper';
import { ConditionWrapper } from './ConditionWrapper';
import { EnumerationWrapper } from './EnumerationWrapper';
import { FileWrapper } from './FileWrapper';
import { InsertionWrapper } from './InsertionWrapper';
import { MarkdownWrapper } from './MarkdownWrapper';
import { NestedObjectWrapper } from './NestedObjectWrapper';
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
    if (nodeType === NodeType.ReactNode) {
      return (
        <span className="text-neutral text-xs">React node not editable</span>
      );
    }

    if (nodeType === NodeType.Nested) {
      return (
        <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
          [Nested] Dictionary
        </div>
      );
    }

    if (nodeType === NodeType.Markdown) {
      return (
        <MarkdownWrapper
          {...props}
          section={section as MarkdownContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeType.Translation) {
      return (
        <TranslationWrapper
          {...props}
          section={section as TranslationContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeType.Enumeration) {
      return (
        <EnumerationWrapper
          {...props}
          section={section as EnumerationContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeType.Condition) {
      return (
        <ConditionWrapper
          {...props}
          section={section as ConditionContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeType.Insertion) {
      return (
        <InsertionWrapper
          {...props}
          section={section as InsertionContent<ContentNode>}
        />
      );
    }

    if (nodeType === NodeType.Array) {
      return (
        <ArrayWrapper
          {...props}
          section={section as unknown as ContentNode[]}
        />
      );
    }

    if (nodeType === NodeType.File) {
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
});
