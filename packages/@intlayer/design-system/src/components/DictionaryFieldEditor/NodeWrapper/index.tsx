import type { Locales } from '@intlayer/config/client';
import {
  type EnumerationContent,
  type TranslationContent,
  NodeType,
  type KeyPath,
  type DictionaryValue,
} from '@intlayer/core';
import { ChevronRight } from 'lucide-react';
import {
  createElement,
  type ReactElement,
  type ReactNode,
  type FC,
} from 'react';
import type { FieldContent } from '..';
import { Button } from '../../Button';
import { ContentEditorTextArea } from '../../ContentEditor/ContentEditorTextArea';
import { getEditedContentValue } from '../../DictionaryEditor/NodeWrapper/StringWrapper';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' && typeof node?.props !== 'undefined';

export interface NodeWrapperProps {
  keyPath: KeyPath[];
  section: DictionaryValue;
  onContentChange?: (content: { keyPath: KeyPath[]; newValue: string }) => void;
  locale: Locales;
  editedContent?: FieldContent[];
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
}

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
  const { section, keyPath, onFocusKeyPath, onContentChange, editedContent } =
    props;

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
        <div className="flex flex-col justify-between gap-2">
          {Object.keys(
            (section as TranslationContent<DictionaryValue>)[
              NodeType.Translation
            ]
          ).map((translationKey) => (
            <Button
              label={`Go to translation ${translationKey}`}
              key={translationKey}
              variant="hoverable"
              color="text"
              onClick={() =>
                onFocusKeyPath([
                  ...keyPath,
                  { type: NodeType.Translation, key: translationKey },
                ])
              }
              IconRight={ChevronRight}
            >
              {translationKey}
            </Button>
          ))}
        </div>
      );
    }

    if (
      (section as EnumerationContent<DictionaryValue>).nodeType ===
      NodeType.Enumeration
    ) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {Object.keys(
            (section as EnumerationContent<DictionaryValue>)[
              NodeType.Enumeration
            ]
          ).map((enumKey) => (
            <Button
              label={`Go to enum ${enumKey}`}
              key={enumKey}
              variant="hoverable"
              color="text"
              onClick={() =>
                onFocusKeyPath([
                  ...keyPath,
                  { type: NodeType.Enumeration, key: enumKey },
                ])
              }
              IconRight={ChevronRight}
            >
              {enumKey}
            </Button>
          ))}
        </div>
      );
    }

    if (Array.isArray(section)) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {section.map((_subSection, index) => (
            <Button
              label={`Go to item ${index}`}
              key={index}
              variant="hoverable"
              color="text"
              IconRight={ChevronRight}
              onClick={() =>
                onFocusKeyPath([
                  ...keyPath,
                  { type: 'ArrayExpression', key: index },
                ])
              }
            >
              {index}
            </Button>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-between gap-2">
        {Object.keys(section).map((key) => (
          <Button
            label={`Go to ${key}`}
            key={key}
            color="text"
            variant="hoverable"
            onClick={() =>
              onFocusKeyPath([...keyPath, { type: 'ObjectExpression', key }])
            }
            IconRight={ChevronRight}
          >
            {key}
          </Button>
        ))}
      </div>
    );
  }

  if (typeof section === 'string') {
    return (
      <ContentEditorTextArea
        aria-label="Edit field"
        onContentChange={(newValue) => onContentChange?.({ keyPath, newValue })}
      >
        {getEditedContentValue(editedContent, keyPath) ?? section}
      </ContentEditorTextArea>
    );
  }
};
