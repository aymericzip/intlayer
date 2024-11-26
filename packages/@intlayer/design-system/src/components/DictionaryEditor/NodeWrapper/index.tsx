/* eslint-disable import/no-cycle */
'use client';

import type { Locales } from '@intlayer/config/client';
import {
  type EnumerationContent,
  type TranslationContent,
  NodeType,
  type KeyPath,
  type DictionaryValue,
} from '@intlayer/core';
import {
  createElement,
  type ReactElement,
  type ReactNode,
  type FC,
} from 'react';
import { ArrayWrapper } from './ArrayWrapper';
import { EnumerationWrapper } from './EnumerationWrapper';
import { NestedObjectWrapper } from './NestedObjectWrapper';
import { StringWrapper } from './StringWrapper';
import { TranslationWrapper } from './TranslationWrapper';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' && typeof node?.props !== 'undefined';

export type NodeWrapperProps = {
  keyPath: KeyPath[];
  section: DictionaryValue;
  onContentChange: (content: { keyPath: KeyPath[]; newValue: string }) => void;
  locale: Locales;
  editedContent: DictionaryValue;
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
