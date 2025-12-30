import configuration from '@intlayer/config/built';
import { camelCaseToSentence } from '@intlayer/config/client';
import {
  getContentNodeByKeyPath,
  getEmptyNode,
  getNodeType,
  isSameKeyPath,
} from '@intlayer/core';
import {
  useEditedContentActions,
  useEditorLocale,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import {
  type KeyPath,
  type LocalDictionaryId,
  NodeType,
} from '@intlayer/types';
import type { ContentNode, Dictionary } from 'intlayer';
import { ChevronRight, Plus } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Accordion } from '../../Accordion';
import {
  Button,
  ButtonColor,
  ButtonTextAlign,
  ButtonVariant,
} from '../../Button';
import { getIsEditableSection } from '../getIsEditableSection';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

export type NodeWrapperProps = {
  keyPath: KeyPath[];
  section: ContentNode;
  dictionary: Dictionary;
};

export const NavigationViewNode: FC<NodeWrapperProps> = ({
  section: sectionProp,
  keyPath,
  dictionary,
}) => {
  const { locales } = configuration.internationalization;
  const currentLocale = useEditorLocale();
  const section = getContentNodeByKeyPath(sectionProp, keyPath, currentLocale);
  const { addEditedContent } = useEditedContentActions();
  const { setFocusedContentKeyPath, focusedContent } =
    useFocusUnmergedDictionary();
  const { addNewElement, goToField } = useIntlayer('navigation-view');
  const nodeType = getNodeType(section);
  const getIsSelected = (keyPath: KeyPath[]) =>
    (focusedContent?.keyPath?.length ?? 0) > 0 &&
    isSameKeyPath(keyPath, focusedContent?.keyPath ?? []);
  const isEditableSubSection = getIsEditableSection(section);

  if (!section) return <></>;

  if (isEditableSubSection) {
    return (
      <Button
        label={goToField.label.value}
        variant={ButtonVariant.HOVERABLE}
        color={ButtonColor.TEXT}
        className="w-full"
        onClick={() => setFocusedContentKeyPath(keyPath)}
        IconRight={ChevronRight}
      >
        {camelCaseToSentence(keyPath[keyPath.length - 1].key as string)}
      </Button>
    );
  }

  if (typeof section === 'object') {
    if (nodeType === NodeType.ReactNode) {
      return <>React Node</>;
    }

    if (nodeType === NodeType.Translation) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {locales.map((translationKey) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Translation, key: translationKey },
            ];

            return (
              <NavigationViewNode
                key={translationKey}
                keyPath={childKeyPath}
                section={sectionProp}
                dictionary={dictionary}
              />
            );
          })}
        </div>
      );
    }

    if (nodeType === NodeType.Enumeration || nodeType === NodeType.Condition) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {Object.keys(
            (section as any)[nodeType as unknown as keyof typeof section]
          ).map((key) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: nodeType, key },
            ];

            return (
              <NavigationViewNode
                key={key}
                keyPath={childKeyPath}
                section={sectionProp}
                dictionary={dictionary}
              />
            );
          })}
        </div>
      );
    }

    if (nodeType === NodeType.Array) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {(section as unknown as ContentNode[]).map((subSection, index) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Array, key: index },
            ];

            const isEditableSubSection = getIsEditableSection(subSection);

            if (isEditableSubSection) {
              return (
                <Button
                  key={JSON.stringify(childKeyPath)}
                  label={`${goToField.label.value} ${index}`}
                  variant={ButtonVariant.HOVERABLE}
                  color={ButtonColor.TEXT}
                  className="w-full"
                  onClick={() => setFocusedContentKeyPath(childKeyPath)}
                  IconRight={ChevronRight}
                  isActive={getIsSelected(childKeyPath)}
                >
                  Item {index}
                </Button>
              );
            }

            return (
              <Accordion
                key={JSON.stringify(childKeyPath)}
                label={`${goToField.label.value} ${index}`}
                header={`Item ${index}`}
                isActive={getIsSelected(childKeyPath)}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
              >
                <div className="mt-2 flex w-full max-w-full">
                  <div className="flex-1 pl-10">
                    <NavigationViewNode
                      keyPath={childKeyPath}
                      section={sectionProp}
                      dictionary={dictionary}
                    />
                  </div>
                </div>
              </Accordion>
            );
          })}

          <Button
            label={addNewElement.label.value}
            variant={ButtonVariant.HOVERABLE}
            color={ButtonColor.NEUTRAL}
            textAlign={ButtonTextAlign.LEFT}
            onClick={() => {
              const newKeyPath: KeyPath[] = [
                ...keyPath,
                {
                  type: NodeType.Array,
                  key: (section as unknown as ContentNode[]).length,
                },
              ];
              const sectionArray = section as unknown as ContentNode[];
              const emptySectionEl =
                getEmptyNode(
                  sectionArray[
                    (sectionArray.length - 1) as keyof typeof sectionArray
                  ] as ContentNode
                ) ?? '';
              addEditedContent(
                dictionary.localId as LocalDictionaryId,
                emptySectionEl,
                newKeyPath,
                false
              );
              setFocusedContentKeyPath(newKeyPath);
            }}
            Icon={Plus}
          >
            {addNewElement.text}
          </Button>
        </div>
      );
    }

    if (typeof section.nodeType === 'string') {
      const childKeyPath: KeyPath[] = [
        ...keyPath,
        { type: section.nodeType } as KeyPath,
      ];

      return (
        <NavigationViewNode
          keyPath={childKeyPath}
          section={sectionProp}
          dictionary={dictionary}
        />
      );
    }

    const sectionArray = Object.keys(section);
    return (
      <div className="flex w-full max-w-full flex-col justify-between gap-2">
        {sectionArray.map((key) => {
          const childKeyPath: KeyPath[] = [
            ...keyPath,
            { type: NodeType.Object, key },
          ];

          const subSection = getContentNodeByKeyPath(sectionProp, childKeyPath);
          const isEditableSubSection = getIsEditableSection(subSection);

          if (isEditableSubSection) {
            return (
              <Button
                label={`${goToField.label.value} ${key}`}
                key={key}
                isActive={getIsSelected(childKeyPath)}
                variant={ButtonVariant.HOVERABLE}
                color={ButtonColor.TEXT}
                className="w-full"
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                IconRight={ChevronRight}
              >
                {camelCaseToSentence(key)}
              </Button>
            );
          }

          return (
            <Accordion
              key={key}
              label={`${goToField.label.value} ${key}`}
              isActive={getIsSelected(childKeyPath)}
              onClick={() => setFocusedContentKeyPath(childKeyPath)}
              header={camelCaseToSentence(key)}
            >
              <div className="mt-2 flex w-full max-w-full">
                <div className="flex-1 pl-10">
                  <NavigationViewNode
                    keyPath={childKeyPath}
                    section={sectionProp}
                    dictionary={dictionary}
                  />
                </div>
              </div>
            </Accordion>
          );
        })}
      </div>
    );
  }

  return (
    <>
      Error loading section --
      {nodeType}
      --
      {JSON.stringify(section)}
      --
      {JSON.stringify(keyPath)}
    </>
  );
};
