/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Locales } from '@intlayer/config';
import {
  type EnumerationContent,
  type TranslationContent,
  NodeType,
  type KeyPath,
  type ContentNode,
  getLocaleName,
  Dictionary,
  getSectionType,
  type ConditionContent,
  MarkdownContent,
} from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import { Plus, WandSparkles, X } from 'lucide-react';
import type { FC } from 'react';
import { useDictionary, useLocale } from 'react-intlayer';
import { useAuditContentDeclarationField } from '../../../hooks';
import { renameKey } from '../../../utils/object';
import { Button } from '../../Button';
import {
  ContentEditorTextArea as ContentEditorTextAreaBase,
  ContentEditorTextAreaProps as ContentEditorTextAreaPropsBase,
} from '../../ContentEditor/ContentEditorTextArea';
import { useLocaleSwitcherContent } from '../../LocaleSwitcherContentDropDown';
import { EnumKeyInput } from '../EnumKeyInput';
import { getIsEditableSection } from '../getIsEditableSection';
import { navigationViewContent } from '../NavigationView/navigationViewNode.content';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

type ContentEditorTextAreaProps = Omit<
  ContentEditorTextAreaPropsBase,
  'onContentChange'
> & {
  keyPath: KeyPath[];
  dictionary: Dictionary;
  locales: Locales[];
};

const ContentEditorTextArea: FC<ContentEditorTextAreaProps> = ({
  keyPath,
  dictionary,
  locales,
  ...props
}) => {
  const { addEditedContent } = useEditedContent();
  const { auditContentDeclarationField, isLoading: isAuditing } =
    useAuditContentDeclarationField();

  return (
    <ContentEditorTextAreaBase
      variant="default"
      onContentChange={(newValue) =>
        addEditedContent(dictionary.key, newValue, keyPath)
      }
      additionalButtons={
        <Button
          Icon={WandSparkles}
          label="Audit"
          variant="hoverable"
          size="icon-sm"
          color="text"
          className="cursor-pointer hover:scale-110"
          isLoading={isAuditing}
          onClick={() => {
            auditContentDeclarationField({
              fileContent: JSON.stringify(dictionary),
              keyPath,
              locales,
            }).then((response) => {
              if (!response.data) return;

              try {
                const editedContent = response.data.fileContent as string;

                addEditedContent(dictionary.key, editedContent, keyPath);
              } catch (error) {
                console.error(error);
              }
            });
          }}
        />
      }
      {...props}
    />
  );
};

export type TextEditorProps = {
  dictionary: Dictionary;
  keyPath: KeyPath[];
  section: ContentNode;
  locales: Locales[];
};

const TranslationTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  locales,
}: TextEditorProps) => {
  const { locale } = useLocale();
  const { selectedLocales, availableLocales } = useLocaleSwitcherContent();

  const sectionContent = (section as TranslationContent<string>)[
    NodeType.Translation
  ] as Record<Locales, string>;

  const sectionContentKeys = Object.keys(sectionContent) as Locales[];

  const isFiltered = availableLocales.length > selectedLocales.length;

  const localesList = isFiltered
    ? selectedLocales
    : // If the translation include content in other locales, we display all of them
      [...new Set([...availableLocales, ...sectionContentKeys])];

  return (
    <table className="w-full gap-2">
      <tbody className="divide-y-[1.5px]">
        {localesList.map((translationKey) => (
          <tr
            key={translationKey}
            className="border-text dark:border-text-dark w-full"
            lang={translationKey}
          >
            <td className="flex w-full flex-col p-2">
              {selectedLocales.length > 1 && (
                <span className="w-full p-2 text-xs">
                  {getLocaleName(translationKey, locale)}
                </span>
              )}
              <ContentEditorTextArea
                variant="default"
                aria-label="Edit field"
                keyPath={[
                  ...keyPath,
                  { type: NodeType.Translation, key: translationKey },
                ]}
                dictionary={dictionary}
                locales={locales}
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
      </tbody>
    </table>
  );
};

const EnumerationTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  locales,
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewEnumeration } = useDictionary(navigationViewContent);

  return (
    <table className="w-full table-fixed gap-2">
      <tbody className="divide-y-[1.5px]">
        {Object.keys(
          (section as EnumerationContent<ContentNode>)[NodeType.Enumeration]
        ).map((enumKey) => (
          <tr
            key={enumKey}
            className="border-text dark:border-text-dark w-full"
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
                    addEditedContent(dictionary.key, undefined, [
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

                    addEditedContent(dictionary.key, newValue, keyPath);
                  }}
                />
              </div>
            </td>
            <td className="w-full p-2">
              <ContentEditorTextArea
                variant="default"
                aria-label="Edit field"
                keyPath={[
                  ...keyPath,
                  { type: NodeType.Enumeration, key: enumKey },
                ]}
                dictionary={dictionary}
                locales={locales}
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
      </tbody>

      <tfoot>
        <Button
          label={addNewEnumeration.label.value}
          variant="hoverable"
          color="neutral"
          textAlign="left"
          onClick={() =>
            addEditedContent(
              dictionary.key,
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
      </tfoot>
    </table>
  );
};

const ConditionTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  locales,
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewEnumeration } = useDictionary(navigationViewContent);

  return (
    <table className="w-full table-fixed gap-2">
      <tbody className="divide-y-[1.5px]">
        {['true', 'false', 'fallback'].map((condKey) => (
          <tr
            key={condKey}
            className="border-text dark:border-text-dark w-full"
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
                    addEditedContent(dictionary.key, undefined, [
                      ...keyPath,
                      {
                        type: NodeType.Condition,
                        key: condKey,
                      },
                    ])
                  }
                />
                <EnumKeyInput
                  value={condKey}
                  onChange={(value) => {
                    const preValueContent = (
                      section as ConditionContent<string>
                    )[NodeType.Condition];
                    const newValueContent = renameKey(
                      preValueContent,
                      condKey as keyof typeof preValueContent,
                      value
                    );
                    const newValue = {
                      ...(section as ConditionContent<string>),
                      [NodeType.Condition]: newValueContent,
                    };

                    addEditedContent(dictionary.key, newValue, keyPath);
                  }}
                />
              </div>
            </td>
            <td className="w-full p-2">
              <ContentEditorTextArea
                variant="default"
                aria-label="Edit field"
                keyPath={[
                  ...keyPath,
                  { type: NodeType.Enumeration, key: condKey },
                ]}
                dictionary={dictionary}
                locales={locales}
              >
                {
                  (section as EnumerationContent<string>)[NodeType.Enumeration][
                    condKey as any
                  ] as string
                }
              </ContentEditorTextArea>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <Button
          label={addNewEnumeration.label.value}
          variant="hoverable"
          color="neutral"
          textAlign="left"
          onClick={() =>
            addEditedContent(
              dictionary.key,
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
      </tfoot>
    </table>
  );
};

const ArrayTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  locales,
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewElement } = useDictionary(navigationViewContent);

  return (
    <table className="w-full gap-2">
      <tbody className="divide-y-[1.5px]">
        {(section as unknown as ContentNode[]).map((subSection, index) => (
          <tr
            key={JSON.stringify(subSection)}
            className="border-text dark:border-text-dark w-full"
          >
            <td className="p-2">{index}</td>
            <td className="w-full p-2">
              <ContentEditorTextArea
                variant="default"
                aria-label="Edit field"
                keyPath={[
                  ...keyPath,
                  {
                    type: NodeType.Array,
                    key: index,
                  },
                ]}
                dictionary={dictionary}
                locales={locales}
              >
                {subSection as string}
              </ContentEditorTextArea>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
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
                key: (section as unknown as ContentNode[]).length,
              },
            ];
            addEditedContent(dictionary.key, '', newKeyPath, false);
          }}
          Icon={Plus}
        >
          {addNewElement.text}
        </Button>
      </tfoot>
    </table>
  );
};

const MarkdownTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  locales,
}) => {
  return (
    <ContentEditorTextArea
      variant="default"
      aria-label="Edit field"
      keyPath={[...keyPath, { type: NodeType.Markdown }]}
      dictionary={dictionary}
      locales={locales}
    >
      {(section as MarkdownContent)[NodeType.Markdown]}
    </ContentEditorTextArea>
  );
};

export const TextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  locales,
}) => {
  const { tsxNotEditable, nestNode } = useDictionary(navigationViewContent);
  const nodeType = getSectionType(section);
  const isEditableSection = getIsEditableSection(section);

  if (!isEditableSection) return <></>;

  if (typeof section === 'object') {
    if (nodeType === NodeType.ReactNode) {
      return (
        <>
          <span>[React Node]</span>
          <span className="text-neutral dark:text-neutral-dark text-xs">
            {tsxNotEditable}
          </span>
        </>
      );
    }

    if (nodeType === NodeType.Nested) {
      return (
        <>
          <span>[Nest Node]</span>
          <span className="text-neutral dark:text-neutral-dark text-xs">
            {nestNode.text1}
            {nestNode.text2}
          </span>
        </>
      );
    }

    if (nodeType === NodeType.Translation) {
      return (
        <TranslationTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
          locales={locales}
        />
      );
    }

    if (nodeType === NodeType.Enumeration) {
      return (
        <EnumerationTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
          locales={locales}
        />
      );
    }

    if (nodeType === NodeType.Condition) {
      return (
        <ConditionTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
          locales={locales}
        />
      );
    }

    if (nodeType === NodeType.Markdown) {
      return (
        <MarkdownTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
          locales={locales}
        />
      );
    }

    if (nodeType === NodeType.Array) {
      return (
        <ArrayTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
          locales={locales}
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
          keyPath={keyPath}
          dictionary={dictionary}
          locales={locales}
        >
          {section as string}
        </ContentEditorTextArea>
      </div>
    );
  }

  return <>Error loading node</>;
};
