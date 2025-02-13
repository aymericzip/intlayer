'use client';

import type { Locales } from '@intlayer/config';
import {
  type Dictionary,
  type MarkdownContent,
  type NestedContent,
  type EnumerationContent,
  type TranslationContent,
  NodeType,
  type KeyPath,
  type ContentNode,
  getLocaleName,
  getNodeType,
  type ConditionContent,
} from '@intlayer/core';
import { useConfiguration, useEditedContent } from '@intlayer/editor-react';
import { Plus, WandSparkles, X } from 'lucide-react';
import { useState, type FC } from 'react';
import { useDictionary, useLocale } from 'react-intlayer';
import { useAuditContentDeclarationField } from '../../../hooks';
import { renameKey } from '../../../utils/object';
import { Button } from '../../Button';
import {
  ContentEditorInputProps as ContentEditorInputPropsBase,
  ContentEditorInput as ContentEditorInputBase,
} from '../../ContentEditor/ContentEditorInput';
import {
  ContentEditorTextAreaProps as ContentEditorTextAreaPropsBase,
  ContentEditorTextArea as ContentEditorTextAreaBase,
} from '../../ContentEditor/ContentEditorTextArea';
import { Label } from '../../Label';
import { useLocaleSwitcherContent } from '../../LocaleSwitcherContentDropDown';
import { MarkdownRenderer } from '../../MarkDownRender';
import {
  type SwitchSelectorChoices,
  type SwitchSelectorProps,
  SwitchSelector,
} from '../../SwitchSelector';
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
};

