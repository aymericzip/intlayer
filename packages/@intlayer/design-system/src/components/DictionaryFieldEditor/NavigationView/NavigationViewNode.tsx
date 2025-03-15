import configuration from '@intlayer/config/built';

import {
  NodeType,
  type KeyPath,
  type ContentNode,
  isSameKeyPath,
  getContentNodeByKeyPath,
  getNodeType,
  getEmptyNode,
} from '@intlayer/core';
import {
  useEditedContentActions,
  useFocusDictionary,
} from '@intlayer/editor-react';
import { ChevronRight, Plus } from 'lucide-react';
import type { FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { camelCaseToSentence } from '../../../utils/camelCase';
import { Accordion } from '../../Accordion';
import { Button } from '../../Button';
import { getIsEditableSection } from '../getIsEditableSection';
import { navigationViewContent } from './navigationViewNode.content';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

export type NodeWrapperProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  section: ContentNode;
};

export const NavigationViewNode: FC<NodeWrapperProps> = ({
  section: sectionProp,
  keyPath,
  dictionaryKey,
}) => {
  const { locales } = configuration?.internationalization;
  const section = getContentNodeByKeyPath(sectionProp, keyPath);
  const { addEditedContent } = useEditedContentActions();
  const { setFocusedContentKeyPath, focusedContent } = useFocusDictionary();
  const { addNewElement, goToField } = useDictionary(navigationViewContent);
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
        variant="hoverable"
        color="text"
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
                keyPath={childKeyPath}
                section={sectionProp}
                dictionaryKey={dictionaryKey}
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
                keyPath={childKeyPath}
                section={sectionProp}
                dictionaryKey={dictionaryKey}
              />
            );
          })}
        </div>
      );
    }

    if (nodeType === NodeType.Array) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {(section as unknown as ContentNode[]).map((_, index) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Array, key: index },
            ];

            return (
              <NavigationViewNode
                keyPath={childKeyPath}
                section={sectionProp}
                dictionaryKey={dictionaryKey}
              />
            );
          })}

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
              const sectionArray = section as unknown as ContentNode[];
              const emptySectionEl =
                getEmptyNode(
                  sectionArray[
                    (sectionArray.length - 1) as keyof typeof sectionArray
                  ] as ContentNode
                ) ?? '';
              addEditedContent(
                dictionaryKey,
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
          dictionaryKey={dictionaryKey}
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
                variant="hoverable"
                color="text"
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
                    dictionaryKey={dictionaryKey}
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
