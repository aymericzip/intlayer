import type { Locales } from '@intlayer/config/client';
import {
  type EnumerationContent,
  type TranslationContent,
  NodeType,
  type KeyPath,
  type DictionaryValue,
} from '@intlayer/core';
import { ChevronRight, Plus } from 'lucide-react';
import {
  createElement,
  type ReactElement,
  type ReactNode,
  type FC,
} from 'react';
import { Button } from '../../Button';
import { ContentEditorTextArea } from '../../ContentEditor/ContentEditorTextArea';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../../DictionaryEditor';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

const isReactNode = (node: Record<string, unknown>): boolean =>
  typeof node?.key !== 'undefined' && typeof node?.props !== 'undefined';

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

export type NodeWrapperProps = {
  dictionaryId: string;
  keyPath: KeyPath[];
  section: DictionaryValue;
  locale: Locales;
  selectedKey?: KeyPath['key'];
};

export const NodeWrapper: FC<NodeWrapperProps> = ({
  section,
  keyPath,
  dictionaryId,
  selectedKey,
}) => {
  const addEditedContent = useEditedContentStore((s) => s.addEditedContent);
  const setFocusedContentKeyPath = useEditionPanelStore(
    (s) => s.setFocusedContentKeyPath
  );

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
              isActive={selectedKey === translationKey}
              variant="hoverable"
              color="text"
              onClick={() =>
                setFocusedContentKeyPath([
                  ...keyPath,
                  { type: NodeType.Translation, key: translationKey },
                ])
              }
              IconRight={ChevronRight}
            >
              {translationKey}
            </Button>
          ))}

          <Button
            label="Click to add translation"
            variant="hoverable"
            color="neutral"
            textAlign="left"
            onClick={() => {
              const newKeyPath: KeyPath[] = [
                ...keyPath,
                { type: 'ObjectExpression', key: 'newField' },
              ];
              addEditedContent(dictionaryId, {}, newKeyPath, false);
              setFocusedContentKeyPath(newKeyPath);
            }}
            Icon={Plus}
          >
            Add new translation
          </Button>
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
              isActive={selectedKey === enumKey}
              variant="hoverable"
              color="text"
              onClick={() =>
                setFocusedContentKeyPath([
                  ...keyPath,
                  { type: NodeType.Enumeration, key: enumKey },
                ])
              }
              IconRight={ChevronRight}
            >
              {enumKey}
            </Button>
          ))}
          <Button
            label="Click to add enumeration"
            variant="hoverable"
            color="neutral"
            textAlign="left"
            onClick={() => {
              const newKeyPath: KeyPath[] = [
                ...keyPath,
                { type: 'ObjectExpression', key: 'newField' },
              ];
              addEditedContent(dictionaryId, {}, newKeyPath, false);
              setFocusedContentKeyPath(newKeyPath);
            }}
            Icon={Plus}
          >
            Add new enumeration
          </Button>
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
              isActive={selectedKey === index}
              variant="hoverable"
              color="text"
              IconRight={ChevronRight}
              onClick={() =>
                setFocusedContentKeyPath([
                  ...keyPath,
                  { type: 'ArrayExpression', key: index },
                ])
              }
            >
              {index}
            </Button>
          ))}

          <Button
            label="Click to add element"
            variant="hoverable"
            color="neutral"
            textAlign="left"
            onClick={() => {
              const newKeyPath: KeyPath[] = [
                ...keyPath,
                { type: 'ObjectExpression', key: 'newField' },
              ];
              addEditedContent(dictionaryId, {}, newKeyPath, false);
              setFocusedContentKeyPath(newKeyPath);
            }}
            Icon={Plus}
          >
            Add new element
          </Button>
        </div>
      );
    }

    const sectionArray = Object.keys(section);
    return (
      <div className="flex flex-col justify-between gap-2">
        {sectionArray.map((key) => (
          <Button
            label={`Go to ${key}`}
            key={key}
            isActive={selectedKey === key}
            color="text"
            variant="hoverable"
            onClick={() =>
              setFocusedContentKeyPath([
                ...keyPath,
                { type: 'ObjectExpression', key },
              ])
            }
            IconRight={ChevronRight}
          >
            {key}
          </Button>
        ))}

        <Button
          label="Click to add field"
          variant="hoverable"
          color="neutral"
          textAlign="left"
          onClick={() => {
            const newKeyPath: KeyPath[] = [
              ...keyPath,
              { type: 'ObjectExpression', key: 'newField' },
            ];
            addEditedContent(dictionaryId, {}, newKeyPath, false);
            setFocusedContentKeyPath(newKeyPath);
          }}
          Icon={Plus}
        >
          Add new field
        </Button>
      </div>
    );
  }

  if (typeof section === 'string') {
    return (
      <ContentEditorTextArea
        aria-label="Edit field"
        onContentChange={(newValue) =>
          addEditedContent(dictionaryId, newValue, [
            ...keyPath,
            { type: 'ObjectExpression', key: 'newField' },
          ])
        }
      >
        {section}
      </ContentEditorTextArea>
    );
  }

  return <>Error loading section</>;
};
