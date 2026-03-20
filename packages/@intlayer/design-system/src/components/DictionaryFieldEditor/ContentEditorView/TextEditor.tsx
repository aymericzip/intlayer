'use client';

import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from '@components/Button';
import { Container } from '@components/Container';
import {
  ContentEditorInput as ContentEditorInputBase,
  type ContentEditorInputProps as ContentEditorInputPropsBase,
} from '@components/ContentEditor/ContentEditorInput';
import {
  ContentEditorTextArea as ContentEditorTextAreaBase,
  type ContentEditorTextAreaProps as ContentEditorTextAreaPropsBase,
} from '@components/ContentEditor/ContentEditorTextArea';
import { InputVariant } from '@components/Input';
import { Label } from '@components/Label';
import { useLocaleSwitcherContent } from '@components/LocaleSwitcherContentDropDown';
import { MarkdownRenderer } from '@components/MarkDownRender';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
  SwitchSelectorColor,
  type SwitchSelectorProps,
  SwitchSelectorSize,
} from '@components/SwitchSelector';
import { useAuditContentDeclarationField } from '@hooks/reactQuery';
import {
  getEmptyNode,
  getNodeType,
} from '@intlayer/core/dictionaryManipulator';
import { getLocaleName } from '@intlayer/core/localization';
import type {
  ConditionContent,
  EnumerationContent,
  FileContent,
  GenderContent,
  HTMLContent,
  InsertionContent,
  MarkdownContent,
  TranslationContent,
} from '@intlayer/core/transpiler';
import { useConfiguration, useEditedContent } from '@intlayer/editor-react';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import * as NodeTypes from '@intlayer/types/nodeType';
import { renameKey } from '@utils/object';
import { Plus, Trash, WandSparkles } from 'lucide-react';
import { type FC, Fragment, type ReactNode, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
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
                locales: configuration?.internationalization.locales ?? [],
                aiOptions: {
                  apiKey: configuration?.ai?.apiKey,
                  model: configuration?.ai?.model,
                  temperature: configuration?.ai?.temperature,
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
    NodeTypes.TRANSLATION
  ] as Record<Locale, string>;

  const sectionContentKeys = Object.keys(sectionContent) as LocalesValues[];

  const isFiltered = availableLocales.length > selectedLocales.length;

  const localesList = isFiltered
    ? selectedLocales
    : // If the translation include content in other locales, we display all of them
      [...new Set([...availableLocales, ...sectionContentKeys])];

  const content: any = (section as TranslationContent<string>)[
    NodeTypes.TRANSLATION
  ];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {localesList.map((translationKey) => {
          const uniqueKey = `${JSON.stringify(keyPath)}-translation-${translationKey}`;
          return (
            <Fragment key={uniqueKey}>
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
                      { type: NodeTypes.TRANSLATION, key: translationKey },
                    ]}
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

  const content = (section as EnumerationContent<string>)[
    NodeTypes.ENUMERATION
  ];
  const firstKey = Object.keys(content)[0] as keyof typeof content;

  return (
    <div className="flex flex-col gap-2">
      <table className="w-full">
        <tbody className="flex w-full flex-col gap-2">
          {Object.keys(
            (section as EnumerationContent<ContentNode>)[NodeTypes.ENUMERATION]
          ).map((enumKey) => {
            const childrenKeyPath = [
              ...keyPath,
              { type: NodeTypes.ENUMERATION, key: enumKey },
            ] as KeyPath[];
            const uniqueKey = `${JSON.stringify(keyPath)}-enumeration-${enumKey}`;

            return (
              <Fragment key={uniqueKey}>
                <tr className="mt-2 w-full">
                  <td className="flex w-full">
                    <div className="flex flex-1">
                      <Button
                        label={removeEnumeration.label.value}
                        variant="hoverable"
                        size="sm"
                        color="error"
                        className="ml-auto text-neutral hover:text-error"
                        Icon={Trash}
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
                        )[NodeTypes.ENUMERATION];

                        const newValueContent = renameKey(
                          preValueContent,
                          enumKey as keyof typeof preValueContent,
                          value
                        );
                        const newValue = {
                          ...(section as EnumerationContent<string>),
                          [NodeTypes.ENUMERATION]: newValueContent,
                        };

                        console.log('newValue', newValue);

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
            [...keyPath, { type: NodeTypes.ENUMERATION, key: 'unknown' }]
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
  const content = (section as ConditionContent<string>)[NodeTypes.CONDITION];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {['true', 'false', 'fallback'].map((condKey) => {
          const uniqueKey = `${JSON.stringify(keyPath)}-condition-${condKey}`;
          return (
            <Fragment key={uniqueKey}>
              <tr className="mt-2 block w-full p-2 text-xs">
                <td className="flex w-full">{String(condKey)}</td>
              </tr>
              <tr className="block w-full">
                <td className="flex w-full">
                  <TextEditorContainer
                    section={
                      content[condKey as keyof typeof content] ??
                      getEmptyNode(content.true)
                    }
                    keyPath={[
                      ...keyPath,
                      {
                        type: NodeTypes.CONDITION,
                        key: condKey,
                      } as KeyPath,
                    ]}
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
  );
};

const GenderTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
  renderSection,
}) => {
  const content = (section as GenderContent<string>)[NodeTypes.GENDER];

  return (
    <table className="w-full">
      <tbody className="flex w-full flex-col gap-2">
        {['male', 'female', 'fallback'].map((condKey) => {
          const uniqueKey = `${JSON.stringify(keyPath)}-gender-${condKey}`;
          return (
            <Fragment key={uniqueKey}>
              <tr className="mt-2 block w-full p-2 text-xs">
                <td className="flex w-full">{String(condKey)}</td>
              </tr>
              <tr className="block w-full">
                <td className="flex w-full">
                  <TextEditorContainer
                    section={
                      content[condKey as keyof typeof content] ??
                      getEmptyNode(content.male)
                    }
                    keyPath={[
                      ...keyPath,
                      {
                        type: NodeTypes.GENDER,
                        key: condKey,
                      } as KeyPath,
                    ]}
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
          {(section as unknown as ContentNode[]).map((subSection, index) => {
            const uniqueKey = `${JSON.stringify(keyPath)}-array-${index}`;
            return (
              <Fragment key={uniqueKey}>
                <tr className="mt-2 w-full p-2">
                  <td className="flex w-full">
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-xs">{String(index)}</span>
                      <Button
                        label={removeElement.label.value}
                        variant="hoverable"
                        size="sm"
                        color="error"
                        className="ml-auto text-neutral hover:text-error"
                        onClick={() => {
                          const newKeyPath: KeyPath[] = [
                            ...keyPath,
                            {
                              type: NodeTypes.ARRAY,
                              key: index, // Fixed: Use index instead of length
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
                          type: NodeTypes.ARRAY,
                          key: index,
                        },
                      ]}
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
        label={addNewElement.label.value}
        variant={ButtonVariant.HOVERABLE}
        color={ButtonColor.NEUTRAL}
        textAlign={ButtonTextAlign.LEFT}
        isFullWidth
        onClick={() => {
          const newKeyPath: KeyPath[] = [
            ...keyPath,
            {
              type: NodeTypes.ARRAY,
              key: (section as unknown as ContentNode[]).length, // Keeps length for adding new items
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
              { type: NodeTypes.OBJECT, key },
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
            const uniqueKey = `${JSON.stringify(keyPath)}-object-${key}`;

            return (
              <Fragment key={uniqueKey}>
                <tr className="mt-2 p-2 text-xs">
                  <td className="flex w-full">{String(key)}</td>
                </tr>
                <tr className="block w-full">
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

enum HtmlViewMode {
  Edit,
  Preview,
}

const HtmlTextEditor: FC<TextEditorProps> = ({
  section,
  keyPath,
  dictionary,
}) => {
  const [mode, setMode] = useState(HtmlViewMode.Edit);
  const toggleContent = [
    {
      content: 'Edit',
      value: HtmlViewMode.Edit,
    },
    {
      content: 'Preview',
      value: HtmlViewMode.Preview,
    },
  ] as SwitchSelectorChoices<HtmlViewMode>;
  const childKeyPath: KeyPath[] = [...keyPath, { type: NodeTypes.HTML }];

  const content = (section as HTMLContent<ContentNode>)[
    NodeTypes.HTML
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
          mode === HtmlViewMode.Preview
            ? (content) => (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML content is user-controlled and rendered in editor context
                <div dangerouslySetInnerHTML={{ __html: content }} />
              )
            : undefined
        }
      />
    </div>
  );
};

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
  const childKeyPath: KeyPath[] = [...keyPath, { type: NodeTypes.MARKDOWN }];

  const content = (section as MarkdownContent<ContentNode>)[
    NodeTypes.MARKDOWN
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
  const childKeyPath: KeyPath[] = [...keyPath, { type: NodeTypes.INSERTION }];

  const content = (section as InsertionContent<ContentNode>)[
    NodeTypes.INSERTION
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
  const childKeyPath: KeyPath[] = [...keyPath, { type: NodeTypes.FILE }];

  const fileUrl = (section as FileContent)[NodeTypes.FILE];
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

  const content = (section as any)[NodeTypes.NESTED];
  const childrenKeyPath = [...keyPath, { type: NodeTypes.NESTED }] as KeyPath[];

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

  if (nodeType === NodeTypes.REACT_NODE) {
    return (
      <div className="flex w-full flex-col gap-2">
        <span>(React Node)</span>
        <span className="flex text-neutral text-xs">{tsxNotEditable}</span>
      </div>
    );
  }

  if (nodeType === NodeTypes.NESTED) {
    return (
      <NestedTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.TRANSLATION) {
    return (
      <TranslationTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.ENUMERATION) {
    return (
      <EnumerationTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.CONDITION) {
    return (
      <ConditionTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.GENDER) {
    return (
      <GenderTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.INSERTION) {
    return (
      <InsertionTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.MARKDOWN) {
    return (
      <MarkdownTextEditor
        dictionary={dictionary}
        keyPath={keyPath}
        section={section}
        isDarkMode={isDarkMode}
      />
    );
  }

  if (nodeType === NodeTypes.HTML) {
    return (
      <HtmlTextEditor
        dictionary={dictionary}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.FILE) {
    return (
      <FileTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.ARRAY) {
    return (
      <ArrayTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.OBJECT) {
    return (
      <ObjectTextEditor
        dictionary={dictionary}
        renderSection={renderSection}
        keyPath={keyPath}
        section={section}
      />
    );
  }

  if (nodeType === NodeTypes.NUMBER) {
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

  if (nodeType === NodeTypes.TEXT) {
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

  if (nodeType === NodeTypes.BOOLEAN) {
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
