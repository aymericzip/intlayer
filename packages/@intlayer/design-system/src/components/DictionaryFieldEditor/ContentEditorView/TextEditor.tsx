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
  getEmptyNode,
} from '@intlayer/core';
import { useConfiguration, useEditedContent } from '@intlayer/editor-react';
import { Plus, Trash, WandSparkles } from 'lucide-react';
import { Fragment, useState, type FC } from 'react';
import { useDictionary, useLocale } from 'react-intlayer';
import { useAuditContentDeclarationField } from '../../../hooks';
import { renameKey } from '../../../utils/object';
import { Button } from '../../Button';
import { Container } from '../../Container';
import {
  type ContentEditorInputProps as ContentEditorInputPropsBase,
  ContentEditorInput as ContentEditorInputBase,
} from '../../ContentEditor/ContentEditorInput';
import {
  type ContentEditorTextAreaProps as ContentEditorTextAreaPropsBase,
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
  const { locale, defaultLocale } = useLocale();
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

  const content = (section as TranslationContent<string>)[NodeType.Translation];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {localesList.map((translationKey) => (
          <Fragment key={translationKey}>
            <tr className="mt-2 w-full p-2 text-xs">
              {getLocaleName(translationKey, locale)}
            </tr>
            <tr>
              <TextEditorContainer
                section={
                  content[translationKey] ??
                  getEmptyNode(content[defaultLocale])
                }
                keyPath={[
                  ...keyPath,
                  { type: NodeType.Translation, key: translationKey },
                ]}
                dictionary={dictionary}
              />
            </tr>
          </Fragment>
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
  const { addNewEnumeration, removeEnumeration } = useDictionary(
    navigationViewContent
  );

  const content = (section as EnumerationContent<string>)[NodeType.Enumeration];
  const firstKey = Object.keys(content)[0] as keyof typeof content;

  return (
    <div className="flex flex-col gap-2">
      <table className="w-full">
        <tbody className="flex w-full flex-col gap-2">
          {Object.keys(
            (section as EnumerationContent<ContentNode>)[NodeType.Enumeration]
          ).map((enumKey) => {
            const childrenKeyPath = [
              ...keyPath,
              { type: NodeType.Enumeration },
            ] as KeyPath[];
            return (
              <Fragment key={enumKey}>
                <tr className="mt-2 w-full">
                  <div className="flex flex-1">
                    <Button
                      label={removeEnumeration.label.value}
                      variant="hoverable"
                      color="text"
                      Icon={Trash}
                      className="ml-auto"
                      onClick={() =>
                        addEditedContent(
                          dictionary.key,
                          undefined,
                          childrenKeyPath
                        )
                      }
                    >
                      {removeEnumeration.text}
                    </Button>
                  </div>
                </tr>
                <tr className="w-full p-2">
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
                </tr>
                <tr className="block w-full">
                  <TextEditor
                    section={
                      content[enumKey as keyof typeof content] ??
                      getEmptyNode(content[firstKey])
                    }
                    keyPath={childrenKeyPath}
                    dictionary={dictionary}
                  />
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <Button
        label={addNewEnumeration.label.value}
        variant="hoverable"
        color="neutral"
        textAlign="left"
        isFullWidth
        onClick={() =>
          addEditedContent(
            dictionary.key,
            getEmptyNode(content[firstKey]) ?? '',
            [...keyPath, { type: NodeType.Enumeration, key: 'unknown' }]
          )
        }
        Icon={Plus}
        className="m-2"
      >
        {addNewEnumeration.text}
      </Button>
    </div>
  );
};

const ConditionTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
}) => {
  const content = (section as ConditionContent<string>)[NodeType.Condition];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {['true', 'false', 'fallback'].map((condKey) => (
          <Fragment key={condKey}>
            <tr key={condKey} className="mt-2 block w-full p-2 text-xs">
              {String(condKey)}
            </tr>
            <tr key={condKey} className="block w-full">
              <TextEditorContainer
                section={
                  content[condKey as keyof typeof content] ??
                  getEmptyNode(content['true'])
                }
                keyPath={[
                  ...keyPath,
                  {
                    type: NodeType.Condition,
                    key: condKey,
                  } as KeyPath,
                ]}
                dictionary={dictionary}
              />
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

const ArrayTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewElement, removeElement } = useDictionary(navigationViewContent);

  return (
    <div className="flex flex-col gap-2">
      <table className="w-full">
        <tbody className="flex w-full flex-col gap-2">
          {(section as unknown as ContentNode[]).map((subSection, index) => (
            <Fragment key={JSON.stringify(subSection)}>
              <tr className="mt-2 flex w-full justify-between gap-2 p-2">
                <span className="text-xs">{String(index)}</span>
                <Button
                  label={removeElement.label.value}
                  variant="hoverable"
                  color="neutral"
                  className="ml-auto"
                  textAlign="left"
                  onClick={() => {
                    const newKeyPath: KeyPath[] = [
                      ...keyPath,
                      {
                        type: NodeType.Array,
                        key: (section as unknown as ContentNode[]).length,
                      },
                    ];
                    addEditedContent(dictionary.key, undefined, newKeyPath);
                  }}
                  Icon={Trash}
                >
                  {removeElement.text}
                </Button>
              </tr>

              <tr className="block w-full">
                <TextEditorContainer
                  section={
                    subSection ??
                    getEmptyNode((section as unknown as ContentNode[])[0])
                  }
                  keyPath={[
                    ...keyPath,
                    {
                      type: NodeType.Array,
                      key: index,
                    },
                  ]}
                  dictionary={dictionary}
                />
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      <Button
        label={addNewElement.label.value}
        variant="hoverable"
        color="neutral"
        textAlign="left"
        isFullWidth
        onClick={() => {
          const newKeyPath: KeyPath[] = [
            ...keyPath,
            {
              type: NodeType.Array,
              key: (section as unknown as ContentNode[]).length,
            },
          ];
          addEditedContent(
            dictionary.key,
            getEmptyNode((section as unknown as ContentNode[])[0]) ?? '',
            newKeyPath,
            false
          );
        }}
        Icon={Plus}
      >
        {addNewElement.text}
      </Button>
    </div>
  );
};

const ObjectTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
}) => (
  <>
    <table className="w-full">
      <tbody className="flex flex-col gap-2">
        {Object.keys(section as unknown as Record<string, ContentNode>).map(
          (key) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Object, key },
            ];
            const typedSection = section as unknown as Record<
              string,
              ContentNode
            >;
            const firstKey = Object.keys(
              typedSection
            )[0] as keyof typeof section;
            const subSection =
              typedSection[key as keyof typeof section] ??
              getEmptyNode(typedSection[firstKey]);

            return (
              <Fragment key={key}>
                <tr
                  key={JSON.stringify(subSection)}
                  className="mt-2 p-2 text-xs"
                >
                  {String(key)}
                </tr>
                <tr key={JSON.stringify(subSection)} className="block w-full">
                  <TextEditor
                    section={subSection}
                    keyPath={childKeyPath}
                    dictionary={dictionary}
                  />
                </tr>
              </Fragment>
            );
          }
        )}
      </tbody>
    </table>
  </>
);

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

  if (nodeType === NodeType.Object) {
    return (
      <>
        <ObjectTextEditor
          dictionary={dictionary}
          keyPath={keyPath}
          section={section}
        />
      </>
    );
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
      {JSON.stringify(section, null, 2)}
      {JSON.stringify(keyPath, null, 2)}
      NodeType : {nodeType}
    </div>
  );
};

export const TextEditorContainer: FC<TextEditorProps> = (props) => (
  <Container
    border
    background="none"
    className="top-6 flex h-full flex-1 flex-col gap-6 overflow-hidden p-2 md:sticky"
    roundedSize="xl"
  >
    <TextEditor {...props} />
  </Container>
);
