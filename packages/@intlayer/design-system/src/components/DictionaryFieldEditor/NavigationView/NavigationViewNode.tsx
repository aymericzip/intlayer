import { getConfiguration } from '@intlayer/config/client';
import {
  type EnumerationContent,
  NodeType,
  type KeyPath,
  type DictionaryValue,
} from '@intlayer/core';
import { ChevronRight, Plus } from 'lucide-react';
import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { camelCaseToSentence } from '../../../utils/camelCase';
import {
  getDictionaryValueByKeyPath,
  getSectionType,
} from '../../../utils/dictionary';
import { Accordion } from '../../Accordion';
import { Button } from '../../Button';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../../DictionaryEditor';
import { getIsEditableSection } from '../getIsEditableSection';
import { navigationViewContent } from './navigationViewNode.content';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

export type NodeWrapperProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  section: DictionaryValue;
  selectedKey?: KeyPath['key'];
};

export const NavigationViewNode: FC<NodeWrapperProps> = ({
  section: sectionProp,
  keyPath,
  dictionaryKey,
  selectedKey,
}) => {
  const { locales } = getConfiguration().internationalization;
  const section = getDictionaryValueByKeyPath(sectionProp, keyPath);
  const addEditedContent = useEditedContentStore((s) => s.addEditedContent);
  const setFocusedContentKeyPath = useEditionPanelStore(
    (s) => s.setFocusedContentKeyPath
  );
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

  if (isEditableSection) return <>-</>;

  if (typeof section === 'object') {
    if (nodeType === NodeType.Translation) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {locales.map((translationKey) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Translation, key: translationKey },
            ];
            const subSection = getDictionaryValueByKeyPath(
              sectionProp,
              childKeyPath
            );
            const isEditableSubSection = getIsEditableSection(subSection);

            if (isEditableSubSection) {
              return (
                <Button
                  label={`${goToTranslation.label.value} ${translationKey}`}
                  key={translationKey}
                  isActive={selectedKey === translationKey}
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
                identifier={translationKey}
                label={`${goToTranslation.label.value} ${translationKey}`}
                isActive={selectedKey === translationKey}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                header={translationKey}
              >
                <div className="flex w-full max-w-full">
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
            (section as EnumerationContent<DictionaryValue>)[
              NodeType.Enumeration
            ]
          ).map((key) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Enumeration, key },
            ];
            const subSection = getDictionaryValueByKeyPath(
              sectionProp,
              childKeyPath
            );
            const isEditableSubSection = getIsEditableSection(subSection);

            if (isEditableSubSection) {
              return (
                <Button
                  label={`${goToEnumeration.label.value} ${key}`}
                  key={key}
                  isActive={selectedKey === key}
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
                identifier={key}
                label={`${goToEnumeration.label.value} ${key}`}
                isActive={selectedKey === key}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                header={key}
              >
                <div className="flex w-full max-w-full">
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
          {(section as DictionaryValue[]).map((subSection, index) => {
            const childKeyPath: KeyPath[] = [
              ...keyPath,
              { type: NodeType.Array, key: index },
            ];

            const isEditableSubSection = getIsEditableSection(subSection);

            if (isEditableSubSection) {
              return (
                <Button
                  label={`${goToElement.label.value} ${index}`}
                  key={`${index}`}
                  isActive={selectedKey === index}
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
                identifier={`${index}`}
                label={`${goToElement.label.value} ${index}`}
                isActive={selectedKey === index}
                onClick={() => setFocusedContentKeyPath(childKeyPath)}
                header={index}
              >
                <div className="flex w-full max-w-full">
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
                  key: (section as DictionaryValue[]).length,
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
          const subSection = getDictionaryValueByKeyPath(
            sectionProp,
            childKeyPath
          );
          const isEditableSubSection = getIsEditableSection(subSection);

          if (isEditableSubSection) {
            return (
              <Button
                label={`${goToField.label.value} ${key}`}
                key={key}
                isActive={selectedKey === key}
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
              identifier={key}
              label={`${goToField.label.value} ${key}`}
              isActive={selectedKey === key}
              onClick={() => setFocusedContentKeyPath(childKeyPath)}
              header={camelCaseToSentence(key)}
            >
              <div className="flex w-full max-w-full">
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
