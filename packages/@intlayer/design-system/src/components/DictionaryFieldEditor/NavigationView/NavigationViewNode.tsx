import { getConfiguration } from '@intlayer/config/client';
import {
  type EnumerationContent,
  NodeType,
  type KeyPath,
  type DictionaryValue,
} from '@intlayer/core';
import { ChevronRight, Plus } from 'lucide-react';
import {
  createElement,
  type ReactElement,
  type ReactNode,
  type FC,
} from 'react';
import { useDictionary } from 'react-intlayer';
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
    tsxNotEditable,
    addNewElement,
    addNewField,
    goToElement,
    goToField,
    goToEnumeration,
    goToTranslation,
  } = useDictionary(navigationViewContent);
  const nodeType = getSectionType(section);
  const isEditableSection = getIsEditableSection(section);

  if (isEditableSection) return <>Content</>;

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
        <div className="flex flex-col justify-between gap-2">
          {locales.map((translationKey) => (
            <Button
              label={`${goToTranslation.label.value} ${translationKey}`}
              key={translationKey}
              isActive={selectedKey === translationKey}
              variant="hoverable"
              color="text"
              onClick={() =>
                setFocusedContentKeyPath([
                  ...keyPath,
                  { type: NodeType.Translation, key: translationKey },
                ])
              }
              IconRight={ChevronRight}
            >
              {translationKey}
            </Button>
          ))}
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
          ).map((enumKey) => (
            <Button
              label={`${goToEnumeration.label.value} ${enumKey}`}
              key={enumKey}
              isActive={selectedKey === enumKey}
              variant="hoverable"
              color="text"
              onClick={() =>
                setFocusedContentKeyPath([
                  ...keyPath,
                  { type: NodeType.Enumeration, key: enumKey },
                ])
              }
              IconRight={ChevronRight}
            >
              {enumKey}
            </Button>
          ))}
        </div>
      );
    }

    if (nodeType === NodeType.Array) {
      return (
        <div className="flex flex-col justify-between gap-2">
          {(section as DictionaryValue[]).map((subSection, index) => (
            <Button
              label={`${goToElement.label.value} ${index}`}
              key={JSON.stringify(subSection)}
              isActive={selectedKey === index}
              variant="hoverable"
              color="text"
              IconRight={ChevronRight}
              onClick={() =>
                setFocusedContentKeyPath([
                  ...keyPath,
                  { type: NodeType.Array, key: index },
                ])
              }
            >
              {index}
            </Button>
          ))}

          <Button
            label={addNewElement.label.value}
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
              label={`${goToField.label.value} ${key}`}
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
