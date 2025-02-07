import { getConfiguration } from '@intlayer/config/client';
import {
  type EnumerationContent,
  NodeType,
  type KeyPath,
  type ContentNode,
  isSameKeyPath,
  getContentNodeByKeyPath,
  getSectionType,
} from '@intlayer/core';
import {
  useEditedContentActions,
  useFocusDictionary,
} from '@intlayer/editor-react';
import { ChevronRight, Plus } from 'lucide-react';
import { useCallback, type FC } from 'react';
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
  const { locales } = getConfiguration().internationalization;
  const section = getContentNodeByKeyPath(sectionProp, keyPath);
  const { addEditedContent } = useEditedContentActions();
  const { setFocusedContentKeyPath, focusedContent } = useFocusDictionary();
  const {
    addNewElement,
    addNewField,
    goToElement,
    goToField,
    goToEnumeration,
    goToTranslation,
  } = useDictionary(navigationViewContent);
  const nodeType = getSectionType(section);
  const isEditableSection = getIsEditableSection(section);
  const getIsSelected = useCallback(
    (keyPath: KeyPath[]) =>
      (focusedContent?.keyPath?.length ?? 0) > 0 &&
      isSameKeyPath(keyPath, focusedContent?.keyPath ?? []),
    [focusedContent?.keyPath]
  );

  if (isEditableSection) return <>-</>;

  if (!section) return <>-</>;

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
            const subSection = getContentNodeByKeyPath(
              sectionProp,
              childKeyPath
            );
            const isEditableSubSection = getIsEditableSection(subSection);

            if (isEditableSubSection) {
              return (
                <Button
                  label={`${goToTranslation.label} ${translationKey}`}
                  key={translationKey}
                  isActive={getIsSelected(childKeyPath)}
                  variant="hoverable"
                  color="text"
                  className="w-full"
                  onClick={() => setFocusedContentKeyPath(childKeyPath)}
                  IconRight={ChevronRight}
                >
                  {translationKey}
                </Button>
              );
            }

            return (
              <Accordion
                key={translationKey}
                label={`${goToTranslation.label} ${translationKey}`}
                isActive={getIsSelected(childKeyPath)}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                header={translationKey}
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

    if (nodeType === NodeType.Enumeration) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {Object.keys(
            (section as EnumerationContent<ContentNode>)[NodeType.Enumeration]
          ).map((key) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Enumeration, key },
            ];
            const subSection = getContentNodeByKeyPath(
              sectionProp,
              childKeyPath
            );
            const isEditableSubSection = getIsEditableSection(subSection);

            if (isEditableSubSection) {
              return (
                <Button
                  label={`${goToEnumeration.label} ${key}`}
                  key={key}
                  isActive={getIsSelected(childKeyPath)}
                  variant="hoverable"
                  color="text"
                  className="w-full"
                  onClick={() => setFocusedContentKeyPath(childKeyPath)}
                  IconRight={ChevronRight}
                >
                  {key}
                </Button>
              );
            }

            return (
              <Accordion
                key={key}
                label={`${goToEnumeration.label} ${key}`}
                isActive={getIsSelected(childKeyPath)}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                header={key}
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
                  label={`${goToElement.label} ${index}`}
                  key={`${index}`}
                  isActive={getIsSelected(childKeyPath)}
                  variant="hoverable"
                  color="text"
                  className="w-full"
                  onClick={() => setFocusedContentKeyPath(childKeyPath)}
                  IconRight={ChevronRight}
                >
                  {index}
                </Button>
              );
            }

            return (
              <Accordion
                key={`${index}`}
                label={`${goToElement.label} ${index}`}
                isActive={getIsSelected(childKeyPath)}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                header={index}
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
              addEditedContent(dictionaryKey, {}, newKeyPath, false);
              setFocusedContentKeyPath(newKeyPath);
            }}
            Icon={Plus}
          >
            {addNewElement.text}
          </Button>
        </div>
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
                label={`${goToField.label} ${key}`}
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
              label={`${goToField.label} ${key}`}
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

        <Button
          label={addNewField.label.value}
          variant="hoverable"
          color="neutral"
          textAlign="left"
          onClick={() => {
            const newKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Object, key: 'newField' },
            ];
            addEditedContent(dictionaryKey, {}, newKeyPath, false);
            setFocusedContentKeyPath(newKeyPath);
          }}
          Icon={Plus}
        >
          {addNewField.text}
        </Button>
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