const ContentEditorTextArea: FC<ContentEditorTextAreaProps> = ({
  keyPath,
  dictionary,
  ...props
}) => {
  const { addEditedContent } = useEditedContent();
  const configuration = useConfiguration();
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
              locales: configuration.internationalization.locales ?? [],
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

type ContentEditorInputProps = Omit<
  ContentEditorInputPropsBase,
  'onContentChange'
> & {
  keyPath: KeyPath[];
  dictionary: Dictionary;
};

const ContentEditorInput: FC<ContentEditorInputProps> = ({
  keyPath,
  dictionary,
  ...props
}) => {
  const { addEditedContent } = useEditedContent();

  return (
    <ContentEditorInputBase
      variant="default"
      onContentChange={(newValue) =>
        addEditedContent(dictionary.key, newValue, keyPath)
      }
      {...props}
    />
  );
};

const toggleContent = [
  {
    content: 'False',
    value: false,
  },
  {
    content: 'True',
    value: true,
  },
] as SwitchSelectorChoices<boolean>;

type ContentEditorToggleProps = SwitchSelectorProps & {
  dictionary: Dictionary;
  keyPath: KeyPath[];
};

const ContentEditorToggle: FC<ContentEditorToggleProps> = ({
  dictionary,
  keyPath,
  ...props
}) => {
  const { addEditedContent } = useEditedContent();

  return (
    <SwitchSelector
      choices={toggleContent}
      value={true}
      onChange={(value) => addEditedContent(dictionary.key, value, keyPath)}
      color="text"
      size="sm"
      {...props}
    />
  );
};

export type TextEditorProps = {
  dictionary: Dictionary;
  keyPath: KeyPath[];
  section: ContentNode;
  isDarkMode?: boolean;
};

const TranslationTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
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
          <tr key={translationKey} className="w-full" lang={translationKey}>
            <td className="flex w-full flex-col p-2">
              {selectedLocales.length > 1 && (
                <span className="w-full p-2 text-xs">
                  {getLocaleName(translationKey, locale)}
                </span>
              )}
              <TextEditor
                section={
                  (section as TranslationContent<string>)[NodeType.Translation][
                    translationKey
                  ] as string
                }
                keyPath={[
                  ...keyPath,
                  { type: NodeType.Translation, key: translationKey },
                ]}
                dictionary={dictionary}
              />
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
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewEnumeration } = useDictionary(navigationViewContent);

  return (
    <table className="w-full table-fixed gap-2">
      <tbody className="divide-y-[1.5px]">
        {Object.keys(
          (section as EnumerationContent<ContentNode>)[NodeType.Enumeration]
        ).map((enumKey) => (
          <tr key={enumKey} className="w-full">
            <td className="w-44 p-2">
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
              <TextEditor
                section={
                  (section as EnumerationContent<string>)[NodeType.Enumeration][
                    enumKey as any
                  ] as string
                }
                keyPath={[
                  ...keyPath,
                  { type: NodeType.Enumeration, key: enumKey },
                ]}
                dictionary={dictionary}
              />
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
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewEnumeration } = useDictionary(navigationViewContent);

  return (
    <table className="w-full table-fixed gap-2">
      <tbody className="divide-y-[1.5px]">
        {['true', 'false', 'fallback'].map((condKey) => (
          <tr key={condKey} className="w-full">
            <td className="w-44 p-2">
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
              <TextEditor
                section={
                  (section as EnumerationContent<string>)[NodeType.Enumeration][
                    condKey as any
                  ] as string
                }
                keyPath={[
                  ...keyPath,
                  {
                    type: NodeType.Array,
                    key: parseInt(condKey),
                  } as KeyPath,
                ]}
                dictionary={dictionary}
              />
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
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewElement } = useDictionary(navigationViewContent);

  return (
    <table className="w-full gap-2">
      <tbody className="divide-y-[1.5px]">
        {(section as unknown as ContentNode[]).map((subSection, index) => (
          <tr key={JSON.stringify(subSection)} className="w-full">
            <td className="p-2">{index}</td>
            <td className="w-full p-2">
              <TextEditor
                section={subSection}
                keyPath={[
                  ...keyPath,
                  {
                    type: NodeType.Array,
                    key: index,
                  },
                ]}
                dictionary={dictionary}
              />
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

enum MarkdownViewMode {
  Edit,
  Preview,
}

const MarkdownTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  isDarkMode,
}) => {
  const [mode, setMode] = useState(MarkdownViewMode.Edit);
  const toggleContent = [
    {
      content: 'Edit',
      value: MarkdownViewMode.Edit,
    },
    {
      content: 'Preview',
      value: MarkdownViewMode.Preview,
    },
  ] as SwitchSelectorChoices<MarkdownViewMode>;

  const content = (section as MarkdownContent)[NodeType.Markdown];

  return (
    <div className="flex w-full flex-col justify-center gap-6 p-2">
      <SwitchSelector
        choices={toggleContent}
        value={mode}
        onChange={setMode}
        color="text"
        size="sm"
        className="ml-auto"
      />
      {mode === MarkdownViewMode.Edit && (
        <ContentEditorTextArea
          variant="default"
          aria-label="Edit field"
          keyPath={[...keyPath, { type: NodeType.Markdown }]}
          dictionary={dictionary}
        >
          {content}
        </ContentEditorTextArea>
      )}
      {mode === MarkdownViewMode.Preview && (
        <MarkdownRenderer isDarkMode={isDarkMode}>{content}</MarkdownRenderer>
      )}
    </div>
  );
};

const NestedTextEditor: FC<TextEditorProps> = ({
  keyPath,
  dictionary,
  section,
  ...props
}) => {
  const { addEditedContent } = useEditedContent();

  const content = (section as NestedContent)[NodeType.Nested];
  const childrenKeyPath = [...keyPath, { type: NodeType.Nested }] as KeyPath[];

  return (
    <div className="w-full p-2">
      <Label>Dictionary key</Label>
      <ContentEditorInputBase
        aria-label="Edit field"
        type="text"
        variant="default"
        onContentChange={(newValue) => {
          addEditedContent(
            dictionary.key,
            {
              ...content,
              dictionaryKey: String(newValue),
            },
            childrenKeyPath
          );
        }}
        {...props}
      >
        {content.dictionaryKey ?? ''}
      </ContentEditorInputBase>

      <Label>Path (optional)</Label>
      <ContentEditorInputBase
        aria-label="Edit field"
        type="text"
        variant="default"
        onContentChange={(newValue) => {
          addEditedContent(
            dictionary.key,
            {
              ...content,
              path: newValue !== '' ? newValue : undefined,
            },
            childrenKeyPath
          );
        }}
        {...props}
      >
        {content.path ?? ''}
      </ContentEditorInputBase>
    </div>
  );
};

export const TextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  isDarkMode,
}) => {
  const { tsxNotEditable } = useDictionary(navigationViewContent);
  const nodeType = getNodeType(section);

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
        <NestedTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
        />
      );
    }

    if (nodeType === NodeType.Translation) {
      return (
        <TranslationTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
        />
      );
    }

    if (nodeType === NodeType.Enumeration) {
      return (
        <EnumerationTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
        />
      );
    }

    if (nodeType === NodeType.Condition) {
      return (
        <ConditionTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
        />
      );
    }

    if (nodeType === NodeType.Markdown) {
      return (
        <MarkdownTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
          isDarkMode={isDarkMode}
        />
      );
    }

    if (nodeType === NodeType.Array) {
      return (
        <ArrayTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
        />
      );
    }
  }

  if (nodeType === NodeType.Number) {
    return (
      <div className="w-full p-2">
        <ContentEditorInput
          dictionary={dictionary}
          keyPath={keyPath}
          type="number"
          aria-label="Edit field"
        >
          {section as number}
        </ContentEditorInput>
      </div>
    );
  }

  if (nodeType === NodeType.Text) {
    return (
      <div className="w-full p-2">
        <ContentEditorTextArea
          variant="default"
          aria-label="Edit field"
          keyPath={keyPath}
          dictionary={dictionary}
        >
          {section as string}
        </ContentEditorTextArea>
      </div>
    );
  }

  if (nodeType === NodeType.Boolean) {
    return (
      <div className="w-full p-2">
        <ContentEditorToggle
          dictionary={dictionary}
          keyPath={keyPath}
          value={section as boolean}
        />
      </div>
    );
  }

  return (
    <div className="w-full p-2">
      Error. Format not supported.
      {JSON.stringify(section)}
    </div>
  );
};
