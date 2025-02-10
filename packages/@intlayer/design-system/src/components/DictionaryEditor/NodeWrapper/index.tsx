/* eslint-disable import/no-cycle */
'use client';

import type { Locales } from '@intlayer/config/client';
import {
  type EnumerationContent,
  type TranslationContent,
  NodeType,
  type KeyPath,
  type ContentNode,
  NestedContent,
  ConditionContent,
  MarkdownContent,
} from '@intlayer/core';
import {
  createElement,
  type ReactElement,
  type ReactNode,
  type FC,
} from 'react';
import { ArrayWrapper } from './ArrayWrapper';
import { ConditionWrapper } from './ConditionWrapper';
import { EnumerationWrapper } from './EnumerationWrapper';
import { MarkdownWrapper } from './MarkdownWrapper';
import { NestedObjectWrapper } from './NestedObjectWrapper';
import { StringWrapper } from './StringWrapper';
import { TranslationWrapper } from './TranslationWrapper';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' && typeof node?.props !== 'undefined';

export type NodeWrapperProps = {
  keyPath: KeyPath[];
  section: ContentNode;
  onContentChange: (content: { keyPath: KeyPath[]; newValue: string }) => void;
  locale: Locales;
  editedContent: ContentNode;
  focusedKeyPath: KeyPath[] | undefined;
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
  onClickEdit?: (keyPath: KeyPath[]) => void;
};

const createReactElement = (element: ReactElement) => {
  if (typeof element === 'string') {
    // If it's a string, simply return it (used for text content)
    return element;
  }

  const convertChildrenAsArray = (element: ReactElement): ReactElement => {
    if (element?.props && typeof element.props.children === 'object') {
      const childrenResult: ReactNode[] = [];
      const { children } = element.props;

      // Create the children elements recursively, if any
      Object.keys(children).forEach((key) => {
        childrenResult.push(createReactElement(children[key]));
      });

      return {
        ...element,
        props: { ...element.props, children: childrenResult },
      };
    }

    return {
      ...element,
      props: { ...element.props, children: element.props.children },
    };
  };

  const fixedElement = convertChildrenAsArray(element);

  const { type, props } = fixedElement;

  // Create and return the React element
  return createElement(type ?? 'div', props, ...props.children);
};

export const NodeWrapper: FC<NodeWrapperProps> = (props) => {
  const { section } = props;

  if (typeof section === 'object') {
    if (isReactNode(section as Record<string, unknown>)) {
      return (
        <>
          {createReactElement(section as unknown as ReactElement)}
          <span className="text-neutral dark:text-neutral-dark text-xs">
            React node not editable
          </span>
        </>
      );
    }

    if ((section as NestedContent).nodeType === NodeType.Nested) {
      return (
        <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
          [Nested] Dictionary
        </div>
      );
    }

    if ((section as MarkdownContent).nodeType === NodeType.Markdown) {
      return (
        <MarkdownWrapper {...props} section={section as MarkdownContent} />
      );
    }

    if (
      (section as TranslationContent<ContentNode>).nodeType ===
      NodeType.Translation
    ) {
      return (
        <TranslationWrapper
          {...props}
          section={section as TranslationContent<ContentNode>}
        />
      );
    }

    if (
      (section as EnumerationContent<ContentNode>).nodeType ===
      NodeType.Enumeration
    ) {
      return (
        <EnumerationWrapper
          {...props}
          section={section as EnumerationContent<ContentNode>}
        />
      );
    }

    if (
      (section as ConditionContent<ContentNode>).nodeType === NodeType.Condition
    ) {
      return (
        <ConditionWrapper
          {...props}
          section={section as ConditionContent<ContentNode>}
        />
      );
    }

    if (Array.isArray(section)) {
      return <ArrayWrapper {...props} section={section as ContentNode[]} />;
    }

    return (
      <NestedObjectWrapper
        {...props}
        section={section as Record<string, ContentNode>}
      />
    );
  }

  if (typeof section === 'string') {
    return <StringWrapper {...props} section={section} />;
  }
};
