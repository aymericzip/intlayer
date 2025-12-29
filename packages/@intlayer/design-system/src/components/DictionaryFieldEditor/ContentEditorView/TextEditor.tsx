'use client';

import {
  type ConditionContent,
  type EnumerationContent,
  type FileContent,
  type GenderContent,
  getEmptyNode,
  getLocaleName,
  getNodeType,
  type InsertionContent,
  type MarkdownContent,
  type TranslationContent,
} from '@intlayer/core';
import { useConfiguration, useEditedContent } from '@intlayer/editor-react';
import {
  type ContentNode,
  type Dictionary,
  type KeyPath,
  type Locale,
  type LocalesValues,
  NodeType,
} from '@intlayer/types';
import { Plus, Trash, WandSparkles } from 'lucide-react';
import { type FC, Fragment, type ReactNode, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { useAuditContentDeclarationField } from '../../../hooks';
import { renameKey } from '../../../utils/object';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from '../../Button';
import { Container } from '../../Container';
import {
  ContentEditorInput as ContentEditorInputBase,
  type ContentEditorInputProps as ContentEditorInputPropsBase,
} from '../../ContentEditor/ContentEditorInput';
import {
  ContentEditorTextArea as ContentEditorTextAreaBase,
  type ContentEditorTextAreaProps as ContentEditorTextAreaPropsBase,
} from '../../ContentEditor/ContentEditorTextArea';
import { InputVariant } from '../../Input';
import { Label } from '../../Label';
import { useLocaleSwitcherContent } from '../../LocaleSwitcherContentDropDown';
import { MarkdownRenderer } from '../../MarkDownRender';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
  SwitchSelectorColor,
  type SwitchSelectorProps,
  SwitchSelectorSize,
} from '../../SwitchSelector';
import { EnumKeyInput } from '../EnumKeyInput';

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
  const { editedContent, addEditedContent } = useEditedContent();
  const configuration = useConfiguration();
  const { mutate: auditContentDeclarationField, isPending: isAuditing } =
    useAuditContentDeclarationField();

  return (
    <ContentEditorTextAreaBase
      variant={InputVariant.DEFAULT}
      onContentChange={(newValue) =>
        addEditedContent(dictionary.localId!, newValue, keyPath)
      }
      additionalButtons={
        <Button
          Icon={WandSparkles}
          label="Audit"
          variant={ButtonVariant.HOVERABLE}
          size={ButtonSize.ICON_SM}
          color={ButtonColor.TEXT}
          className="cursor-pointer hover:scale-110"
          isLoading={isAuditing}
          onClick={() => {
            auditContentDeclarationField(
              {
                fileContent: JSON.stringify({
                  ...dictionary,
                  ...(editedContent?.[dictionary.localId!] ?? {}),
                }),
                keyPath,
                locales: configuration.internationalization.locales ?? [],
                aiOptions: {
                  apiKey: configuration.ai?.apiKey,
                  model: configuration.ai?.model,
                  temperature: configuration.ai?.temperature,
                },
              },
              {
                onSuccess: (response) => {
                  if (!response?.data) return;

                  try {
                    const editedContent = response.data.fileContent as string;

                    addEditedContent(
                      dictionary.localId!,
                      editedContent,
                      keyPath
                    );
                  } catch (error) {
                    console.error(error);
                  }
                },
              }
            );
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
      variant={InputVariant.DEFAULT}
      onContentChange={(newValue) =>
        addEditedContent(dictionary.localId!, newValue, keyPath)
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
      onChange={(value) =>
        addEditedContent(dictionary.localId!, value, keyPath)
      }
      color={SwitchSelectorColor.TEXT}
      size={SwitchSelectorSize.SM}
      {...props}
    />
  );
};

export type TextEditorProps = {
  dictionary: Dictionary;
  keyPath: KeyPath[];
  section: ContentNode;
  isDarkMode?: boolean;
  renderSection?: (content: string) => ReactNode;
  onContentChange?: (newValue: string) => void;
};

const TranslationTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  renderSection,
}: TextEditorProps) => {
  const { locale, defaultLocale } = useLocale();
  const { selectedLocales, availableLocales } = useLocaleSwitcherContent();

  const sectionContent = (section as TranslationContent<string>)[
    NodeType.Translation
  ] as Record<Locale, string>;

  const sectionContentKeys = Object.keys(sectionContent) as LocalesValues[];

  const isFiltered = availableLocales.length > selectedLocales.length;

  const localesList = isFiltered
    ? selectedLocales
    : // If the translation include content in other locales, we display all of them
      [...new Set([...availableLocales, ...sectionContentKeys])];

  const content: any = (section as TranslationContent<string>)[
    NodeType.Translation
  ];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {localesList.map((translationKey) => (
          <Fragment key={translationKey}>
            <tr className="mt-2 w-full p-2 text-xs">
              <td className="flex w-full">
                {getLocaleName(translationKey, locale)}
              </td>
            </tr>
            <tr className="flex">
              <td className="flex w-full">
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
                  renderSection={renderSection}
                />
              </td>
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
  renderSection,
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewEnumeration, removeEnumeration } =
    useIntlayer('navigation-view');

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
                  <td className="flex w-full">
                    <div className="flex flex-1">
                      <Button
                        label={removeEnumeration.label.value}
                        variant={ButtonVariant.HOVERABLE}
                        color={ButtonColor.TEXT}
                        Icon={Trash}
                        className="ml-auto"
                        onClick={() =>
                          addEditedContent(
                            dictionary.localId!,
                            undefined,
                            childrenKeyPath
                          )
                        }
                      >
                        {removeEnumeration.text}
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="w-full p-2">
                  <td className="flex w-full">
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

                        addEditedContent(
                          dictionary.localId!,
                          newValue,
                          keyPath
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr className="block w-full">
                  <td className="flex w-full">
                    <TextEditor
                      section={
                        content[enumKey as keyof typeof content] ??
                        getEmptyNode(content[firstKey])
                      }
                      keyPath={childrenKeyPath}
                      dictionary={dictionary}
                      renderSection={renderSection}
                    />
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <Button
        label={addNewEnumeration.label.value}
        variant={ButtonVariant.HOVERABLE}
        color={ButtonColor.NEUTRAL}
        textAlign={ButtonTextAlign.LEFT}
        isFullWidth
        onClick={() =>
          addEditedContent(
            dictionary.localId!,
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
  renderSection,
}) => {
  const content = (section as ConditionContent<string>)[NodeType.Condition];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {['true', 'false', 'fallback'].map((condKey) => (
          <Fragment key={condKey}>
            <tr key={condKey} className="mt-2 block w-full p-2 text-xs">
              <td className="flex w-full">{String(condKey)}</td>
            </tr>
            <tr key={condKey} className="block w-full">
              <td className="flex w-full">
                <TextEditorContainer
                  section={
                    content[condKey as keyof typeof content] ??
                    getEmptyNode(content.true)
                  }
                  keyPath={[
                    ...keyPath,
                    {
                      type: NodeType.Condition,
                      key: condKey,
                    } as KeyPath,
                  ]}
                  dictionary={dictionary}
                  renderSection={renderSection}
                />
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

const GenderTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  renderSection,
}) => {
  const content = (section as GenderContent<string>)[NodeType.Gender];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {['male', 'female', 'fallback'].map((condKey) => (
          <Fragment key={condKey}>
            <tr key={condKey} className="mt-2 block w-full p-2 text-xs">
              <td className="flex w-full">{String(condKey)}</td>
            </tr>
            <tr key={condKey} className="block w-full">
              <td className="flex w-full">
                <TextEditorContainer
                  section={
                    content[condKey as keyof typeof content] ??
                    getEmptyNode(content.male)
                  }
                  keyPath={[
                    ...keyPath,
                    {
                      type: NodeType.Gender,
                      key: condKey,
                    } as KeyPath,
                  ]}
                  dictionary={dictionary}
                  renderSection={renderSection}
                />
              </td>
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
  renderSection,
}) => {
  const { addEditedContent } = useEditedContent();
  const { addNewElement, removeElement } = useIntlayer('navigation-view');

  return (
    <div className="flex flex-col gap-2">
      <table className="w-full">
        <tbody className="flex w-full flex-col gap-2">
          {(section as unknown as ContentNode[]).map((subSection, index) => (
            <Fragment key={JSON.stringify(subSection)}>
              <tr className="mt-2 w-full p-2">
                <td className="flex w-full">
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="text-xs">{String(index)}</span>
                    <Button
                      label={removeElement.label.value}
                      variant={ButtonVariant.HOVERABLE}
                      color={ButtonColor.NEUTRAL}
                      className="ml-auto"
                      textAlign={ButtonTextAlign.LEFT}
                      onClick={() => {
                        const newKeyPath: KeyPath[] = [
                          ...keyPath,
                          {
                            type: NodeType.Array,
                            key: (section as unknown as ContentNode[]).length,
                          },
                        ];
                        addEditedContent(
                          dictionary.localId!,
                          undefined,
                          newKeyPath
                        );
                      }}
                      Icon={Trash}
                    >
                      {removeElement.text}
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="block w-full">
                <td className="flex w-full">
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
                    renderSection={renderSection}
                  />
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      <Button
        label={addNewElement.label.value}
        variant={ButtonVariant.HOVERABLE}
        color={ButtonColor.NEUTRAL}
        textAlign={ButtonTextAlign.LEFT}
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
            dictionary.localId!,
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
  renderSection,
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
                  <td className="flex w-full">{String(key)}</td>
                </tr>
                <tr key={JSON.stringify(subSection)} className="block w-full">
                  <td className="flex w-full">
                    <TextEditor
                      section={subSection}
                      keyPath={childKeyPath}
                      dictionary={dictionary}
                      renderSection={renderSection}
                    />
                  </td>
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
  const childKeyPath: KeyPath[] = [...keyPath, { type: NodeType.Markdown }];

  const content = (section as MarkdownContent<ContentNode>)[
    NodeType.Markdown
  ] as ContentNode;

  return (
    <div className="flex w-full flex-col justify-center gap-6 p-2">
      <SwitchSelector
        choices={toggleContent}
        value={mode}
        onChange={setMode}
        color={SwitchSelectorColor.TEXT}
        size={SwitchSelectorSize.SM}
        className="ml-auto"
      />

      <TextEditorContainer
        section={content}
        keyPath={childKeyPath}
        dictionary={dictionary}
        renderSection={
          mode === MarkdownViewMode.Preview
            ? (content) => (
                <MarkdownRenderer isDarkMode={isDarkMode}>
                  {content}
                </MarkdownRenderer>
              )
            : undefined
        }
      />
    </div>
  );
};

const InsertionTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  ...props
}) => {
  const childKeyPath: KeyPath[] = [...keyPath, { type: NodeType.Insertion }];

  const content = (section as InsertionContent<ContentNode>)[
    NodeType.Insertion
  ];

  return (
    <div className="flex w-full flex-col justify-center gap-6 p-2">
      <TextEditorContainer
        section={content}
        keyPath={childKeyPath}
        {...props}
      />
    </div>
  );
};

const FileTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  ...props
}) => {
  const childKeyPath: KeyPath[] = [...keyPath, { type: NodeType.File }];

  const fileUrl = (section as FileContent)[NodeType.File];
  const { content } = section as FileContent;

  return (
    <div className="flex w-full flex-col justify-center gap-6 p-2">
      <span className="text-neutral text-sm">{fileUrl} </span>
      <TextEditorContainer
        section={content}
        keyPath={childKeyPath}
        {...props}
      />
    </div>
  );
};

const NestedTextEditor: FC<TextEditorProps> = ({
  keyPath,
  dictionary,
  renderSection,
  section,
  ...props
}) => {
  const { addEditedContent } = useEditedContent();

  const content = (section as any)[NodeType.Nested];
  const childrenKeyPath = [...keyPath, { type: NodeType.Nested }] as KeyPath[];

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <Label>Dictionary key</Label>
      <ContentEditorInputBase
        aria-label="Edit field"
        type="text"
        variant={InputVariant.DEFAULT}
        {...props}
        onContentChange={(newValue) => {
          addEditedContent(
            dictionary.localId!,
            {
              ...content,
              dictionaryKey: String(newValue),
            },
            childrenKeyPath
          );
        }}
      >
        {content.dictionaryKey ?? ''}
      </ContentEditorInputBase>

      <Label>Path (optional)</Label>
      <ContentEditorInputBase
        aria-label="Edit field"
        type="text"
        variant={InputVariant.DEFAULT}
        {...props}
        onContentChange={(newValue) => {
          addEditedContent(
            dictionary.localId!,
            {
              ...content,
              path: newValue !== '' ? newValue : undefined,
            },
            childrenKeyPath
          );
        }}
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
  renderSection,
  isDarkMode,
}) => {
  const { tsxNotEditable } = useIntlayer('navigation-view');
  const nodeType = getNodeType(section);

  if (nodeType === NodeType.ReactNode) {
    return (
      <div className="flex w-full flex-col gap-2">
        <span>(React Node)</span>
        <span className="flex text-neutral text-xs">{tsxNotEditable}</span>
      </div>
    );
  }

  if (nodeType === NodeType.Nested) {
    return (
      <NestedTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeType.Translation) {
    return (
      <TranslationTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeType.Enumeration) {
    return (
      <EnumerationTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeType.Condition) {
    return (
      <ConditionTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeType.Gender) {
    return (
      <GenderTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeType.Insertion) {
    return (
      <InsertionTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
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

  if (nodeType === NodeType.File) {
    return (
      <FileTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeType.Array) {
    return (
      <ArrayTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeType.Object) {
    return (
      <ObjectTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
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
        {typeof renderSection === 'function' ? (
          renderSection(section as string)
        ) : (
          <ContentEditorTextArea
            variant={InputVariant.DEFAULT}
            aria-label="Edit field"
            keyPath={keyPath}
            dictionary={dictionary}
          >
            {section as string}
          </ContentEditorTextArea>
        )}
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
