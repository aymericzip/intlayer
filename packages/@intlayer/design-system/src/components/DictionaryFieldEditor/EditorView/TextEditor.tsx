/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getConfiguration } from '@intlayer/config/client';
import {
  type EnumerationContent,
  type TranslationContent,
  type RecursiveDictionaryValue,
  NodeType,
  type KeyPath,
  type DictionaryValue,
  getLocaleName,
} from '@intlayer/core';
import { Plus, X } from 'lucide-react';
import {
  createElement,
  type ReactElement,
  type ReactNode,
  type FC,
} from 'react';
import { useDictionary } from 'react-intlayer';
import { getSectionType } from '../../../utils/dictionary';
import { renameKey } from '../../../utils/object';
import { Button } from '../../Button';
import { ContentEditorTextArea } from '../../ContentEditor/ContentEditorTextArea';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../../DictionaryEditor';
import { EnumKeyInput } from '../EnumKeyInput';
import { getIsEditableSection } from '../getIsEditableSection';
import { navigationViewContent } from '../NavigationView/navigationViewNode.content';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

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
      Object.keys(children).forEach((key) =>
        childrenResult.push(createReactElement(children[key]))
      );

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

export type TextEditorProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  section: DictionaryValue;
};

const TranslationTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionaryKey,
}: TextEditorProps) => {
  const { locales } = getConfiguration().internationalization;
  const addEditedContent = useEditedContentStore((s) => s.addEditedContent);

  return (
    <table className="w-full gap-2">
      {locales.map((translationKey) => (
        <tr
          key={translationKey}
          className="border-text dark:border-text-dark w-full border-t-[1.5px]"
          lang={translationKey}
        >
          <td className="border-text dark:border-text-dark border-r-[1.5px] p-2">
            {getLocaleName(translationKey)}
          </td>
          <td className="w-full p-2">
            <ContentEditorTextArea
              variant="default"
              aria-label="Edit field"
              onContentChange={(newValue) =>
                addEditedContent(dictionaryKey, newValue, [
                  ...keyPath,
                  {
                    type: NodeType.Translation,
                    key: translationKey,
                  },
                ])
              }
            >
              {
                (section as TranslationContent<string>)[NodeType.Translation][
                  translationKey
                ] as string
              }
            </ContentEditorTextArea>
          </td>
        </tr>
      ))}
    </table>
  );
};

const EnumerationTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionaryKey,
}) => {
  const addEditedContent = useEditedContentStore((s) => s.addEditedContent);
  const { addNewEnumeration } = useDictionary(navigationViewContent);

  return (
    <table className="w-full table-fixed gap-2">
      {Object.keys(
        (section as EnumerationContent<DictionaryValue>)[NodeType.Enumeration]
      ).map((enumKey) => (
        <tr
          key={enumKey}
          className="border-text dark:border-text-dark w-full border-y-[1.5px]"
        >
          <td className="border-text dark:border-text-dark w-44 border-r-[1.5px] p-2">
            <div className="flex gap-1">
              <Button
                label="Remove"
                variant="hoverable"
                size="icon-md"
                color="text"
                Icon={X}
                className="w-16"
                onClick={() =>
                  addEditedContent(dictionaryKey, undefined, [
                    ...keyPath,
                    {
                      type: NodeType.Enumeration,
                      key: enumKey,
                    },
                  ])
                }
              />
              <EnumKeyInput
                value={enumKey}
                onChange={(value) => {
                  const preValueContent = (
                    section as EnumerationContent<string>
                  )[NodeType.Enumeration];
                  const newValueContent = renameKey(
                    preValueContent,
                    enumKey as keyof typeof preValueContent,
                    value
                  );
                  const newValue = {
                    ...(section as EnumerationContent<string>),
                    [NodeType.Enumeration]: newValueContent,
                  };

                  addEditedContent(dictionaryKey, newValue, keyPath);
                }}
              />
            </div>
          </td>
          <td className="w-full p-2">
            <ContentEditorTextArea
              variant="default"
              aria-label="Edit field"
              onContentChange={(newValue) =>
                addEditedContent(dictionaryKey, newValue, [
                  ...keyPath,
                  {
                    type: NodeType.Enumeration,
                    key: enumKey,
                  },
                ])
              }
            >
              {
                (section as EnumerationContent<string>)[NodeType.Enumeration][
                  enumKey as any
                ] as string
              }
            </ContentEditorTextArea>
          </td>
        </tr>
      ))}
      <Button
        label={addNewEnumeration.label.value}
        variant="hoverable"
        color="neutral"
        textAlign="left"
        onClick={() =>
          addEditedContent(
            dictionaryKey,
            '',
            [...keyPath, { type: NodeType.Enumeration, key: 'unknown' }],
            false
          )
        }
        Icon={Plus}
        className="m-2"
      >
        {addNewEnumeration.text}
      </Button>
    </table>
  );
};

const ArrayTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionaryKey,
}) => {
  const addEditedContent = useEditedContentStore((s) => s.addEditedContent);
  const setFocusedContentKeyPath = useEditionPanelStore(
    (s) => s.setFocusedContentKeyPath
  );
  const { addNewElement } = useDictionary(navigationViewContent);

  return (
    <table className="w-full gap-2">
      {(section as DictionaryValue[]).map((subSection, index) => (
        <tr
          key={JSON.stringify(subSection)}
          className="border-text dark:border-text-dark w-full border-t-[1.5px]"
        >
          <td className="border-text dark:border-text-dark border-r-[1.5px] p-2">
            {index}
          </td>
          <td className="w-full p-2">
            <ContentEditorTextArea
              variant="default"
              aria-label="Edit field"
              onContentChange={(newValue) => {
                addEditedContent(dictionaryKey, newValue, [
                  ...keyPath,
                  {
                    type: NodeType.Array,
                    key: index,
                  },
                ]);
              }}
            >
              {subSection as string}
            </ContentEditorTextArea>
          </td>
        </tr>
      ))}

      <Button
        label={addNewElement.label.value}
        variant="hoverable"
        color="neutral"
        textAlign="left"
        onClick={() => {
          const newKeyPath: KeyPath[] = [
            ...keyPath,
            {
              type: NodeType.Array,
              key: (section as DictionaryValue[]).length,
            },
          ];
          addEditedContent(dictionaryKey, '', newKeyPath, false);
        }}
        Icon={Plus}
      >
        {addNewElement.text}
      </Button>
    </table>
  );
};

export const TextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionaryKey,
}) => {
  const addEditedContent = useEditedContentStore((s) => s.addEditedContent);
  const { tsxNotEditable } = useDictionary(navigationViewContent);
  const nodeType = getSectionType(section);
  const isEditableSection = getIsEditableSection(section);

  if (!isEditableSection) return <></>;

  if (typeof section === 'object') {
    if (nodeType === NodeType.ReactNode) {
      return (
        <>
          {createReactElement(section as unknown as ReactElement)}
          <span className="text-neutral dark:text-neutral-dark text-xs">
            {tsxNotEditable}
          </span>
        </>
      );
    }

    if (nodeType === NodeType.Translation) {
      return (
        <TranslationTextEditor
          dictionaryKey={dictionaryKey}
          keyPath={keyPath}
          section={section}
        />
      );
    }

    if (nodeType === NodeType.Enumeration) {
      return (
        <EnumerationTextEditor
          dictionaryKey={dictionaryKey}
          keyPath={keyPath}
          section={section}
        />
      );
    }

    if (nodeType === NodeType.Array) {
      return (
        <ArrayTextEditor
          dictionaryKey={dictionaryKey}
          keyPath={keyPath}
          section={section}
        />
      );
    }
  }

  if (nodeType === NodeType.Text) {
    return (
      <div className="border-text dark:border-text-dark w-full border-t-[1.5px] p-2">
        <ContentEditorTextArea
          variant="default"
          aria-label="Edit field"
          onContentChange={(newValue) =>
            addEditedContent(dictionaryKey, newValue, keyPath)
          }
        >
          {section as string}
        </ContentEditorTextArea>
      </div>
    );
  }

  return <>Error loading section</>;
};
